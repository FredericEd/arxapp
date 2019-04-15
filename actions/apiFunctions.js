export const getInstalaciones = async (id_casa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/instalaciones', {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/deudas', {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.deudas  == 'undefined' ? [] : json.deudas;
}

export const getVisitantes = async (id_casa, token) => {
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/casas/' + id_casa + '/visitantes', {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return typeof json.visitantes  == 'undefined' ? [] : json.visitantes;
}

export const getUsuariosByCedula = async (cedula, token) => {
    const formData = new FormData();
    formData.append("cedula", cedula);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/search/cedula', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return typeof json.usuarios  == 'undefined' ? [] : json.usuarios;
}

export const getConfiguraciones = async token => {
    const response = await fetch('https://arxsmart.com/api/v1/configuraciones', {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        }
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveComentario = async (id_casa, comentario, token) => {
    const formData = new FormData();
    formData.append("id_casa", id_casa);
    formData.append("comentario", comentario);
    const response = await fetch('https://arxsmart.com/api/v1/comentarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveClave = async (clave, token) => {
    const formData = new FormData();
    formData.append("clave", clave);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/clave', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveUsuario = async (id_usuario, cantidad, id_casa, cedula, nombre, correo, telefono, token) => {
    const formData = new FormData();
    formData.append("id_usuario", id_usuario);
    formData.append("cantidad", cantidad);
    formData.append("id_casa", id_casa);
    formData.append("cedula", cedula);
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("telefono", telefono);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/invitados', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveReserva = async (id_casa, id_instalacion, fecha, time, horas, token) => {
    const formData = new FormData();
    formData.append("id_casa", id_casa);
    formData.append("fecha", fecha);
    formData.append("time", time);
    formData.append("horas", horas);
    const response = await fetch('https://arxsmart.com/api/v1/instalaciones/' + id_instalacion + '/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveEmergencia = async (id_casa, token) => {
    const formData = new FormData();
    formData.append("id_casa", id_casa);
    const response = await fetch('https://arxsmart.com/api/v1/emergencias', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body:formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveNotificaciones = async (data, token) => {
    const formData = new FormData();
    formData.append("data", data);
    const response = await fetch('https://arxsmart.com/api/v1/notificaciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}