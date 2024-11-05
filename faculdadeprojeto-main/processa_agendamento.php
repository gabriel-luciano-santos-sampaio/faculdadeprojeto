<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ultra_imagem";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Depuração
var_dump($_POST); // Veja os dados recebidos

// Prepara e vincula
$stmt = $conn->prepare("INSERT INTO agendamentos (nome, cpf, celular, genero, exame, data) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nome, $cpf, $celular, $genero, $exame, $data);

// Recebe os dados do formulário
$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
$celular = $_POST['celular'];
$genero = $_POST['genero'];
$exame = $_POST['exame'];
$data = $_POST['data'];

// Executa a consulta
if ($stmt->execute()) {
    echo "Agendamento salvo com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>
