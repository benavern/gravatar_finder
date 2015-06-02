<?php
	
//	Conditions
	if( isset($_GET['email']) ){

		if($_GET['email'] != ""){
			if (filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) {
			    ok($_GET['email']);
			}
			else{
				ko("email not valid");
			}
			
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
			"urls"   => [
				"200"=>"http://gravatar.com/avatar/". md5($email) ."?s=200",
				"120"=>"http://gravatar.com/avatar/". md5($email) ."?s=120",
				"60"=>"http://gravatar.com/avatar/". md5($email) ."?s=60"
				]
		];
		echo json_encode($out);
	}