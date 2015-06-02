/// <reference path="../typings/jquery/jquery.d.ts"/>

$(document).ready(function(){
	
	function ko(reason){
		$("#error").html(reason).slideDown(600).delay(3000).slideUp();
	};
	
	function ok(data){
//		$("#error").html(data.md5).slideDown(600).delay(3000).slideUp();
		for(var i in data.urls){
			var url = data.urls[i];
			$(".img"+i).html('<img src="'+ url +'" alt="your gravatar">');
			$(".desc"+i).html('<a class="download" href="'+ url +'" download>Download</a> <br> <input value="'+ url +'" readonly>')
		}
	};
	
	
	function getData(mail){
		$.getJSON( "api.php", {email: mail}, function( data ) {
		  if(!!data.error){
			  ko(data.error);
		  }
		  else{
			  ok(data);
		  }
		});
	};
	
	
	$( "#theform" ).submit(function( event ) {
		$("#error").hide();
	  getData( $("#email").val() );
	  event.preventDefault();
	});
	
	
	
});