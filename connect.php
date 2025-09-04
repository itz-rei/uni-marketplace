<?php
// Show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "unimart_db";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Registration logic
if (
    isset($_POST['firstname']) && !empty($_POST['firstname']) &&
    isset($_POST['lastname']) && !empty($_POST['lastname']) &&
    isset($_POST['email']) && !empty($_POST['email']) &&
    isset($_POST['password']) && !empty($_POST['password'])
) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $created_at = date('Y-m-d H:i:s');

    // Check if email already exists
    $check = $conn->prepare("SELECT id FROM users WHERE email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        // Email exists
        echo "<script>alert('Email already registered!'); window.location.href='login.html';</script>";
        $check->close();
        $conn->close();
        exit();
    }
    $check->close();

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, created_at) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstname, $lastname, $email, $password, $created_at);
    if ($stmt->execute()) {
        echo "<script>alert('Registration successful! Please log in.'); window.location.href='login.html';</script>";
    } else {
        echo "<script>alert('Registration failed! Please try again.'); window.location.href='login.html';</script>";
    }
    $stmt->close();
    $conn->close();
    exit();
}

// Login logic
if (
    isset($_POST['email']) && !empty($_POST['email']) &&
    isset($_POST['password']) && !empty($_POST['password']) &&
    (!isset($_POST['firstname']) || empty($_POST['firstname'])) &&
    (!isset($_POST['lastname']) || empty($_POST['lastname']))
) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password, firstname FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password, $firstname);
        $stmt->fetch();
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['firstname'] = $firstname;
            header("Location: index.php");
            $stmt->close();
            $conn->close();
            exit();
        } else {
            echo "<script>alert('Incorrect password!'); window.location.href='login.html';</script>";
            $stmt->close();
            $conn->close();
            exit();
        }
    } else {
        echo "<script>alert('No account found with this email!'); window.location.href='login.html';</script>";
        $stmt->close();
        $conn->close();
        exit();
    }
}

// Invalid submission fallback
echo "<script>alert('Invalid submission.'); window.location.href='login.html';</script>";
$conn->close();
exit();
?>