document.getElementById("load_medicine_page").onclick = () => {
    get_sugar_med();
    load_medicine_page();
}

function get_sugar_med(){
    document.getElementById("sugar_container").style.display = "";
    document.getElementById("bp_container").style.display = "none";
    document.getElementById("ch_sugar_med").style.display = "none";
    document.getElementById("ch_bp_med").style.display = "none";
    fetch("/sugar_med", {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    'body': JSON.stringify()
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            console.log(data.body.sugar_med);
            document.getElementById("curr_med").innerHTML=`CURRENT MEDICINE : ${data.body.sugar_med}`;
        }else{
            document.getElementById("mess_med").innerHTML="No record found";
        }
    });
}

function change_sugar_med(){
    document.getElementById("new_sugar_med").value="";
    document.getElementById("ch_sugar_med").style.display="";
}

function update_sugar_med(){
    let med = document.getElementById("new_sugar_med").value;
    if(med == ""){
        document.getElementById("sg_mess_med").innerHTML="**MEDICINE CANNOT BE EMPTY";
        return;
    }
    let body = {sugar_med : med};
    console.log(body);
    fetch("/sugar_med", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
        })
        .then(response => response.json())
        .then( data => {
            if(data.status == 1){
                document.getElementById("sg_mess_med").innerHTML="**MEDICINE UPDATED SUCCESSFULLY...";
                document.getElementById("ch_sugar_med").style.display="none";
                get_sugar_med();
            }else{
                document.getElementById("sg_mess_med").innerHTML="**UPDATE FAIL....";
            }
    });
}


function get_bp_med(){
    document.getElementById("bp_container").style.display = "";
    document.getElementById("sugar_container").style.display = "none";
    document.getElementById("ch_sugar_med").style.display = "none";
    document.getElementById("ch_bp_med").style.display = "none";
    fetch("/bp_med", {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    'body': JSON.stringify()
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            console.log(data.body.bp_med);
            document.getElementById("curr_med_bp").innerHTML=`CURRENT MEDICINE : ${data.body.bp_med}`;
        }else{
            document.getElementById("bp_mess_med").innerHTML="No record found";
        }
    });
}

function change_bp_med(){
    document.getElementById("new_bp_med").value="";
    document.getElementById("ch_bp_med").style.display="";
}

function update_bp_med(){
    let med = document.getElementById("new_bp_med").value;
    if(med == ""){
        document.getElementById("bp_mess_med").innerHTML="**MEDICINE CANNOT BE EMPTY";
        return;
    }
    let body = {bp_med : med};
    console.log(body);
    fetch("/bp_med", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
        })
        .then(response => response.json())
        .then( data => {
            if(data.status == 1){
                document.getElementById("bp_mess_med").innerHTML="**MEDICINE UPDATED SUCCESSFULLY...";
                document.getElementById("ch_bp_med").style.display="none";
                get_bp_med();
            }else{
                document.getElementById("bp_mess_med").innerHTML="**UPDATE FAIL....";
            }
    });
}