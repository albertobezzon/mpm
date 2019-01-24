var urlString = window.location.href;
var url = new URL(urlString);
var codiceAzienda = url.searchParams.get("codiceAzienda");
var username = url.searchParams.get("username");
var host = "http://localhost:8080/webService";

function compute(xhttp) {
    var risp = JSON.parse(xhttp.responseText);
    document.getElementById("name").innerHTML = risp.nome;
    document.getElementById("code").innerHTML = "CoCo (Company code): "+codiceAzienda;
    var div = document.getElementById("articleList");
    if(risp.articoli.length == 0){
        var p = document.createElement("p");
        p.setAttribute("class","cart-empty");
        var text = document.createTextNode("Nessun articolo in carrello");
        p.appendChild(text);
        div.appendChild(p);
    }else{
        var article = null;
        var descr = null;
        var buttons = null;
        var editButton = null;
        var deleteButton = null;
        var h4 = null;
        var br = null;
        for(i = 0;i < risp.articoli.length; i++){
            article = document.createElement("div");
            article.setAttribute("class","article");
            descr = document.createElement("div");
            descr.setAttribute("class","info-article");
            buttons = document.createElement("div");
            buttons.setAttribute("class","button-article");
            editButton = document.createElement("button");
            deleteButton = document.createElement("button");
            editButton.setAttribute("class","btn-edit");
            editButton.value = "MODIFICA";
            deleteButton.setAttribute("class","btn-delete");
        }
    }
}

function loadCart() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",host+"/PrelievoInfoArticoli",true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            compute(this);
        }
    };
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhttp.send("username="+username+"&codiceAzienda="+codiceAzienda);
}