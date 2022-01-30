var bp_data;
var sugar_data;

document.getElementById("load_stats_btn").onclick = () => {
    showStats(); 
    load_stats_page();
}

function showStats() {
    fetch("/bp_stats", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == -1)alert("Server error...please try again later");

        else{
            bp_data = data.body;
            showBpGraph(data);
        }
    }) 
    
    fetch("/sugar_stats", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == -1)alert("Server error...please try again later");

        else{
            sugar_data = data.body;
            showSugarGraph(data);
        }
    }) 
}

function showBpGraph() {
    console.log(bp_data);

    const dates = bp_data.map( obj => new Date(obj.time_stamp).toISOString().substring(0, 10) ) 
    const bp_high = bp_data.map( obj => obj.bp_high) 
    const bp_low = bp_data.map( obj => obj.bp_low)

    dates.push('2022-01-29')
    dates.push('2022-01-28')
    dates.push('2022-01-27')
    dates.push('2022-01-26')

    bp_high.push(133)
    bp_high.push(123)
    bp_high.push(128)
    bp_high.push(143)

    bp_low.push(80)
    bp_low.push(91)
    bp_low.push(78)
    bp_low.push(93)

    console.log(dates, bp_high, bp_low);

    

    document.getElementById("bp_stats_container").innerHTML = "";
    
    let canvas = document.createElement('canvas');
    canvas.id = "myChart";
    document.getElementById("bp_stats_container").appendChild(canvas);
    

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'BP HIGH',
                    data: bp_high,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                },
                {
                    label: 'BP LOW',
                    data: bp_low,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                }
            ]
        }
    })
    
}

function showSugarGraph() {
    console.log(sugar_data);

    const dates = sugar_data.map( obj => new Date(obj.time_stamp).toISOString().substring(0, 10) ) 
    const sugar = sugar_data.map( obj => obj.sugar)

    dates.push('2022-01-29')
    dates.push('2022-01-28')
    dates.push('2022-01-27')
    dates.push('2022-01-26')

    sugar.push(133)
    sugar.push(123)
    sugar.push(128)
    sugar.push(143)


    console.log(dates, sugar);

    

    document.getElementById("sugar_stats_container").innerHTML = "";
    
    let canvas = document.createElement('canvas');
    canvas.id = "myChart2";
    document.getElementById("sugar_stats_container").appendChild(canvas);
    

    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'sugar level',
                    data: sugar,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                }
            ]
        }
    })
    
}
