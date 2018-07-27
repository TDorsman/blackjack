<?php
session_start();
include('conn.php');

if($conn) {
	$placedbet = $_POST['money'];
	$status = $_POST['status'];

	$sql1 = $sql = "SELECT `money` FROM `users` WHERE `id` = 1";

	$query1 = mysqli_query($conn, $sql1);

	$row = mysqli_fetch_assoc($query1);

	echo $status;

	if($status == 1) {
		$newmoney = $row['money'] + $placedbet;
		echo $status;
		echo "Plus ";
	}
	if($status == 0) {
		$newmoney = $row['money'] - $placedbet;
		echo $status;
		echo "Minus ";
	}
	

	$sql = "UPDATE `users` SET `money` = '$newmoney' WHERE `id` = 1";

	$query = mysqli_query($conn, $sql);

	if($query && $query1) {
		echo "Money has been updated";
	}
	else {
		echo "Error";
	}
}

// if(basename($_SERVER['PHP_SELF']) == "updatemoney.php") {
// 	header("location: test.php");
// }


?>
