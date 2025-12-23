//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

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

function expenseAdd(newExpense) {
    try {
        //Cria o elemento que vai adicionar na lista
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');
        
    } catch (error) {
        alert('Erro ao adicionar despesa');
        console.log(error);
    }
}



