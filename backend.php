<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_db";
$port = "3307";

$conn = new mysqli($servername, $username, $password, $dbname,$port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO Login (name, email, password) VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location:popup.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

if (isset($_POST['login-email']) && isset($_POST['login-password'])) {
    $loginEmail = $_POST['login-email'];    
    $loginPassword = $_POST['login-password'];

    $sql = "SELECT * FROM Login WHERE email='$loginEmail'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($loginPassword, $row['password'])) {
            header("Location:Module 2.html");
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "User not found.";
    }
}
if (isset($_POST['admin-username']) && isset($_POST['admin-password'])) {
    $adminUsername = $_POST['admin-username'];
    $adminPassword = password_hash($_POST['admin-password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO Admin (username, password) VALUES ('$adminUsername', '$adminPassword')";

    if ($conn->query($sql) === TRUE) {
        header("Location: admin_registration_success.php");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
