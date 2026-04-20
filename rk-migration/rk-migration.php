<?php
/**
 * Plugin Name: RK Solutions Home Redesign
 * Description: Inyecta el HTML custom optimizado de la nueva home y carga los estilos estáticos. Usar shortcode [rk_home].
 * Version: 1.0
 * Author: Antigravity
 */

// Evitar bloqueos de caché agresivos para este plugin corto
if (!defined('ABSPATH')) {
    exit;
}

// 1. REGISTRAMOS EL ENQUEUE DE RECURSOS
add_action('wp_enqueue_scripts', 'rk_enqueue_home_assets', 999);

function rk_enqueue_home_assets() {
    // DNS Prefetch & Preconnect
    echo '<link rel="dns-prefetch" href="https://www.youtube.com">';
    echo '<link rel="dns-prefetch" href="https://www.google.com">';
    echo '<link rel="preconnect" href="https://www.youtube.com" crossorigin>';
    echo '<link rel="preconnect" href="https://i.ytimg.com" crossorigin>';

    // Fuentes
    wp_enqueue_style('rk-google-fonts', 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&family=Manrope:wght@400;500;600;700;800&family=Poppins:ital,wght@0,600;0,700;0,800;1,300;1,800&display=swap', array(), null);

    // CSS Local
    wp_enqueue_style('rk-main-css', plugin_dir_url(__FILE__) . 'css/styles.css', array(), filemtime(plugin_dir_path(__FILE__) . 'css/styles.css'));

    // Override: rutas absolutas para background-images (evita roturas con plugins de caché que mueven la CSS)
    $pu = plugin_dir_url(__FILE__);
    wp_add_inline_style('rk-main-css', "
        .hero__pattern{background-image:url('{$pu}assets/img/pattern_manzanas_outline.svg')!important}
        .que-hace::before,.planes::before{background:url('{$pu}assets/img/pattern_manzanas_outline.png') no-repeat center center!important;background-size:contain!important}
        .que-hace::after,.planes::after{background:url('{$pu}assets/img/pattern_manzanas_outline.png') no-repeat center center!important;background-size:contain!important}
        .contadores__wrapper{background:url('{$pu}assets/img/bloque_vidrio.png') no-repeat center center!important;background-size:100% 100%!important}
        .contacto__form{background:url('{$pu}assets/img/bloque_vidrio_cuadrado.png') no-repeat center center!important;background-size:100% 100%!important}
        @media(min-width:768px) and (max-width:1023px){.contadores__wrapper{background-image:url('{$pu}assets/img/bloque_vidrio_cuadrado.png')!important}}
        @media(max-width:767px){.contadores__wrapper{background-image:url('{$pu}assets/img/bloque_vidrio_cuadrado.png')!important}}
    ");

    // JS Local con defer
    wp_enqueue_script('rk-main-js', plugin_dir_url(__FILE__) . 'js/main.js', array(), filemtime(plugin_dir_path(__FILE__) . 'js/main.js'), true);

    // Pasa la URL del plugin al JS (necesario para rutas de assets en JS, ej. frames TPV)
    wp_localize_script('rk-main-js', 'rkConfig', array(
        'pluginUrl' => plugin_dir_url(__FILE__),
    ));

    // Añadir defer
    add_filter('script_loader_tag', function($tag, $handle) {
        if ('rk-main-js' !== $handle) return $tag;
        return str_replace(' src', ' defer="defer" src', $tag);
    }, 10, 2);
}

// 2. REGISTRAMOS EL SHORTCODE
add_shortcode('rk_home', 'rk_render_home');

function rk_render_home() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'home-template.php';
    $html = ob_get_clean();
    
    // Remapeamos las URLs relativas del HTML para que pasen por la URL del plugin
    $plugin_url = plugin_dir_url(__FILE__);
    $html = str_replace('src="assets/', 'src="' . $plugin_url . 'assets/', $html);
    $html = str_replace("url('assets/", "url('" . $plugin_url . "assets/", $html);

    return $html;
}
