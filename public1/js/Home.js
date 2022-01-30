function clearActive(){
    document.getElementById("sidebar-option-1").classList.remove("active");
    document.getElementById("sidebar-option-2").classList.remove("active");
    document.getElementById("sidebar-option-3").classList.remove("active");

    document.getElementById("main-1").style.display = "none";
    document.getElementById("main-2").style.display = "none";
    document.getElementById("main-3").style.display = "none";
}

function select_sidebar_1(){
    let self_class = document.getElementById("sidebar-option-1").classList;
    console.log(self_class);

    if(self_class.contains("active") ){
        console.log("Already active");    
        return;
    }
    else {
        console.log("Activating sidebar 1");

        clearActive();

        document.getElementById("sidebar-option-1").classList.add("active");
        document.getElementById("main-1").style.display = "";
    }
}

function select_sidebar_2(){
    let self_class = document.getElementById("sidebar-option-2").classList;
    console.log(self_class);

    if(self_class.contains("active") ){
        console.log("Already active");    
        return;
    }
    else {
        console.log("Activating sidebar 2");

        clearActive();
        
        document.getElementById("sidebar-option-2").classList.add("active");
        document.getElementById("main-2").style.display = "";
    }
}

function select_sidebar_3(){
    let self_class = document.getElementById("sidebar-option-3").classList;
    console.log(self_class);

    if(self_class.contains("active") ){
        console.log("Already active");    
        return;
    }
    else {
        console.log("Activating sidebar 3");
    
        clearActive();
        
        document.getElementById("sidebar-option-3").classList.add("active");
        document.getElementById("main-3").style.display = "";
    }
}
