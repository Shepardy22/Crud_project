class Produtos {

    constructor() {
        this.id = 1;

        this.arrayProdutos = [];

        this.editID = null;
    }

    
    addProduto() {

        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if(this.editID == null) {
                this.salvar(produto);
            }else {
                this.atualizar(this.editID, produto);
            }

            
        }
        this.listarDados();
        this.cancelar();

    }

    editar(dados) {
        this.editID = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.precoProduto;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    salvar(produto) {
        
        this.arrayProdutos.push(produto);
        this.id++;

        this.listarDados();
        this.cancelar();
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].precoProduto = produto.precoProduto;
            }
        }
    }

// Cria uma tabela com os dados do produto
    listarDados() {
        let tbody = document.querySelector("#tbody");
        tbody.innerHTML = '';

            for(let i = 0; i < this.arrayProdutos.length; i++) {
                let tr = tbody.insertRow();

                let td_id = tr.insertCell();
                let td_produto = tr.insertCell();
                let td_valor = tr.insertCell();
                let td_acoes = tr.insertCell();

                td_id.innerText = this.arrayProdutos[i].id;
                td_produto.innerText = this.arrayProdutos[i].nomeProduto;
                td_valor.innerText = this.arrayProdutos[i].precoProduto;

                let btnEditar = document.createElement("button");
                btnEditar.innerText = 'Editar';
                btnEditar.setAttribute('onclick', 'produtos.editar(' + JSON.stringify(this.arrayProdutos[i]) + ')');
                td_acoes.appendChild(btnEditar);

                let btnExcluir = document.createElement("button");
                btnExcluir.innerText = 'Excluir';
                btnExcluir.setAttribute('onclick', 'produtos.deletar( ' + this.arrayProdutos[i].id + ' )');
                td_acoes.appendChild(btnExcluir);

            }
    }
    lerDados() {
        // Lê os dados do produto
        let produto = {};
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.precoProduto = document.getElementById('preco').value;

        return produto;
    }
    validaCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }
        if (produto.precoProduto == '') {
            msg += '- Informe o preço do produto \n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }
        return true;

    }
    cancelar() {
        produto.nomeProduto = document.getElementById('produto').value = '';
        produto.precoProduto = document.getElementById('preco').value = '';   

        document.getElementById('btn1').innerText = 'Salvar';
        this.editID = null;
    }
    deletar(id){
        let tbody = document.querySelector("#tbody");

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
}

var produtos = new Produtos();

