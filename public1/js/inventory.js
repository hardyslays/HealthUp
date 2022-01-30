function SetActiveInventoryPage(id){
    console.log("start set.");
    document.getElementById("inv-list-btn").classList.remove("btn-dark");
    document.getElementById("inv-list-btn").classList.add("btn-outline-dark");
    document.getElementById("items-list-btn").classList.remove("btn-dark");
    document.getElementById("items-list-btn").classList.add("btn-outline-dark");
    document.getElementById("inv-add-btn").classList.remove("btn-dark");
    document.getElementById("inv-add-btn").classList.add("btn-outline-dark");
    document.getElementById("inv-rem-btn").classList.remove("btn-dark");
    document.getElementById("inv-rem-btn").classList.add("btn-outline-dark");
    document.getElementById("set-min-btn").classList.remove("btn-dark");
    document.getElementById("set-min-btn").classList.add("btn-outline-dark");
    
    document.getElementById(id).classList.remove("btn-outline-dark");
    document.getElementById(id).classList.add("btn-dark");
 
    document.getElementById("inv-items").style.display = "none";
    document.getElementById("items-list").style.display = "none";
    document.getElementById("add-inv").style.display = "none";
    document.getElementById("rem-inv").style.display = "none";
    document.getElementById("set-min-quan").style.display = "none";

    switch(id){
        case "inv-list-btn": document.getElementById("inv-items").style.display = "";
        break;

        case "items-list-btn": document.getElementById("items-list").style.display = "";
        break;

        case "inv-add-btn": document.getElementById("add-inv").style.display = "";
        break;
        
        case "inv-rem-btn": document.getElementById("rem-inv").style.display = "";
        break;

        case "set-min-btn": document.getElementById("set-min-quan").style.display = "";
        break;
    }

    console.log("SET PAGE FOR: ", id);
}

function make_inv_table(body){
    let inv_body = document.getElementById('inv-body');

    inv_body.innerHTML = "";

    body.forEach(el => {
        let row = document.createElement('div');
        row.classList.add("row");
        
        let id_col = document.createElement('div');
        id_col.classList.add("col", "col-1");
        id_col.innerText = el.item_id;
        
        let name_col = document.createElement('div');
        name_col.classList.add("col", "col-2");
        name_col.innerText = el.item_name;
        
        let desc_col = document.createElement('div');
        desc_col.classList.add("col", "col-5");
        desc_col.innerText = el.item_desc;
        
        let quan_col = document.createElement('div');
        quan_col.classList.add("col");
        quan_col.innerText = el.quantity;
        
        let min_quan_col = document.createElement('div');
        min_quan_col.classList.add("col");
        min_quan_col.innerText = (el.min_quantity == null? "N/A" : el.min_quantity);

        row.appendChild(id_col);
        row.appendChild(name_col);
        row.appendChild(desc_col);
        row.appendChild(quan_col);
        row.appendChild(min_quan_col);
        inv_body.appendChild(row);
    });
}

function load_inventory_list(){
    fetch("/inv-list", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        if(data.status == 1){
            SetActiveInventoryPage("inv-list-btn");

            make_inv_table(data.body);
        }
        else{
            alert("Something went wrong while fetchin Inventory details.\nLogout and login again to fix the issue, Or contact the admin if problem pursue.");   
        }
    });
}

function make_item_list_table(body){
    let table = document.getElementById("items-list-body");
    table.innerHTML = "";

    body.forEach( el => {
        let row = document.createElement("div");
        row.classList.add("row");

        let item_id = document.createElement("div");
        item_id.classList.add("col");
        item_id.innerText = el.item_id;

        let item_name = document.createElement("div");
        item_name.classList.add("col");
        item_name.innerText = el.item_name;

        let item_desc = document.createElement("div");
        item_desc.classList.add("col");
        item_desc.innerText = el.item_desc;

        row.appendChild(item_id);
        row.appendChild(item_name);
        row.appendChild(item_desc);

        table.appendChild(row);
    })
}

function make_item_list(){
    fetch("/item-list", {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 1){
            make_item_list_table(data.body);
        }
        else alert("Something went wrong. Please try again later.");
    })
}

