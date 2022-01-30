function add_sugar_level(){
    let sugar_level = document.getElementById("s_level");
    
    body = {sugar_level : sugar_level.value};

    fetch("/sugar_update", {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            document.getElementById("mess").innerHTML = "ADD SUCCESSFULLY";
        }else{
            document.getElementById("mess").innerHTML = "ERROR";
        }
    })
}


function add_bp_level(){
    let bp_l = document.getElementById("bp_low");
    let bp_h = document.getElementById("bp_high");
    body = {bp_low : bp_l.value,
            bp_high : bp_h.value};

    fetch("/bp_update", {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            document.getElementById("mess").innerHTML = "ADD SUCCESSFULLY";
        }else{
            document.getElementById("mess").innerHTML = "ERROR";
        }
    })
}



function display_sugar(){
    document.getElementById("sugar").style.display= "";
    document.getElementById("bp").style.display= "none";
}

function display_bp(){
    document.getElementById("sugar").style.display= "none";
    document.getElementById("bp").style.display= "";
}