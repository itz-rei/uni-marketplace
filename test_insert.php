<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "unimart_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

$firstname = "Test";
$lastname = "User";
$email = "testuser@example.com";
$password_hash = password_hash("testpassword", PASSWORD_DEFAULT);
$created_at = date('Y-m-d H:i:s');

$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, created_at) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $firstname, $lastname, $email, $password_hash, $created_at);

if ($stmt->execute()) {
    echo "Inserted successfully!";
} else {
    echo "Insert failed: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>