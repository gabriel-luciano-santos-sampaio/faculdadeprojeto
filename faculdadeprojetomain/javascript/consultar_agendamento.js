document.getElementById("formConsultar").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const cpf = document.getElementById("cpf").value;
    
    fetch("consultar_agendamento.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `cpf=${encodeURIComponent(cpf)}`
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById("consultaResultados");
        const resultText = document.getElementById("resultadoAgendamento");
        
        if (data.error) {
            resultText.textContent = data.error;
        } else {
            resultText.innerHTML = `
                Nome: ${data.nome}<br>
                CPF: ${data.cpf}<br>
                Celular: ${data.celular}<br>
                Gênero: ${data.genero}<br>
                Exame: ${data.exame}<br>
                Data: ${data.data}
            `;
        }
        
        resultDiv.style.display = "block";
    })
    .catch(error => {
        console.error("Erro ao consultar agendamento:", error);
    });
});

document.getElementById("formConsultar").addEventListener("submit", function(event) {
    event.preventDefault();

    // Remove a formatação do CPF
    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");

    fetch("consultar_agendamento.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `cpf=${encodeURIComponent(cpf)}`
    })
    .then(response => response.json())
    .then(data => {
        const modalMessage = document.getElementById("modalMessage");
        const modalResultado = document.getElementById("modalResultado");

        // Verifique se há um erro (caso não haja agendamento)
        if (data.error) {
            modalMessage.innerHTML = `<p>Não encontramos o seu agendamento. ❌</p>`;
        } else {
            // Exibe os dados do agendamento de forma legível
            modalMessage.innerHTML = `
                <p><strong>Nome:</strong> ${data.nome}</p>
                <p><strong>CPF:</strong> ${data.cpf}</p>
                <p><strong>Celular:</strong> ${data.celular}</p>
                <p><strong>Gênero:</strong> ${data.genero}</p>
                <p><strong>Exame:</strong> ${data.exame}</p>
                <p><strong>Data do Exame:</strong> ${data.data}</p>
                <br>
                <p>Está tudo certo com seu agendamento ✔️</p>
            `;
        }

        // Exibe o modal
        modalResultado.style.display = "block";
    })
    .catch(error => {
        console.error("Erro ao consultar agendamento:", error);
    });
});

// Fechar o modal
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("modalResultado").style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modalResultado")) {
        document.getElementById("modalResultado").style.display = "none";
    }
});
