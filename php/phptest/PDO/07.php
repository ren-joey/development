<?php
/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2017/6/18
 * Time: 下午 03:30
 * https://www.w3schools.com/php/php_mysql_connect.asp
 * Prepared Statements in PDO
 */

$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "pdo_test";
$tablename = "MyGuests";

try{
    //Create connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
    //set the PDO error mode to exception
    $conn -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    //prepare sql and bind parameters
    $stmt = $conn -> prepare("INSERT INTO " . $tablename . " (firstname , lastname , email)
    VALUE (:firstname , :lastname , :email)");
    $stmt -> bindParam(':firstname' , $firstname);
    $stmt -> bindParam(':lastname' , $lastname);
    $stmt -> bindParam(':email' , $email);

    // insert a row
    $firstname = "John";
    $lastname = "Doe";
    $email = "john@example.com";
    $stmt -> execute();

    //insert another row
    $firstname = "Mary";
    $lastname = "Moe";
    $email = "mary@example.com";
    $stmt -> execute();

    //insert another row
    $firstname = "Julie";
    $lastname = "Dooley";
    $email = "julie@example.com";
    $stmt -> execute();

    echo "New records created successfully.";
}
catch(PDOException $e){
    echo $sql . "<br>" . $e -> getMessage();
}
    //Close the connection
    $conn = null;
?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Untitled Document</title>
</head>

<body>

</body>
</html>