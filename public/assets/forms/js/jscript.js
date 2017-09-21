function formular(form){ 
	var send;
	//tjek navne_feltet
	if(form.name.value.length < 1 || form.name.value.length == 0 || form.name.value == ""){
			document.getElementById("name").style.backgroundColor = "#ffaaaa";
			document.getElementById("navn_validation").innerHTML = "Udfyld venligst navn.";
			form.name.focus();
			send = false;	
		}
		else 
		{
			if(send == true)
			{
				send == true; 
			}
			else if ( send == false) 
			{
				send == false;
			}
			document.getElementById("name_validation").innerHTML = "";
			document.getElementById("name").style.backgroundColor = "transparent";
		}
	
	//tjek adresse_feltet
	
	if(form.adress.value.length < 1 || form.adress.value.length == 0 || form.adress.value == ""){
		document.getElementById("adress").style.backgroundColor = "#ffaaaa";
		document.getElementById("adress_validation").innerHTML = "Udfyld venligst adresse.";
		form.adress.focus();
		send = false;
	}
	else {
			if(send == true)
			{
				send == true; 
			}
			else if ( send == false) 
			{
				send == false;
			}
		document.getElementById("adress_validation").innerHTML = "";
		document.getElementById("adress").style.backgroundColor = "transparent";
	}
	
	//tjek zip_code_feltet
	
	if(form.zip_code.value.length < 1 || form.zip_code.value.length == 0 || form.zip_code.value == ""){
			document.getElementById("zip_code").style.backgroundColor = "#ffaaaa";
		document.getElementById("zip_code_validation").innerHTML = "Udfyld venligst zip_code.";
		form.zip_code.focus();
		send = false;
	}
	
	else 
	{ 
	   if(isNaN(form.zip_code.value)) 
	   { 
			document.getElementById("zip_code").style.backgroundColor = "#ffaaaa";
			document.getElementById("zip_code_validation").innerHTML = "Udfyld venligst med cifre.";
			send = false;
	   } 
	   else 
		{ 
		  if(form.zip_code.value.length != 4) 
		  { 
			document.getElementById("zip_code").style.backgroundColor = "#ffaaaa";
			document.getElementById("zip_code_validation").innerHTML = "Udfyld venligst zip_code med 4 cifre.";
			send = false;
		  } 
		  else 
		  { 
			if(send == true)
			{
				send == true; 
			}
			else if ( send == false) 
			{
				send == false;
			}
			document.getElementById("zip_code_validation").innerHTML = "";
			document.getElementById("zip_code").style.backgroundColor = "transparent";
		  } 
		} 
	}
	
	//tjek city_feltet
	
	if(form.city.value.length < 1 || form.city.value.length == 0 || form.city.value == ""){
		document.getElementById("city").style.backgroundColor = "#ffaaaa";
		document.getElementById("city_validation").innerHTML = "Udfyld venligst city.";
		form.city.focus();
		send = false;
	}
	else {
		document.getElementById("city_validation").innerHTML = "";
		document.getElementById("city").style.backgroundColor = "transparent";
	}
	
	//tjek phone_feltet
	
	if(form.phone_number.value.length < 1 || form.phone_number.value.length == 0 || form.phone_number.value == ""){
		document.getElementById("phone_number").style.backgroundColor = "#ffaaaa";
		document.getElementById("phone_number_validation").innerHTML = "Udfyld venligst telefonnummer.";
		form.phone_number.focus();
		send = false;
	}
	else 
	{ 
	   if(isNaN(form.phone_number.value)) 
	   { 
			document.getElementById("phone_number").style.backgroundColor = "#ffaaaa";
			document.getElementById("phone_number_validation").innerHTML = "dette er ikke et telefonnummer.";
			send = false;
	   } 
	   else 
		{ 
		  if(form.phone_number.value.length != 8) 
		  { 
			document.getElementById("phone_number").style.backgroundColor = "#ffaaaa";
			document.getElementById("phone_number_validation").innerHTML = "telefonnumre er på 8 cifre.";
			send = false;
		  } 
		  else 
		  { 
			send = true;
			document.getElementById("phone_number_validation").innerHTML = "";
			document.getElementById("phone_number").style.backgroundColor = "transparent";
		  } 
		} 
	}
	
	//tjek e-mail_feltet
	
	if(form.email_adress.value.length < 1 || form.email_adress.value.length == 0 || form.email_adress.value == ""){
		document.getElementById("email_adress").style.backgroundColor = "#ffaaaa";
		document.getElementById("email_adress_validation").innerHTML = "Udfyld venligst email_adress.";
		form.email_adress.focus();
		send = false;
	}
	else 
	{
		if(checkEmail(form.email_adress.value))
		{
			document.getElementById("email_adress").style.backgroundColor = "#ffaaaa";
			document.getElementById("email_adress_validation").innerHTML = "Udfyld venligst email_adress med korrekt format.";
			if(send == true)
			{
				send == true; 
			}
			else if ( send == false) 
			{
				send == false;
			}
		}
	}
	//tjek checkbox'en
	
	if(document.getElementById("subscribe".checked != true))
	{
		document.getElementById("subscribe_validation").innerHTML = "Udfyld venligst subscribe.";
		form.subscribe.focus();
		send = false;
	}
	
	//tjek message_feltet
	
	if(form.message.value.length < 1 || form.message.value.length == 0 || form.message.value == ""){
		document.getElementById("message_validation").innerHTML = "Udfyld venligst message.";
		form.message.focus();
		send = false;
	}
	else {
		if(send == true)
		{
			send == true;
		}
		else if( send == false)
		{
			send == false;
		}
	}
	
	
	if(send == true)
	{
		return send;
		window.close();
	}
	else {return send;}
} 

function checkEmail(email){ 
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (filter.test(email)){ 
        return false; 
    } 
    send = false; 
} 