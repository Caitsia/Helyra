//solar system high fedelity prototype
//alert("conected orbit sim (with images)")
var solarsystem = document.getElementById("canvas");
var context = solarsystem.getContext("2d");
const imgMercury = document.getElementById("mercury");
const imgVenus = document.getElementById("venus");
const imgEarth = document.getElementById("earth");
const imgMars = document.getElementById("mars");
const imgJupiter = document.getElementById("jupiter");
const imgSaturn = document.getElementById("saturn");
const imgUranus = document.getElementById("uranus");
const imgNeptune = document.getElementById("neptune");
const imgSun = document.getElementById("sun");
var mercuryCard = document.getElementById("mercuryCard");
var venusCard = document.getElementById("venusCard");
var earthCard = document.getElementById("earthCard");
var marsCard = document.getElementById("marsCard");
var jupiterCard = document.getElementById("jupiterCard");
var saturnCard = document.getElementById("saturnCard");
var neptuneCard = document.getElementById("neptuneCard");
var uranusCard = document.getElementById("uranusCard");

var au = 100
class Planet{
    constructor(radius, maxDistance, minDistance, speed, star, image, link, card){
        this.star = star
        this.radius = radius; //determians the size of the planet
        this.r1 = maxDistance + this.star.radius; //determans the distance from the sun
        this.r2 = minDistance + this.star.radius; //determans the distance from the sun
        this.speed  = speed; // speed in which the planet orbitsthe sun
        this.image = image; // color of the prototype planet
        this.angle = 0; //angle relitive to the origin (the sun) used for calculating the planet's potition
        this.link = link
        this.card = card
    }

    update(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.angle += this.speed; //changes the angle of the planet's postion according to it's velocity. making it appear 
        this.x = this.star.x + this.r1 * Math.cos(this.angle);// convering angle into change in distance
        this.y = this.star.y + this.r2 * Math.sin(this.angle);
    }
    drawPath(){
        context.beginPath();
        context.strokeStyle = "white";
        context.ellipse(this.star.x, this.star.y, this.r1, this.r2, 0, 0, 2 * Math.PI, true);
        context.stroke();
    }
    draw(){
        context.drawImage(this.image, this.x, this.y, this.radius, this.radius);

    }    
    
    redirect(){
        window.location.href = this.link;

    }
}
let sun = {
    x: solarsystem.width/2,
    y: solarsystem.height/2,
    radius: 30,
    color: "yellow"
};
function drawSun(){// draws sun seperately since it does not require a change in position or orbit radius 
    context.beginPath();
    context.fillStyle = sun.color;
    context.arc(sun.x, sun.y, sun.radius, 0, 2*Math.PI, true);
    context.fill();
    context.stroke();

}
var pause = false;
let found = false;
let zoom = 1;
let isdragged = false;
let lastX, lastY;
let offsetX = 0;
let offsetY = 0;

solarsystem.addEventListener("click", function(e){
    const rect = solarsystem.getBoundingClientRect(); // bounds the clicking mecanism within the canvas
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    for(i in planets){
        planet = planets[i];
        var px = mouseX - planet.x * zoom + offsetX;
        var py = mouseY - planet.y * zoom + offsetY;
        const pdistance = Math.sqrt(px * px + py * py)
        if(pdistance < planets[i].radius){
            planets[i].redirect()
        }
    }
    if(pause){
        console.log("simulation clicked!");//checks to see if the click event listiner was working
        pause = false //would resume the simulation if already paused
        console.log(pause);//checks the booleen value of pause
    }
    else{
        pause = true;//pauses the simulation by changing the booleen value
        console.log(pause);//checks the booleen value of pause

    }
});
solarsystem.addEventListener("wheel", function(e){//checking to see when the user scrolls through the canvas
    e.preventDefault(); //prevents default scroll when over the canvas
    zoomAmount = 0.1;
    const rect = solarsystem.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    var prevZoom = zoom;
    if (e.deltaY <  0){
        zoom += zoomAmount; //zoom in 
    }
    else{
        zoom -= zoomAmount; //zoom out
    }
    console.log(zoom)
    zoom = Math.max(0.2, Math.min(zoom, 5));
     // Adjust offsets so the sun stays centered
    const scaleFactor = zoom / prevZoom;
    const canvasCenterX = solarsystem.width / 2;
    const canvasCenterY = solarsystem.height / 2;

    offsetX = canvasCenterX - scaleFactor * (canvasCenterX - offsetX);
    offsetY = canvasCenterY - scaleFactor * (canvasCenterY - offsetY);
});

solarsystem.addEventListener("mousedown", function(e){
    isdragged = true;
    lastX= e.clientX;
    lastY = e.clientY;  
});

solarsystem.addEventListener("mousemove", function(e){
    const rect = solarsystem.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let hover = false;

    for (i in planets){
        const planet = planets[i];
        var card = planet.card 
        var screenX = planet.x * zoom + offsetX;
        var screenY = planet.y * zoom + offsetY;
        pageX = rect.left + screenX ;
        pageY = rect.top + screenY + 500; 

        var dx = mouseX - screenX;
        var dy = mouseY - screenY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < planets[i].radius *zoom){
            card.style.display = "block";
            card.style.left = (pageX  + card.offsetWidth /2)+ "px";
            card.style.top = (pageY + card.offsetHeight -10)+ "px";
            hover = true;
            console.log("position x " + pageX + " position y " + pageY)
            console.log("position x " + card.style.left + " position y " + card.style.top)
        }
        if(!hover){
            planets[i].card.style.display = "none";
        }
        
    }
    if(isdragged){
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        offsetX += dx;
        offsetY += dy;
        lastX = e.clientX;
        lastY = e.clientY;
    }  
    
});
solarsystem.addEventListener("mouseup", function(e){
    isdragged = false;
})

//adds individual attributes to each planet
var pyronis =  new Planet(8, 45, 25, 0.05, sun, "tomato", "pyronis.html");
var asteron =    new Planet(11, 67, 50, 0.02, sun,  "beige", "asteron.html");
var gaia =    new Planet(12, 100, 75, 0.02, sun,"teal", "gaia.html");
var thalassa =  new Planet(25, 250, 200, 0.01, sun, "aqua", "thalassa.html");
var aurora  =  new Planet(20, 300, 250, 0.012, sun, "peachpuff", "aurora.html");
var cyrion  =  new Planet(15, 350, 300, 0.005, sun, "blue", "cyrion.html");
var planets = [pyronis, gaia, asteron, thalassa, aurora, cyrion]; //array to hold all planets for easy access in loops
//checks that all attributes are callable 

function orbit(){ 
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, solarsystem.width, solarsystem.height);
    context.setTransform(zoom, 0, 0, zoom, offsetX, offsetY,)
    if(!pause){//continues the simulation unless paused
        for(i in planets){ //loops through each planet in an array to avoid redundant code
            planets[i].update();//updates the position of the planets
        }
    }
    drawSun(); //draws sun after update so that it's not cleared fromm the canvas in update
    for(i in planets){
        //planets[i].drawPath(context);
        planets[i].draw(context);//draws each planet in the array 
    }
    requestAnimationFrame(orbit)//nested function to keep the orbit ongoing

};
orbit();
