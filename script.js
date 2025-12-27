//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//Seleciona os elementos da li
const expenseList = document.querySelector('ul');
const expensesQuantity = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2');

//Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtém o valor atual e remove todos os caracteres que não são dígitos numéricos.
    let value = amount.value.replace(/\D/g, '');

    //value é dividido por 100 para considerar os centavos
    value = Number(value) / 100;

    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    //Formata o valor para o padrão de moeda brasileira (BRL)
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    //Retorna o valor formatado
    return value;
}

//Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
    //Previne o comportamento padrão de envio do formulário
    event.preventDefault();

    //Cria um objeto com os detalhes da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    };

    //Chama a função de adicionar despesa
    expenseAdd(newExpense);
}

//Adiciona um novo item a lista de despesas
function expenseAdd(newExpense) {
    try {
        //Cria o elemento que vai adicionar na lista
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');

        //Cria um icone da categoria
        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute('alt', newExpense.category_name);

        //Cria a info da despesa.
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        //Cria o nome da despesa
        const expenseName = document.createElement('strong');
        expenseName.textContent = newExpense.expense;

        //Cria a categoria da despesa
        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name;

        //Adiciona name e category na div das informações
        expenseInfo.append(expenseName, expenseCategory);

        //Criando o valor da despesa
        const expenseAmount = document.createElement('span');
        expenseAmount.classList.add('expense-amount');
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
            .toUpperCase()
            .replace('R$', '')}`;

        //Criando o ícone de remover
        const removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        removeIcon.setAttribute('src', 'img/remove.svg');
        removeIcon.setAttribute('alt', 'remover');

        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon); ;

        //Adiciona o item na lista
        expenseList.append(expenseItem);

        //Atualiza os totais
        updateTotals();

        //Limpa o formulário
        formClear();

    } catch (error) {
        alert('Erro ao adicionar despesa');
        console.log(error);
    }
}

//Atualizar os totais
function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista de despesas
        const items = expenseList.children

        //Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.lenght > 1 ? "despesas" : "despesa"}`

        //Variavel para incrementar o total
        let total = 0

        //Percorre cada item da lista
        for(let item = 0 ; item < items.length; item++){ {
            const itemAmount = items [item].querySelector(".expense-amount")
            //Remover caracteres não numéricos e substituir vírgula por ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "".replace(",",".")) 

            //Converte o valor para float.
            value = parseFloat (value)

            //Verifica se um número válido
            if(isNaN(value)) {
                return alert ('Valor inválido encontrado')
            }

            // Incrementar o valor total
            total += Number(value)
        }
    }

    //Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement ('small')
    symbolBRL.textContent = 'R$'

    // formata o valor e remove o R$ que será exibido pela small
    total =formatCurrencyBRL(total).toUpperCase().replace('R$', '')

    //Limpa o conteúdo do elemento
    expensesTotal.innerHTML = ''

    //Adiciona o símbolo e o total formatado no elemento
    expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error);
        alert('Erro ao atualizar totais');
    }
}



//Captura o evento de clique na lista de despesas para remover um item
expenseList.addEventListener('click', function(event) {
    //Verifica se o elemento clicado é o ícone de remover
    if(event.target.classList.contains('remove-icon')) { 
        //Obtém o elemento pai (li) do ícone clicado
        const item = event.target.closest('.expense');
        //Remove o item da lista
        item.remove()
}
    //Atualiza os totais após a remoção
    updateTotals();
})

function formClear() {
    //Limpa os valores dos inputs
    expense.value = ''
    category.value = ''
    amount.value = ''

    //Define o foco de volta para o input de despesa
    expense.focus()
}