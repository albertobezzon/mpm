var urlString = window.location.href;
var url = new URL(urlString);
var codiceAzienda = url.searchParams.get("codiceAzienda");
var username = url.searchParams.get("username");
var barCode = url.searchParams.get("codiceArticolo");
var mode = url.searchParams.get("mode");
var host = "http://localhost:8080/webService";
var prezzo = 0.0;
var source = url.searchParams.get("source");

function removeLoader() {
    document.getElementById("loading").style.display = "none";
}

function placeLoader() {
    document.getElementById("loading").style.display = "block";
}

function confirmOperation() {
    var ok = confirm("Sicuro di voler effettuare l'operazione?");
    if(ok) {
        var query = "";
        if(mode == "update"){
            query = "update contenutoCarrelli set quantita="+document.getElementById("quantity").value+"where username='"+username+"'";
        }else{
            query = "insert into contenutoCarrelli(barCode,quantita,username) values('"+barCode+"',"+document.getElementById("quantity").value+",'"+username+"')";
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST",host+"/AggiuntaModificaArticolo",true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resp = JSON.parse(this.responseText);
                if (resp.ok == "1") {
                    removeLoader();
                    alert("Operazione eseguita con successo");
                    location.replace("homepage.html?codiceAzienda="+codiceAzienda+"&username="+username);
                }else{
                    removeLoader();
                    alert("Errore nell'esecuzione dell'operazione");
                }
            }
        };
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhttp.send("codiceAzienda="+codiceAzienda+"&query="+query);
        placeLoader();
    }
}

function deleteOperation() {
    location.replace(source+".html?codiceAzienda="+codiceAzienda+"&username="+username);
}

function minusPressed() {
    var q = parseInt(document.getElementById("quantity").value,10);
    if(q > 0) {
        q = q - 1;
        document.getElementById("quantity").value = q;
        document.getElementById("price").innerHTML = q*prezzo;
    }
}

function plusPressed() {
    var q = parseInt(document.getElementById("quantity").value,10);
    q += 1;
    document.getElementById("quantity").value = q;
    document.getElementById("price").innerHTML = q*prezzo;
}

function loadArticleInfo() {
    var nome = "";
    var quantita = 0;
    var descrizione = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",host+"/PrelievoInfoArticolo",true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            if(resp.ok == "1"){
                nome = resp.nome;
                descrizione = resp.descrizione;
                prezzo = resp.prezzo;
                document.getElementById("name").innerHTML = nome;
                document.getElementById("description").innerHTML = descrizione;
                if(mode == "update"){
                    document.getElementById("bannerTitle").innerHTML = "Modifica articolo";
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST",host+"/PrelievoInfoArticoli",true);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            var resp = JSON.parse(this.responseText);
                            if (resp.articoli.length != 0) {
                                for (var i = 0; i < resp.articoli.length; i++) {
                                    if (resp.articoli[i]["codice"] == barCode) {
                                        quantita = resp.articoli[i]["quantita"];
                                        document.getElementById("quantity").value = quantita;
                                        document.getElementById("price").innerHTML = quantita*prezzo;
                                    }
                                }
                            }
                        }
                        removeLoader();
                    };
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                    xhttp.send("username="+username+"&codiceAzienda="+codiceAzienda);
                }else{
                    document.getElementById("bannerTitle").innerHTML = "Aggiungi articolo";
                    document.getElementById("quantity").value = 0;
                    document.getElementById("price").innerHTML = 0.0;
                    removeLoader();
                }
            }
        }
    };
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhttp.send("codice="+barCode+"&codiceAzienda="+codiceAzienda);
}