/// <reference path="../typings/jquery/jquery.d.ts"/>

$(document).ready(function(){
	
	function ko(reason){
		$("#error").html(reason).slideDown(600).delay(3000).slideUp();
	};
	
	function ok(data){
//		$("#error").html(data.md5).slideDown(600).delay(3000).slideUp();
		for(var i in data.urls){
			var url = data.urls[i];
			$(".img"+i).html(i + "x" + i + '<img src="'+ url +'" alt="your gravatar">');
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
		var mail = $("#email").val();
	  	getData( mail );
		window.location.hash = "#email=" + mail;
	  	event.preventDefault();
	});
	
	
	
	
	
	/* Add search string hability */
	
	function getQueryVariable(variable)
	{
       var query = window.location.hash.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
	

	
	(function(){
		var mail = getQueryVariable("email");
		if(mail !== false && mail != ""){
			$("#email").val(mail);
			getData(mail);
			window.location.hash = "#email=" + mail;
		}
		
	})();
	
	window.onpopstate = function(event) {
//  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
			var mail = getQueryVariable("email");
			if(mail !== false && mail != ""){
				$("#email").val(mail);
				getData(mail);
				window.location.hash = "#email=" + mail;
			}
};

});