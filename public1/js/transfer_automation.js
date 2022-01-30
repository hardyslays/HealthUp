//Automation list pages 
function load_sending_connection(body){
    let table = document.getElementById("send_table_body");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement('div');
        row.classList.add("row");

        let rec_id = document.createElement("div");
        rec_id.classList.add("col");
        rec_id.innerText = el.rec_id;

        let rec_name = document.createElement("div");
        rec_name.classList.add("col");
        rec_name.innerText = el.inv_name;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.Item_id;

        let min_quan = document.createElement("div");
        min_quan.classList.add("col");
        min_quan.innerText = el.min_quantity;

        let transfer_quan = document.createElement("div");
        transfer_quan.classList.add("col");
        transfer_quan.innerText = el.transfer_quantity;

        row.appendChild(rec_id);
        row.appendChild(rec_name);
        row.appendChild(item_id);
        row.appendChild(min_quan);
        row.appendChild(transfer_quan);

        table.appendChild(row);
    });
}


function load_receiver_connection(body){
    let table = document.getElementById("rec_table_body");
    table.innerHTML = "";
    
    body.forEach( el => {
        let row = document.createElement('div');
        row.classList.add("row");

        let sen_id = document.createElement("div");
        sen_id.classList.add("col");
        sen_id.innerText = el.sen_id;

        let sen_name = document.createElement("div");
        sen_name.classList.add("col");
        sen_name.innerText = el.inv_name;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.Item_id;

        let min_quan = document.createElement("div");
        min_quan.classList.add("col");
        min_quan.innerText = el.min_quantity;

        let transfer_quan = document.createElement("div");
        transfer_quan.classList.add("col");
        transfer_quan.innerText = el.transfer_quantity;

        row.appendChild(sen_id);
        row.appendChild(sen_name);
        row.appendChild(item_id);
        row.appendChild(min_quan);
        row.appendChild(transfer_quan);

        table.appendChild(row);
    });
}

function load_auto_connection_table(){
    fetch("/automation_sender_table", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            console.log(data.body);
            load_sending_connection(data.body);
        }
        else {
            alert("Something went wrong, please try again later.");
            return -1;
        }
    });

    fetch("/automation_receiver_table", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            console.log(data.body);
            load_receiver_connection(data.body);
        }
        else  {
            alert("Something went wrong, please try again later.");
            return -1;
        }
    });
}

function load_automation_list(){
    if(load_auto_connection_table() == -1)return;

    document.getElementById("connection-btn").classList.add("btn-dark");
    document.getElementById("connection-btn").classList.remove("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-dark");
    document.getElementById("send-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-outline-dark");

    document.getElementById("connections").style.display = "";
    document.getElementById("send-connection").style.display = "none";
    document.getElementById("pending-connection").style.display = "none";
    document.getElementById("request-history").style.display = "none";
    document.getElementById("automation-transfer-log").style.display = "none";
    document.getElementById("issues").style.display = "none";
}


//Sending automation connection page
function submit_send_connection(){
    let sen_id = document.getElementById("sender_id10");
    let item_id = document.getElementById("item_id10");
    let min_quan = document.getElementById("min_quan10");
    let trans_quan = document.getElementById("transfer_quan10");

    if(sen_id.value == "")sen_id.classList.add("empty_inp");
    if(item_id.value == "")item_id.classList.add("empty_inp");
    if(min_quan.value == "")min_quan.classList.add("empty_inp");
    if(trans_quan.value == "")trans_quan.classList.add("empty_inp");

    if(sen_id == "" || item_id == "" || min_quan == "" || trans_quan == "")return;

    let body = {
        'sen_id': sen_id.value,
        'item_id': item_id.value,
        'min_quan': min_quan.value,
        'trans_quan': trans_quan.value
    }

    fetch("/send-connection-request", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        "body": JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 100){
            alert("Item receiving automation request sent successfully.");
        }
        else if(data.status == 110)alert("No such Sender or Item found in the database. Please check the sender ID and item ID provided.");
        else if(data.status == 120)alert("You cannot fill your own ID in sender's ID column.");
        else alert("Something went wrong. Please try again later.");
    })
}

