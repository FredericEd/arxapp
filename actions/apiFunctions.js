export const getInstalaciones = async (id_casa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/instalaciones', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.instalaciones == 'undefined' ? [] : json.instalaciones;
}

export const getPedidos = async (id_casa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/pedidos', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.pedidos  == 'undefined' ? [] : json.pedidos;
}

export const getAnuncios = async (id_etapa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/etapas/' + id_etapa + '/anuncios', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.anuncios  == 'undefined' ? [] : json.anuncios;
}

export const getUsuarios = async (id_casa, id_tipo_usuario, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/usuarios?id_tipo_usuario=' + id_tipo_usuario, {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.usuarios  == 'undefined' ? [] : json.usuarios;
}

export const getPagos = async (id_casa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/pagos', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.pagos  == 'undefined' ? [] : json.pagos;
}

export const getCasas = async (token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.casas  == 'undefined' ? [] : json.casas;
}

export const getDeudas = async (id_casa, token) => {
    console.log('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/deudas');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/deudas', {
        method: 'GET',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.deudas  == 'undefined' ? [] : json.deudas;
}

export const getUsuariosByCedula = async (cedula, token) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/search/cedula', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({cedula}),
    });
    const json = await response.json();
    console.log(json);
    return typeof json.usuarios  == 'undefined' ? [] : json.usuarios;
}

export const saveComentario = async (id_casa, comentario, token) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/comentarios', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({id_casa, comentario}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveClave = async (clave, token) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios', {
        method: 'PUT',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({clave}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveUsuario = async (id_usuario, cantidad, id_casa, cedula, nombre, correo, telefono, token) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/invitados', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({id_usuario, cantidad, id_casa, cantidad, cedula, nombre, correo, telefono}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveReserva = async (id_casa, id_instalacion, fecha, time, horas, token) => {
    const queryString = require('query-string');
    const response = await fetch('https://arxsmart.com/api/v1/instalaciones/' + id_instalacion + '/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: queryString.stringify({id_casa, fecha, time, horas}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}