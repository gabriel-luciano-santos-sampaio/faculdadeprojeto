// Seleciona o formulário
const form = document.getElementById('formAgendamento');

// Adiciona um evento ao enviar o formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const nomeFormatado = capitalizeName(nome);
    const cpfRaw = document.getElementById('cpf').value.replace(/\D/g, '');
    const celularRaw = document.getElementById('num').value.replace(/\D/g, '');
    const genero = document.querySelector('input[name="genero"]:checked')?.value;
    const exame = document.getElementById('exame').value;
    const data = document.getElementById('data').value;

    // Cria um objeto Date para a data de amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Define a hora para 00:00:00

    // Cria um objeto Date para a data selecionada
    const selectedDate = new Date(data);
    selectedDate.setHours(0, 0, 0, 0); // Define a hora para 00:00:00

    // Limpa mensagens de erro anteriores
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';
    let hasErrors = false;

    // Validação do Nome Completo
    const nomeParts = nome.split(' ');
    if (nomeParts.length < 2) {
        errorMessagesDiv.innerHTML += 'Por favor, insira seu sobrenome.<br>';
        hasErrors = true;
    }

    // Validação do CPF
    if (!isValidCPF(cpfRaw)) {
        errorMessagesDiv.innerHTML += 'Por favor, insira um CPF válido.<br>';
        hasErrors = true;
    }

    // Validação do Celular
    if (celularRaw.length !== 11) {
        errorMessagesDiv.innerHTML += 'Por favor, insira um celular válido<br>';
        hasErrors = true;
    }

    // Validação da data
    if (selectedDate < tomorrow) {
        errorMessagesDiv.innerHTML += 'A data deve ser daqui a 2 dias.<br>';
        hasErrors = true;
    }

    // Se houver erros, exibe a caixa de avisos e não continua
    if (hasErrors) {
        errorMessagesDiv.style.display = 'block';
        return;
    }

    // Continue com o processamento do formulário aqui...

    // Exemplo: Formatar a data e exibir no modal
    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Monta a mensagem para o modal
    const modalMessage = `Nome: ${nome}<br>CPF: ${cpfRaw}<br>Celular: ${celularRaw}<br>Gênero: ${genero}<br>Exame: ${exame}<br>Data: ${dataFormatada}`;
    document.getElementById('modalMessage').innerHTML = modalMessage;

    // Exibe o modal
    document.getElementById('modal').style.display = 'block';
});

// Fecha o modal ao clicar no botão de fechar
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

// Fecha o modal ao clicar no botão OK
document.getElementById('confirmButton').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11); // Limita a 11 dígitos
    }
    return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
              .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
}

function formatCelular(celular) {
    celular = celular.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (celular.length > 11) {
        celular = celular.slice(0, 11); // Limita a 11 dígitos
    }
    if (celular.length > 6) {
        return celular.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
    }
    if (celular.length > 2) {
        return celular.replace(/(\d{2})(\d{0,5})/, '($1) $2'); // Formato (XX) X
    }
    return celular; // Retorna o valor como está se não estiver em formato
}

function handleCPFInput(event) {
    const input = event.target;
    input.value = formatCPF(input.value);
}

function handleCelularInput(event) {
    const input = event.target;
    input.value = formatCelular(input.value);
}

function getRawCPF(event) {
    const input = event.target;
    console.log('Raw CPF:', input.value.replace(/\D/g, '')); // Valor sem formatação
}

function getRawCelular(event) {
    const input = event.target;
    console.log('Raw Celular:', input.value.replace(/\D/g, '')); // Valor sem formatação
}

function capitalizeName(name) {
    return name.split(' ')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
               .join(' ');
}


function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF inválido se todos os dígitos forem iguais
    }

    let sum = 0;
    let remainder;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf[i - 1]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf[9])) {
        return false;
    }

    sum = 0;

    // Valida o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf[10])) {
        return false;
    }

    return true; // CPF válido
}
