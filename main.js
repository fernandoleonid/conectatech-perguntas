'use strict'

function mostrarToast(mensagem) {
    const toast = document.createElement('div');
    toast.textContent = mensagem;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #323232;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

async function enviarPergunta(pergunta) {
    const url = 'https://conectatech-perguntas-back.onrender.com/perguntas'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pergunta)
    }

    const response = await fetch(url, options)
    
    return response.ok
    
}

function cadastrarPergunta () {
    const pergunta = document.getElementById('pergunta').value.trim()

    if (!pergunta) return 

    const perguntaCompleta = {
        nome: document.getElementById('nome').value || 'Anônimo',
        pergunta: pergunta.replace(/[.!?]+$/, '') + '?'
    }

    if (enviarPergunta(perguntaCompleta)){
        mostrarToast('✓ Pergunta enviada com sucesso!');
    }
}

document.getElementById('enviar')
        .addEventListener('click', cadastrarPergunta)