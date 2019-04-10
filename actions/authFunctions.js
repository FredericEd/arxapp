export const login = async (correo, clave) => {
    const formData = new FormData();
    formData.append("correo", correo);
    formData.append("clave", clave);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/login', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'multipart/form-data',}),
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return [response.ok, json];
}

export const recoverClave = async (cedula) => {
    const formData = new FormData();
    formData.append("cedula", cedula);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const confirmClave = async (cedula, code) => {
    const formData = new FormData();
    formData.append("cedula", cedula);
    formData.append("code", code);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export const saveClave = async (cedula, clave, code) => {
    const formData = new FormData();
    formData.append("cedula", cedula);
    formData.append("clave", clave);
    formData.append("code", code);
    const response = await fetch('https://arxsmart.com/api/v1/usuarios/recover/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            'Expires': '0',
        },
        body: formData,
    });
    const json = await response.json();
    console.log(json);
    return json;
}