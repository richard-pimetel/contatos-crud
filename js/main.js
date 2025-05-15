'use strict'

import { getContatos, getContatosPorNome, postContato } from "./contatos.js"
import { uploadImageToAzure } from "./uploadImageToAzure.js"

function criarCard (contato){
    // console.log(contato)
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')
    card.innerHTML = `
        <img src="${contato.foto}" alt="">
        <h2>${contato.nome}</h2>
        <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos(){
    const contatos = await getContatos()
    // console.log(contatos)
    const container =document.getElementById('container')
    container.replaceChildren()
    contatos.forEach( criarCard )
}

async function exibirPesquisa(evento){
    if (evento.key == 'Enter'){
        // console.log(evento)
        // console.log(evento.target.value)
        // console.log('Olá Mundo')
        const contatos = await getContatosPorNome(evento.target.value)
        document,getElementById('container').replaceChildren()
        contatos.forEach(criarCard)
    }
}

function cadastrarContato (){
    document.querySelector('main').className = 'form-show'
}

function voltarHome (){
    document.querySelector('main').className = 'card-show'
}
function preview ({target}){
    document.getElementById('preview-image')
        .src = URL.createObjectURL(target.files[0])
}

async function salvarContato(){

    const uploadParams = {
        file: document.getElementById('foto').files[0],
        storageAccount: 'storege2',
        sasToken: 'sp=racwl&st=2025-05-15T17:26:21Z&se=2025-05-15T19:00:00Z&sv=2024-11-04&sr=c&sig=M0siAqE22e%2BXrvRxIkz1LjyuqSk9jLC5sKMGvwHMzWE%3D',
        containerName: 'fotos',
    };

    const contato = {
        "nome": document.getElementById('nome').value,
        "celular": document.getElementById('celular').value,
        "foto": await uploadImageToAzure(uploadParams),
        "email": document.getElementById('email').value,
        "endereco": document.getElementById('endereco').value,
        "cidade": document.getElementById('cidade').value
    }

    if(await postContato(contato)){
        await exibirContatos()
        voltarHome()
        alert('Cadastro realizado com sucesso!')
    }
}

exibirContatos()
// getContatos()

document.getElementById('pesquisa')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', cadastrarContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)

document.getElementById('foto')
        .addEventListener('change', preview)