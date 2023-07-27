// Função para recuperar os dados do armazenamento local
function obterListaDoArmazenamentoLocal() {
    const listaJSON = localStorage.getItem('listaCompras');
    return listaJSON ? JSON.parse(listaJSON) : [];
}

// Função para salvar a lista no armazenamento local
function salvarListaNoArmazenamentoLocal() {
    localStorage.setItem('listaCompras', JSON.stringify(listaItens));
}

// Função para adicionar um item à lista
function adicionarItem() {
    const itemInput = document.getElementById('itemInput');
    const precoInput = document.getElementById('precoInput');
    const nome = itemInput.value.trim();
    const preco = parseFloat(precoInput.value);

    if (nome !== '' && !isNaN(preco) && preco > 0) {
        listaItens.push({
            nome: nome,
            comprado: false,
            preco: preco
        });

        itemInput.value = '';
        precoInput.value = '';
        salvarListaNoArmazenamentoLocal();
        exibirLista();
    }
}

// Função para exibir a lista atualizada
function exibirLista() {
    const listaCompras = document.getElementById('listaCompras');
    listaCompras.innerHTML = '';

    listaItens.forEach((item, index) => {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <div>
                <input type="checkbox" onchange="marcarItem(${index})" ${item.comprado ? 'checked' : ''}>
                <button onclick="editarItem(${index})">Editar</button>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
        listaCompras.appendChild(itemLista);
    });
}

// Função para marcar um item como comprado ou não comprado
function marcarItem(index) {
    listaItens[index].comprado = !listaItens[index].comprado;
    salvarListaNoArmazenamentoLocal();
}

// Função para remover um item da lista
function removerItem(index) {
    listaItens.splice(index, 1);
    salvarListaNoArmazenamentoLocal();
    exibirLista();
}

// Função para editar um item da lista
function editarItem(index) {
    const novoNome = prompt('Digite o novo nome do item:');
    const novoPreco = parseFloat(prompt('Digite o novo preço do item:').replace(',', '.'));

    if (novoNome && !isNaN(novoPreco) && novoPreco > 0) {
        listaItens[index].nome = novoNome;
        listaItens[index].preco = novoPreco;
        salvarListaNoArmazenamentoLocal();
        exibirLista();
    }
}

// Função para calcular o valor total dos itens selecionados
function calcularTotal() {
    const totalSpan = document.getElementById('total');
    let totalValor = 0;

    listaItens.forEach(item => {
        if (item.comprado) {
            totalValor += item.preco;
        }
    });

    totalSpan.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
}

// Inicializa a lista com os dados do armazenamento local
let listaItens = obterListaDoArmazenamentoLocal();

// Exibe a lista inicial
exibirLista();
