<?php
/**
 * Plugin Name: RK Solutions Home Redesign
 * Description: Inyecta el HTML custom optimizado de la nueva home y carga los estilos estáticos. Usar shortcode [rk_home].
 * Version: 1.0
 * Author: Antigravity
 */

if (!defined('ABSPATH')) {
    exit;
}

// SEGURIDAD: cabeceras HTTP
add_action('send_headers', 'rk_security_headers');
function rk_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
}

// SEGURIDAD: eliminar versión de WordPress del <head>
remove_action('wp_head', 'wp_generator');

// SEGURIDAD: desactivar XML-RPC (vector de DDoS y fuerza bruta)
add_filter('xmlrpc_enabled', '__return_false');
add_filter('wp_xmlrpc_server_class', '__return_false');

// SEGURIDAD: bloquear enumeración de usuarios (?author=1 revela usernames)
add_action('template_redirect', function () {
    if (is_author()) {
        wp_redirect(home_url(), 301);
        exit;
    }
});
add_filter('redirect_canonical', function ($redirect, $request) {
    if (isset($_GET['author'])) {
        wp_redirect(home_url(), 301);
        exit;
    }
    return $redirect;
}, 10, 2);

// SEGURIDAD: eliminar versión de WP de scripts y estilos encolados
add_filter('style_loader_src', 'rk_remove_ver_query', 9999);
add_filter('script_loader_src', 'rk_remove_ver_query', 9999);
function rk_remove_ver_query($src) {
    if (strpos($src, '?ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

// 1. REGISTRAMOS EL ENQUEUE DE RECURSOS
add_action('wp_enqueue_scripts', 'rk_enqueue_home_assets', 999);

function rk_enqueue_home_assets() {
    // DNS Prefetch & Preconnect
    echo '<link rel="dns-prefetch" href="https://www.youtube.com">';
    echo '<link rel="dns-prefetch" href="https://www.google.com">';
    echo '<link rel="preconnect" href="https://www.youtube.com" crossorigin>';
    echo '<link rel="preconnect" href="https://i.ytimg.com" crossorigin>';

    // Fuentes (DM Serif Display eliminada — no se usa)
    wp_enqueue_style('rk-google-fonts', 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Poppins:ital,wght@0,300;0,600;0,700;0,800;1,300;1,800&display=swap', array(), null);

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

// 2. ELIMINAR SCRIPTS/ESTILOS DE WP QUE NO USAMOS
add_action('wp_enqueue_scripts', 'rk_remove_wp_bloat', 100);
function rk_remove_wp_bloat() {
    // Emoji
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    wp_dequeue_style('wp-emoji');
    // Block library (Gutenberg styles)
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('classic-theme-styles');
    wp_dequeue_style('global-styles');
}

// 3. REGISTRAMOS EL SHORTCODE
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