function load_items_list(){
    make_item_list();

    SetActiveInventoryPage("items-list-btn");
}


function load_add_item(){
    document.getElementById("item_id").value = "";
        document.getElementById("item_name").value = "";
    document.getElementById("item_desc").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("item_id2").value = "";
    document.getElementById("quantity2").value = "";
    
    item_id.classList.remove("empty_inp");
    item_name.classList.remove("empty_inp");
    item_desc.classList.remove("empty_inp");
    quantity.classList.remove("empty_inp");
    item_id2.classList.remove("empty_inp");
    quantity2.classList.remove("empty_inp");
    
    SetActiveInventoryPage("inv-add-btn");    
}

function adding_item_successful(){
    load_add_item();

    document.getElementById("add-item-response").innerText = "Item added succesfully.";
    document.getElementById("add-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("add-item-response").style.display = "none";
    }, 5000);
}

function adding_quantity_successful(){
    load_add_item();

    document.getElementById("add-item-response").innerText = "Quantity increased succesfully.";
    document.getElementById("add-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("add-item-response").style.display = "none";
    }, 5000);
}

function adding_item_failed(){
    load_add_item();

    document.getElementById("add-item-response").innerText = "Adding item failed. Please try again.";
    document.getElementById("add-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("add-item-response").style.display = "none";
    }, 5000);
}

function adding_quantity_item_not_found(){
    load_add_item();

    document.getElementById("add-item-response").innerText = "No item found for given ITEM ID.";
    document.getElementById("add-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("add-item-response").style.display = "none";
    }, 5000);
}

function adding_quantity_failed(){
    load_add_item();

    document.getElementById("add-item-response").innerText = "Failed in increasing Item's quantity. Please try again.";
    document.getElementById("add-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("add-item-response").style.display = "none";
    }, 5000);
}

function submit_add_item_form(){
    let item_id = document.getElementById("item_id");
    let item_name = document.getElementById("item_name");
    let item_desc = document.getElementById("item_desc");
    let quantity = document.getElementById("quantity");

    if(item_id.value == "")item_id.classList.add("empty_inp");
    else item_id.classList.remove("empty_inp");
    if(item_name.value == "")item_name.classList.add("empty_inp");
    else item_name.classList.remove("empty_inp");
    if(item_desc.value == "")item_desc.classList.add("empty_inp");
    else item_desc.classList.remove("empty_inp");
    if(quantity.value == "")quantity.classList.add("empty_inp");
    else quantity.classList.remove("empty_inp");

    if(item_id.value == "" || item_name.value == "" || item_desc.value == "" || quantity.value == "")return;

    body = {
        'item_id': item_id.value,
        'item_name': item_name.value,
        'item_desc': item_desc.value,
        'quantity': quantity.value
    };

    // console.log(body);
    fetch("/add-item", {
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

function submit_add_quantity(){
    let item_id = document.getElementById("item_id2");
    let quantity = document.getElementById("quantity2");

    if(item_id.value == "")item_id.classList.add("empty_inp");
    else item_id.classList.remove("empty_inp");

    if(quantity.value == "")quantity.classList.add("empty_inp");
    else quantity.classList.remove("empty_inp");

    if(item_id.value == "" || quantity.value == "")return;

    let body = {
        'item_id': item_id.value,
        'quantity': quantity.value
    }

    fetch("/add-quantity", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 10)adding_quantity_successful();
        else if(data.status == 11)adding_quantity_item_not_found();
        else adding_quantity_failed();
    });
}

//Remove items js
function load_rem_item(){
    document.getElementById("item_id3").value = "";
    document.getElementById("quantity3").value = "";
    document.getElementById("item_id4").value = "";
    
    document.getElementById("item_id3").classList.remove("empty_inp");
    document.getElementById("quantity3").classList.remove("empty_inp");
    document.getElementById("item_id4").classList.remove("empty_inp");

    document.getElementById("get-item-details").style.display = "none";

    SetActiveInventoryPage("inv-rem-btn");
}

function item_withdrawl_successful(){
    load_rem_item();

    document.getElementById("rem-item-response").innerText = "The given amount withdrawn successfully.";
    document.getElementById("rem-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("rem-item-response").style.display = "none";
    }, 5000);
}

