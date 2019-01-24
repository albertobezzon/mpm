var host = "http://localhost:8080/webService";

function tryLogin() {
    var user = document.getElementById("input-user").value;
    var password = document.getElementById("input-password").value;
    var xhttp = new XMLHttpRequest();

    if(user!="" && password!=""){
        xhttp.open("POST",host+"/Autenticazione",true);
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                var risp = JSON.parse(this.responseText);
                if(risp.codice == "0"){
                    alert("Accesso avvenuto con successo!");
                    location.replace("homepage.html?codAzienda="+risp.codiceAzienda+"&username="+
                        risp.username);
                }else{
                    if(risp.codice == "1"){
                        alert("hai sbagliato la password, reinserisci");
                        document.getElementById("input-password").value = "";
                    }else{
                        alert("username insesistente");
                        document.getElementById("input-user").value = "";
                        document.getElementById("input-password").value = "";
                    }
                }
            }
        };
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhttp.send("username="+user+"&password="+password);
    }else{
        alert("Inserire username e password");
    }
}