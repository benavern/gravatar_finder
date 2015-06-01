<?php
	
//	Conditions
	if( isset($_GET['email']) ){

		if($_GET['email'] != ""){
			ok($_GET['email']);
		}
		else{
			ko("You must enter an email adress.");
		}
	}
	else{
		ko();
	}
	
	
	
	
	
//	bad mail
	function ko($reason="There was an unknown error"){
		$out = ["error" => $reason];
		echo json_encode($out);
	}
	
//	good email
	function ok($email){
		$out = [
			"email" => $email, 
			"md5"   => md5($email),
			"url"   => [
				"http://gravatar.com/avatar/". md5($email) ."?s=200",
				"http://gravatar.com/avatar/". md5($email) ."?s=120",
				"http://gravatar.com/avatar/". md5($email) ."?s=60"
				]
		];
		echo json_encode($out);
	}