var menuListener = document.getElementsByClassName("navbar-fostrap")[0];
var containerListener = document.getElementsByClassName("body-container")[0];
var footerListener = document.getElementsByClassName("banner-button")[0];
menuListener.addEventListener("click",openMenu);
containerListener.addEventListener("click",deleteMenu);
if(footerListener != null){
    footerListener.addEventListener("click",deleteMenu);
}


function openMenu() {
    var body = document.getElementsByTagName("BODY")[0].classList;
    var menu = document.getElementById("mobile-menu").classList;
    if(body.contains("cover-big") && menu.contains("visible")){
        deleteMenu();
    }else{
        body.add("cover-big");
        menu.add("visible");
    }
}

function deleteMenu() {
    var body = document.getElementsByTagName("BODY")[0].classList;
    var menu = document.getElementById("mobile-menu").classList;
    if(body.contains("cover-big") && menu.contains("visible")){
        body.remove("cover-big");
        menu.remove("visible");
    }
}