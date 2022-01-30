function setActive(id){
    console.log(id);
    document.getElementById("inv-send-request").classList.remove("btn-dark");
    document.getElementById("inv-send-request").classList.add("btn-outline-dark");
    document.getElementById("inv-pending-request").classList.remove("btn-dark");
    document.getElementById("inv-pending-request").classList.add("btn-outline-dark");
    document.getElementById("inv-successful").classList.remove("btn-dark");
    document.getElementById("inv-successful").classList.add("btn-outline-dark");
    document.getElementById("inv-received-request").classList.remove("btn-dark");
    document.getElementById("inv-received-request").classList.add("btn-outline-dark");
    
    document.getElementById(id).classList.remove("btn-outline-dark");
    document.getElementById(id).classList.add("btn-dark");
 
    document.getElementById("send-request").style.display = "none";
    document.getElementById("pending-request").style.display = "none";
    document.getElementById("success").style.display = "none";
    document.getElementById("received-request").style.display = "none";

    switch(id){
        case "inv-send-request": document.getElementById("send-request").style.display = "";
        break;
        
        case "inv-pending-request": document.getElementById("pending-request").style.display = "";
        break;
        
        case "inv-successful": document.getElementById("success").style.display = "";
        break;

        case "inv-received-request": document.getElementById("received-request").style.display = "";
        break;
    }
}

function make_pending_table(body,id){
    let inv_body = document.getElementById(id);
    console.log(id, " ", inv_body);
    inv_body.innerHTML = "";

    body.forEach(el => {
        let row = document.createElement('div');
        row.classList.add("row");
        
        let sen_id = document.createElement('div');
        sen_id.classList.add("col");
        sen_id.innerText = el.rec_id;

        let id_col = document.createElement('div');
        id_col.classList.add("col");
        id_col.innerText = el.item_id;
        
        let name_col = document.createElement('div');
        name_col.classList.add("col");
        name_col.innerText = el.item_name;
            
        let desc_col = document.createElement('div');
        desc_col.classList.add("col");
        desc_col.innerText = el.item_desc;
        
        let quan_col = document.createElement('div');
        quan_col.classList.add("col");
        quan_col.innerText = el.quantity;


        let status = document.createElement('div');
        status.classList.add("col");
        if(el.status == 0)
        status.innerText = "PENDING";
        else if(el.status == 1)
            status.innerText = "ACCEPTED";
        else
            status.innerText = "DECLINE";

        
        row.appendChild(sen_id);
        if(id == "transfer_log_table"){
            let rec_id = document.createElement('div');
            rec_id.classList.add("col");
            rec_id.innerText = el.sen_id;
            
            row.appendChild(rec_id);
        }
        row.appendChild(id_col);
        row.appendChild(name_col);
        row.appendChild(desc_col);
        row.appendChild(quan_col);

        if(id == "transfer_log_table"){
            row.appendChild(status);
        }

        inv_body.appendChild(row);
    });
}


function load_send_request(){
    setActive("inv-send-request");
}


function load_pending_request(){

    fetch("/pending_request", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        if(data.status == 1){
            setActive("inv-pending-request");

            make_pending_table(data.body,"pending_table_1");
        }
        else{
            alert("Something went wrong while fetchin data.\nLogout and login again to fix the issue, Or contact the admin if problem pursue.");   
        }
    });
}


function adding_item_successful(){
    alert("Your request is send!!!!");
}
function adding_item_failed(){
    alert("Something went worng!!!!");
}

function request_transaction(){
    let rece_id = document.getElementById("receive_id");
    let item_ID = document.getElementById("item_ID");
    let item_Quantity = document.getElementById("item_Quantity");
    // console.log(rece_id);

    if(rece_id.value == "")rece_id.classList.add("empty_inp");
    else rece_id.classList.remove("empty_inp");
    if(item_ID.value == "")item_ID.classList.add("empty_inp");
    else item_ID.classList.remove("empty_inp");
    if(item_Quantity.value == "")item_Quantity.classList.add("empty_inp");
    else item_Quantity.classList.remove("empty_inp");

    if(rece_id.value == "" || item_ID.value == "" || item_Quantity.value == "")return;

    body = {
        'rece_id': rece_id.value,
        'item_ID': item_ID.value,
        'item_Quantity': item_Quantity.value
    };

    console.log(body);
    fetch("/add-transferlog", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        console.log(data)
        if(data.status == 1){
            adding_item_successful();
        }
        else adding_item_failed();
    });
}



/// RECEIVED REQUEST ////
function accept_request(tras_id){
    alert("DO YOU WANT PERFORM THIS TRANSACTION");
    let body = {
        'tras_id' : tras_id
    }

    console.log(body)

    fetch("/accept-transfer-request",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        load_pending_request();
        alert(data.body.mes);
    });
}

function decline_request(tras_id){
    let body = {
        'tras_id' : tras_id
    }

    fetch("/decline-transfer-request",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( (data) => {
        console.log("status", data.status)
        alert("TRANSACTION IS DECLINE PERMANENTLY.....");
        load_pending_request();
        alert(data.body.mes);
    })
}

function make_received_request_table(body){
    let table = document.getElementById("received_request_table");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement('div');
        row.classList.add("row");

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let quantity = document.createElement("div");
        quantity.classList.add("col");
        quantity.innerText = el.quantity;

        let sen_id = document.createElement("div");
        sen_id.classList.add("col");
        sen_id.innerText = el.sen_id;

        let acceptBtn = document.createElement("button");
        acceptBtn.classList.add("green", "decideBtn");
        acceptBtn.setAttribute("onclick", `accept_request("${el.transfer_id}")`);
        acceptBtn.innerText = "ACCEPT";
        
        let declineBtn = document.createElement("button");
        declineBtn.classList.add("red", "decideBtn");
        declineBtn.setAttribute("onclick", `decline_request("${el.transfer_id}")`);
        declineBtn.innerText = "DECLINE";

        let btnCol = document.createElement("div");
        btnCol.classList.add("col");

        btnCol.appendChild(acceptBtn);
        btnCol.appendChild(declineBtn);

        row.appendChild(item_id);
        row.appendChild(quantity);
        row.appendChild(sen_id);
        row.appendChild(btnCol);
        table.appendChild(row);
    });
}

function load_received_request(){

    console.log("ON RECEIVED REQUEST PAGE !!!!");
    fetch("/received-request", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        if(data.status == 1){
            setActive("inv-received-request");
            console.log(data.body);
            make_received_request_table(data.body);
        }
        else{
            alert("Something went wrong while fetchin data.\nLogout and login again to fix the issue, Or contact the admin if problem pursue.");   
        }
    });
}


function load_tansfer_log(){

    fetch("/load_transfer_log", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        if(data.status == 1){
            setActive("inv-successful");
            make_pending_table(data.body,"transfer_log_table");
        }
        else{
            alert("Something went wrong while fetchin data.\nLogout and login again to fix the issue, Or contact the admin if problem pursue.");   
        }
    });
}