function load_send_connection(){
    document.getElementById("connection-btn").classList.remove("btn-dark");
    document.getElementById("connection-btn").classList.add("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.add("btn-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-outline-dark");

    let sen_id = document.getElementById("sender_id10");
    let item_id = document.getElementById("item_id10");
    let min_quan = document.getElementById("min_quan10");
    let transfer_quan = document.getElementById("transfer_quan10");
    sen_id.classList.remove("empty_inp");
    item_id.classList.remove("empty_inp");
    min_quan.classList.remove("empty_inp");
    transfer_quan.classList.remove("empty_inp");

    document.getElementById("connections").style.display = "none";
    document.getElementById("send-connection").style.display = "";
    document.getElementById("pending-connection").style.display = "none";
    document.getElementById("request-history").style.display = "none";
    document.getElementById("automation-transfer-log").style.display = "none";
    document.getElementById("issues").style.display = "none";
}


//See pending request table

function accept_auto_req(rec_id, item_id){
    let body = {
        'rec_id': rec_id,
        'item_id': item_id
    }

    fetch("/accept-automation-request",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then( () => {
        make_pending_requests();
        alert(`ACCEPTED THE CONNECTION REQUEST FROM RECEIVER ID =${rec_id} FOR ITEM ID = ${item_id}. CHECK CONNECTIONS LIST FOR DETAILS.`);
    })
}

function decline_auto_request(rec_id, item_id){
    let body = {
        'rec_id': rec_id,
        'item_id': item_id
    }

    fetch("/decline-automation-request",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then( () => {
        make_pending_requests();
        alert(`DECLINED THE CONNECTION REQUEST FROM RECEIVER ID =${rec_id} FOR ITEM ID = ${item_id}.`);
    })
}

function make_pending_reqeusts_table(body){
    let table = document.getElementById("pending_req_table");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement('div');
        row.classList.add("row");

        let rec_id = document.createElement("div");
        rec_id.classList.add("col");
        rec_id.innerText = el.rec_id;

        let rec_name = document.createElement("div");
        rec_name.classList.add("col");
        rec_name.innerText = el.inv_name;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.Item_id;

        let min_quan = document.createElement("div");
        min_quan.classList.add("col");
        min_quan.innerText = el.min_quantity;

        let transfer_quan = document.createElement("div");
        transfer_quan.classList.add("col");
        transfer_quan.innerText = el.transfer_quantity;

        let acceptBtn = document.createElement("button");
        acceptBtn.classList.add("green", "decideBtn");
        acceptBtn.setAttribute("onclick", `accept_auto_req("${el.rec_id}", "${el.Item_id}")`);
        acceptBtn.innerText = "ACCEPT";
        
        let declineBtn = document.createElement("button");
        declineBtn.classList.add("red", "decideBtn");
        declineBtn.setAttribute("onclick", `decline_auto_request("${el.rec_id}", "${el.Item_id}")`);
        declineBtn.innerText = "DECLINE";

        let btnCol = document.createElement("div");
        btnCol.classList.add("col", "col-4");

        btnCol.appendChild(acceptBtn);
        btnCol.appendChild(declineBtn);

        row.appendChild(rec_id);
        row.appendChild(rec_name);
        row.appendChild(item_id);
        row.appendChild(min_quan);
        row.appendChild(transfer_quan);
        row.appendChild(btnCol);

        table.appendChild(row);
    });
}

function make_pending_requests(){
    fetch("/pending-automation-requests", {
        method: "GET",
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data =>{
        if(data.status == 100){
            make_pending_reqeusts_table(data.body);
        }
        else{
            alert("Something went wrong. Please try again later.");
        }
    })
}

function load_pending_connection(){
    make_pending_requests();

    document.getElementById("connection-btn").classList.remove("btn-dark");
    document.getElementById("connection-btn").classList.add("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-dark");
    document.getElementById("send-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-outline-dark");

    document.getElementById("connections").style.display = "none";
    document.getElementById("send-connection").style.display = "none";
    document.getElementById("pending-connection").style.display = "";
    document.getElementById("request-history").style.display = "none";
    document.getElementById("automation-transfer-log").style.display = "none";
    document.getElementById("issues").style.display = "none";
}

//Request history page
function make_request_history_table(body){
    let table = document.getElementById("req_history_table");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let sen_id = document.createElement("div");
        sen_id.classList.add("col");
        sen_id.innerText = el.sen_id;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.Item_id;

        let min_quantity = document.createElement("div");
        min_quantity.classList.add("col");
        min_quantity.innerText = el.min_quantity;

        let transfer_quantity = document.createElement("div");
        transfer_quantity.classList.add("col");
        transfer_quantity.innerText = el.transfer_quantity;

        let status = document.createElement("div");
        status.classList.add("col");
        switch(el.status){
            case 0: status.innerText = "PENDING";
            break;
            case 1: status.innerText = "ACCEPTED";
            break;
            case -1: status.innerText = "DECLINED";
            break;
        }

        row.appendChild(sen_id);
        row.appendChild(item_id);
        row.appendChild(min_quantity);
        row.appendChild(transfer_quantity);
        row.appendChild(status);

        table.appendChild(row);
    })
}

function make_request_history_page(){
    fetch("/request-history", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 150){
            console.log(data.body);
            make_request_history_table(data.body);
        }
        else{
            alert("Something went wrong. Please try again later.")
        }
    })
}

