#!/usr/bin/env python3
"""
deploy.py — Sube archivos del plugin local a WordPress vía REST API.
Uso: python deploy.py              (sube todos los archivos)
     python deploy.py css js       (sube solo css y js)
"""

import sys
import os
import configparser
import urllib.request
import urllib.error
import json

CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'deploy.config')

FILES = {
    'css':  ('rk-migration/css/styles.css',      'css/styles.css'),
    'js':   ('rk-migration/js/main.js',           'js/main.js'),
    'html': ('rk-migration/home-template.php',    'home-template.php'),
    'php':  ('rk-migration/rk-migration.php',     'rk-migrations.php'),
}

def load_config():
    if not os.path.exists(CONFIG_FILE):
        print(f'ERROR: No se encuentra {CONFIG_FILE}')
        print('Crea el archivo con el formato indicado en deploy.config.example')
        sys.exit(1)
    cfg = configparser.ConfigParser()
    cfg.read(CONFIG_FILE, encoding='utf-8')
    return cfg['wordpress']

def upload_file(wp_url, token, local_path, remote_path):
    full_local = os.path.join(os.path.dirname(__file__), local_path)
    if not os.path.exists(full_local):
        return False, f'Archivo local no encontrado: {full_local}'

    with open(full_local, 'r', encoding='utf-8') as f:
        content = f.read()

    endpoint = wp_url.rstrip('/') + '/wp-json/rk/v1/deploy'
    payload = json.dumps({'token': token, 'path': remote_path, 'content': content}).encode('utf-8')

    req = urllib.request.Request(
        endpoint,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST',
    )

    try:
        with urllib.request.urlopen(req) as resp:
            body = json.loads(resp.read().decode('utf-8'))
            return True, body
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        return False, f'HTTP {e.code}: {body}'
    except urllib.error.URLError as e:
        return False, str(e.reason)

def main():
    cfg = load_config()
    wp_url = cfg['url']
    token  = cfg['token']

    keys = sys.argv[1:] if len(sys.argv) > 1 else list(FILES.keys())
    invalid = [k for k in keys if k not in FILES]
    if invalid:
        print(f'ERROR: Claves desconocidas: {invalid}')
        print(f'Claves validas: {list(FILES.keys())}')
        sys.exit(1)

    targets = [(k, FILES[k]) for k in keys]

    print(f'\nDeploy a {wp_url}')
    print('-' * 50)
    for key, (local, remote) in targets:
        print(f'  [{key}]  {local}  ->  {remote}')
    print('-' * 50)
    confirm = input('Subir estos archivos? (s/n): ').strip().lower()
    if confirm != 's':
        print('Cancelado.')
        sys.exit(0)

    print()
    ok_count = 0
    for key, (local, remote) in targets:
        success, result = upload_file(wp_url, token, local, remote)
        status = 'OK' if success else 'ERROR'
        print(f'  {status}  {remote}' + ('' if success else f'  =>  {result}'))
        if success:
            ok_count += 1

    print()
    print(f'Deploy completado: {ok_count}/{len(targets)} archivos subidos.')

if __name__ == '__main__':
    main()
