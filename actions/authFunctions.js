export const login = async (correo, clave) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/login', {
        method: 'POST',
        headers: new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body: queryString.stringify({correo, clave}),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
        //sessionStorage.setItem("token", json.data.access_token);
        //sessionStorage.setItem("refreshToken", json.data.refresh_token);
    }
    return [response.ok, json];
}

export const recoverClave = async (cedula) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/request', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({cedula}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const confirmClave = async (cedula, code) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/verify', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({cedula, code}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveClave = async (cedula, clave, code) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/password', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({cedula, clave, code}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}