function withdrawl_item_failed(msg){
    load_rem_item();

    document.getElementById("rem-item-response").innerText = msg;
    document.getElementById("rem-item-response").style.display = "";
    setTimeout(() => {
        document.getElementById("rem-item-response").style.display = "none";
    }, 8000);
}

function submit_rem_quantity(){
    
    let item_id = document.getElementById("item_id3");
    let quantity = document.getElementById("quantity3");

    if(item_id.value == "")item_id.classList.add("empty_inp");
    else item_id.classList.remove("empty_inp");

    if(quantity.value == "")quantity.classList.add("empty_inp");
    else quantity.classList.remove("empty_inp");

    if(item_id.value == "" || quantity.value == "")return;

    let body = {
        'item_id': item_id.value,
        'quantity': quantity.value
    };

    fetch("/rem-quantity", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        console.log(data)
        if(data.status == 20)
        {
            item_withdrawl_successful();
        }
        else if(data.status == 21){
            withdrawl_item_failed("No item found for given ITEM ID.");
        }
        else if(data.status == 22){
            withdrawl_item_failed("Not enough items to withdraw given amount. Please check item's quantity.");
        }
        else{
            withdrawl_item_failed("Item withdrawl failed. Please try again later.");
        }
    })
}

function extract_rem_item_detail(){
    let item_id = document.getElementById("item_id4");
    
    if(item_id.value == ""){
        item_id.classList.add("empty_inp");
        return;
    }
    else item_id.classList.remove("empty_inp");

    let body = {
        'item_id': item_id.value
    };

    fetch( '/rem-item-details',  {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 20){
            document.getElementById("item_id5").value = data.body.item_id;
            document.getElementById("item_name5").value = data.body.item_name;
            document.getElementById("item_desc5").value = data.body.item_desc;
            document.getElementById("quantity5").value = data.body.quantity;

            document.getElementById("get-item-details").style.display = "";
        }
        else if(data.status == 21){
            window.alert("No item with given Item_id found.");
        }
        else{
            window.alert("Something went wrong. Try again later.");
        }
    })
}

document.getElementById("item_id4").oninput = () => {
    document.getElementById("get-item-details").style.display = "none";
}

function rem_item(){
    let item_id = document.getElementById("item_id5");
    let body = {
        'item_id': item_id.value
    };

    fetch("/rem-item",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 40){
            document.getElementById("item_id4").value = "";
            document.getElementById("get-item-details").style.display = "none";

            alert("Item removed from Inventory successfully.");
        }
        else{
            alert("Something went wrong. Try again later.");
        }
    })
}

//Setting minimum quantity for alerts
function load_set_min_quantity(){
    document.getElementById("item_id6").value = "";
    document.getElementById("quantity6").value = "";

    document.getElementById("item_id6").classList.remove("empty_inp");
    document.getElementById("quantity6").classList.remove("empty_inp");

    SetActiveInventoryPage("set-min-btn");
}

function min_quan(){
    let item_id = document.getElementById("item_id6");
    let min_quan = document.getElementById("quantity6");

    if(item_id.value == ""){
        item_id.classList.add("empty_inp");
    }
    if( min_quan.value == ""){
        min_quan.classList.add("empty_inp");
    }

    if(item_id.value == "" || min_quan.value == "")return;

    let body = {
        'item_id': item_id.value,
        'quantity': min_quan.value
    };

    fetch("/set-min-quan", {    
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then(response => response.json())
    .then( data => {
        if(data.status == 51){
            alert(`Minimum quantity alert has been removed for Item with item ID = ${item_id.value}.`);
        }
        else if(data.status == 52){
            alert(`Successfully set Minimum quantity alert for Item with item ID = ${item_id.value}.`);
        }
        else{
            alert("Something went wrong. Try again later.");
        }
    })
}






window.onload = () => {
    load_inventory_list();
}