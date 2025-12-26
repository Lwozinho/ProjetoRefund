//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//Seleciona os elementos da li
const expenseList = document.querySelector('ul');
const expensesQuantity = document.querySelector('aside header p span')

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

            

        }
    }
    } catch (error) {
        console.log(error);
        alert('Erro ao atualizar totais');
    }
}

