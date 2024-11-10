<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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
$nome = isset($_POST['nome']) ? $_POST['nome'] : null;
$cpf = isset($_POST['cpf']) ? $_POST['cpf'] : null;
$celular = isset($_POST['celular']) ? $_POST['celular'] : null;
$genero = isset($_POST['genero']) ? $_POST['genero'] : null;
$exame = isset($_POST['exame']) ? $_POST['exame'] : null;
$data = isset($_POST['data']) ? $_POST['data'] : null;


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
