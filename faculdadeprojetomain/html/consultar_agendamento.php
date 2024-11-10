<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ultra_imagem";

// Conecte-se ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexão falhou: " . $conn->connect_error]));
}

$cpf = isset($_POST['cpf']) ? preg_replace('/\D/', '', $_POST['cpf']) : '';

// Obtém o CPF enviado pelo formulário
$cpf = $_POST['cpf'] ?? '';

// Prepara a consulta para buscar o agendamento pelo CPF
$sql = "SELECT nome, cpf, celular, genero, exame, data FROM agendamentos WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

// Verifica se encontrou algum agendamento
if ($result->num_rows > 0) {
    // Converte o resultado em um array e envia como resposta JSON
    $agendamento = $result->fetch_assoc();
    echo json_encode($agendamento);
} else {
    // Retorna um erro se nenhum agendamento for encontrado
    echo json_encode(["error" => "Nenhum agendamento encontrado para o CPF informado."]);
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>
