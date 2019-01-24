var urlString = window.location.href;
var url = new URL(urlString);
var codiceAzienda = url.searchParams.get("codiceAzienda");
var username = url.searchParams.get("username");
var host = "http://localhost:8080/webService";

function deleteArticle(code) {
    var xhttp = new XMLHttpRequest();
    var ok = confirm("Vuoi eliminare?");
    if(ok){
        xhttp.open("POST",host+"/EliminazioneArticoli",true);
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                var risp = JSON.parse(this.responseText);
                if(risp.ok == "1"){
                    location.replace("homepage.html?codiceAzienda="+codiceAzienda+"&username="+username);
                }
            }
        };
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhttp.send("username="+username+"&codiceAzienda="+codiceAzienda+"&codici="+code);
    }
}

function editArticle(code) {
    var ok = confirm("Vuoi modificare?");
    if(ok){
        location.replace("article.html?codiceAzienda="+codiceAzienda+"&username="+username+"&codiceArticolo="+code);
    }
}

function compute(xhttp) {
    var risp = JSON.parse(xhttp.responseText);
    document.getElementById("name").innerHTML = risp.nome;
    document.getElementById("code").innerHTML = codiceAzienda;
    var div = document.getElementById("articleList");
    var total = 0.0;
    if(risp.articoli.length == 0){
        var p = document.createElement("p");
        p.setAttribute("class","cart-empty");
        var text = document.createTextNode("Nessun articolo in carrello");
        p.appendChild(text);
        div.appendChild(p);
        document.getElementById("totale").innerHTML = total;
    }else {
        var article = null;
        var descr = null;
        var buttons = null;
        var editButton = null;
        var deleteButton = null;
        var h4 = null;
        var textH4 = null;
        var prezzo = null;
        var textPrezzo = null;
        var both = null;
        for (i = 0; i < risp.articoli.length; i++) {
            article = document.createElement("div");
            article.setAttribute("class", "article");
            descr = document.createElement("div");
            descr.setAttribute("class", "info-article");
            buttons = document.createElement("div");
            buttons.setAttribute("class", "button-article");
            editButton = document.createElement("button");
            deleteButton = document.createElement("button");
            editButton.setAttribute("class", "btn-edit");
            editButton.innerHTML = "MODIFICA";
            deleteButton.setAttribute("class", "btn-delete");
            deleteButton.innerHTML = "ELIMINA";
            deleteButton.setAttribute("onclick", "deleteArticle(" + risp.articoli[i]["codice"] + ")");
            editButton.setAttribute("onclick", "editArticle(" + risp.articoli[i]["codice"] + ")");
            buttons.appendChild(editButton);
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(deleteButton);
            article.appendChild(descr);
            article.appendChild(buttons);
            h4 = document.createElement("h4");
            textH4 = document.createTextNode(risp.articoli[i]["nome"] + " (Qta: x" + risp.articoli[i]["quantita"] + ")");
            h4.appendChild(textH4);
            prezzo = document.createElement("span");
            textPrezzo = document.createTextNode("P. parziale: " + (risp.articoli[i]["prezzo"] * risp.articoli[i]["quantita"]) + "EUR");
            total += risp.articoli[i]["prezzo"] * risp.articoli[i]["quantita"];
            prezzo.appendChild(textPrezzo);
            both = document.createElement("div");
            both.setAttribute("style", "clear:both;");
            article.appendChild(both);
            descr.appendChild(h4);
            descr.appendChild(prezzo);
            div.appendChild(article);
        }
        document.getElementById("totale").innerHTML = total;
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