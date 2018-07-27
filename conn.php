<?php
// database logingegevens
$db_hostname = 'localhost';
$db_username = 'tim';
$db_password = 'dorsman123';
$db_database = 'blackjack';

error_reporting(E_ERROR | E_PARSE);


// maak de database-verbinding
$conn = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
