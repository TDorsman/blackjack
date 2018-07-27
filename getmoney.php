<?php
session_start();
include('conn.php');

if($conn) {

	$sql = "SELECT `money` FROM `users` WHERE `id` = 1";

	$query = mysqli_query($conn, $sql);

	if($query) {
		if(mysqli_num_rows($query) > 0) {
			$row = 	mysqli_fetch_assoc($query);
			echo $row['money'];
		}
		else {
			echo "wrong";
		}
	}
	else {
		echo "Didnt work";
	}

}