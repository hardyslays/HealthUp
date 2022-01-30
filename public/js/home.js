const load_add_data = () => {
    console.log("load add data");
    document.getElementById("add_data_page").style.display = "";
    document.getElementById("stats_page").style.display = "none";
    document.getElementById("medicine_page").style.display = "none";
}
const load_stats_page = () => {
    console.log("load stats");
    document.getElementById("add_data_page").style.display = "none";
    document.getElementById("stats_page").style.display = "";
    document.getElementById("medicine_page").style.display = "none";
}
const load_medicine_page = () => {
    console.log("load settings");
    document.getElementById("add_data_page").style.display = "none";
    document.getElementById("stats_page").style.display = "none";
    document.getElementById("medicine_page").style.display = "";
}