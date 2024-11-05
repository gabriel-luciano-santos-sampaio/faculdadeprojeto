<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ultra_imagem"; // O nome do seu banco de dados

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($conn->query($sql) === TRUE) {
    echo "Tabela 'agendamentos' criada com sucesso";
} else {
    echo "Erro ao criar tabela: " . $conn->error;
}

$conn->close();
?>
