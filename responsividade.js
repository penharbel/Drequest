
var mapa = document.getElementById("mapa");
var val = document.getElementById("T_zoom");

$("#T_zoom").change(()=>{
    mapa.style.height = val.value + "px";
    mapa.style.width = (val.value *= 1.5) + "px";
});

    

