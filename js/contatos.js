'use strict'

export async function getContatos(){
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export async function getContatosPorNome(nome){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos?nome_like=^${nome}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function getContatoEspecifico(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}

export async function postContato(contato){
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    return response.status
}

async function putContato(id, contato){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    return response.status
}

async function deleteContato(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)
    return response.status
}



const novoContato = {
    "nome": "richard",
    "celular": "11 9 5656-8949",
    "foto": "../img/giovanna-xavier.png",
    "email": "giovanna@gmail.com",
    "endereco": "Av. São Joaquim, 777",
    "cidade": "Barueri"
}