function load_request_history(){
    make_request_history_page();

    document.getElementById("connection-btn").classList.remove("btn-dark");
    document.getElementById("connection-btn").classList.add("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-dark");
    document.getElementById("send-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.add("btn-dark");
    document.getElementById("req-history-btn").classList.remove("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-outline-dark");

    document.getElementById("connections").style.display = "none";
    document.getElementById("send-connection").style.display = "none";
    document.getElementById("pending-connection").style.display = "none";
    document.getElementById("request-history").style.display = "";
    document.getElementById("automation-transfer-log").style.display = "none";
    document.getElementById("issues").style.display = "none";

}

//automation transfer log page

function make_sender_auto_log(body){
    let table = document.getElementById("sender_auto_transfer");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let rec_id = document.createElement("div");
        rec_id.classList.add("col");
        rec_id.innerText = el.rec_id;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let quantity = document.createElement("div");
        quantity.classList.add("col");
        quantity.innerText = el.quantity;
        
        row.appendChild(rec_id);
        row.appendChild(item_id);
        row.appendChild(quantity);

        table.appendChild(row);
    })
}
function make_receiver_auto_log(body){
    let table = document.getElementById("receiver_auto_transfer");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let sen_id = document.createElement("div");
        sen_id.classList.add("col");
        sen_id.innerText = el.sen_id;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let quantity = document.createElement("div");
        quantity.classList.add("col");
        quantity.innerText = el.quantity;

        row.appendChild(sen_id);
        row.appendChild(item_id);
        row.appendChild(quantity);
        
        table.appendChild(row);
    })
}

function make_automation_transfer_log(){
    fetch("/automation-transfer-log-as-sender", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 1){
            console.log(data.body)
            make_sender_auto_log(data.body);
        }
        else return -1;
    })

    fetch("/automation-transfer-log-as-receiver", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 1){
            make_receiver_auto_log(data.body);
            return 1;
        }
        else return -1;
    })
}

function load_automation_transfer_log(){
    if(make_automation_transfer_log() == -1)alert("Something went wrong. Please try again later.");

    document.getElementById("connection-btn").classList.remove("btn-dark");
    document.getElementById("connection-btn").classList.add("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-dark");
    document.getElementById("send-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-outline-dark");

    document.getElementById("connections").style.display = "none";
    document.getElementById("send-connection").style.display = "none";
    document.getElementById("pending-connection").style.display = "none";
    document.getElementById("request-history").style.display = "none";
    document.getElementById("automation-transfer-log").style.display = "";
    document.getElementById("issues").style.display = "none";
}

//automation issues page
function make_sender_auto_issue(body){
    let table = document.getElementById("sender_auto_issue");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let rec_id = document.createElement("div");
        rec_id.classList.add("col");
        rec_id.innerText = el.rec_id;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let quantity = document.createElement("div");
        quantity.classList.add("col");
        quantity.innerText = el.quantity;

        row.appendChild(rec_id);
        row.appendChild(item_id);
        row.appendChild(quantity);

        table.appendChild(row);
    })
}
function make_receiver_auto_issue(body){
    let table = document.getElementById("receiver_auto_issue");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let sen_id = document.createElement("div");
        sen_id.classList.add("col");
        sen_id.innerText = el.sen_id;

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let quantity = document.createElement("div");
        quantity.classList.add("col");
        quantity.innerText = el.quantity;

        row.appendChild(sen_id);
        row.appendChild(item_id);
        row.appendChild(quantity);
        
        table.appendChild(row);
    })
}
function make_automation_transfer_issue(){
    fetch("/automation-issue-as-sender", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 1){
            make_sender_auto_issue(data.body);
        }
        else return -1;
    })

    fetch("/automation-issue-as-receiver", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 1){
            make_receiver_auto_issue(data.body);
            return 1;
        }
        else return -1;
    })
}
function load_automation_issue(){
    if(make_automation_transfer_issue() == -1)alert("Something went wrong. Please try again later.");

    document.getElementById("connection-btn").classList.remove("btn-dark");
    document.getElementById("connection-btn").classList.add("btn-outline-dark");
    document.getElementById("send-connection-btn").classList.remove("btn-dark");
    document.getElementById("send-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("pending-connection-btn").classList.remove("btn-dark");
    document.getElementById("pending-connection-btn").classList.add("btn-outline-dark");
    document.getElementById("req-history-btn").classList.remove("btn-dark");
    document.getElementById("req-history-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-transfer-log-btn").classList.remove("btn-dark");
    document.getElementById("automation-transfer-log-btn").classList.add("btn-outline-dark");
    document.getElementById("automation-issues-btn").classList.add("btn-dark");
    document.getElementById("automation-issues-btn").classList.remove("btn-outline-dark");

    document.getElementById("connections").style.display = "none";
    document.getElementById("send-connection").style.display = "none";
    document.getElementById("pending-connection").style.display = "none";
    document.getElementById("request-history").style.display = "none";
    document.getElementById("automation-transfer-log").style.display = "none";
    document.getElementById("issues").style.display = "";
}

