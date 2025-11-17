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

async function getPerguntas() {
    const url = 'https://conectatech-perguntas-back.onrender.com/perguntas'
    const response = await fetch (url)
    const perguntas = await response.json()

    return perguntas
}


async function deletePergunta(id) {
    const url = `https://conectatech-perguntas-back.onrender.com/perguntas/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch (url, options)

    return  response.ok
}

function criarCard (p) {
    const div = document.createElement('div');
        div.className = 'bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700 transition-all';
        
        div.innerHTML = `
            <p class="text-white text-xl mb-3">${p.pergunta}</p>
            <div class="flex flex-col gap-3">
                <div class="text-sm">
                    <span class="text-blue-400 font-medium">${p.nome || 'Anônimo'}</span>
                </div>
                <div class="flex flex-wrap">
                    <button
                        data-id="${p.id}"
                        class="btn-deletar px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
                        <i class="far fa-trash-alt"></i>
                        Deletar
                    </button>
                </div>
            </div>
        `;

        return div
}


async function carregarPerguntas () {

    const container = document.getElementById('container-perguntas')

    const perguntas = await getPerguntas()
    
    const cards = perguntas.map(criarCard)

    container.replaceChildren(...cards)

    
}

async function deletarPerguntas(e) {

    const btn = e.target.closest('.btn-deletar');
    if (!btn) return;
    
    const id = btn.dataset.id;
    
    if (!confirm('Tem certeza que deseja deletar esta pergunta?')) return;

    if (await deletePergunta(id)) {
         mostrarToast('✓ Pergunta deletada!');
        carregarPerguntas()
    }


}

carregarPerguntas()

document.getElementById('container-perguntas').addEventListener('click', deletarPerguntas)