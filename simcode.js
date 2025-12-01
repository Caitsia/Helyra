//solar system low fedelity prototype
alert("conected orbit attempt")
var solarsystem = document.getElementById("canvas");
var context = solarsystem.getContext("2d");
var au = 100
var pyronisCard = document.getElementById("pyronis-card");
var asteronCard = document.getElementById("asteron-card");
var gaiaCard = document.getElementById("gaia-card");
var thalassaCard = document.getElementById("thalassa-card");
var auroraCard = document.getElementById("aurora-card");
var cyrionCard = document.getElementById("cyrion-card");
class Planet{
    constructor(radius, maxDistance, minDistance, speed, sun, color, card){
        this.radius = radius; //determians the size of the planet
        this.r1 = maxDistance + sun.radius; //determans the distance from the sun
        this.r2 = minDistance + sun.radius; //determans the distance from the sun
        this.speed  = speed; // speed in which the planet orbitsthe sun
        this.color = color; // color of the prototype planet
        this.card = card; // card element associated with the planet
        this.angle = 0; //angle relitive to the origin (the sun) used for calculating the planet's potition
        this.x = solarsystem.width /2 + this.orbitRadius //creates the starting x position
        this.y = solarsystem.height / 2 + this.orbitRadius //creates the starting y position
    }
    update(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.angle += this.speed; //changes the angle of the planet's postion according to it's velocity. making it appear 
        this.x = solarsystem.width /2 + this.r1 * Math.cos(this.angle);// convering angle into change in distance
        this.y = solarsystem.height / 2 + this.r2 * Math.sin(this.angle);
    }
    drawPath(){
        context.beginPath();
        context.strokeStyle = "white";
        context.ellipse(sun.x, sun.y, this.r1, this.r2, 0, 0, 2 * Math.PI, true);
        context.stroke()
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();

}    
}
let sun = {
    x: solarsystem.width/2,
    y: solarsystem.height/2,
    radius: 40,
    color: "yellow"
};
function drawSun(){// draws sun seperately since it does not require a change in position or orbit radius 
    context.beginPath();
    context.fillStyle = sun.color;
    context.arc(sun.x, sun.y, sun.radius, 0, 2*Math.PI, true);
    context.fill();
    context.stroke();

}
var pause = false
let found = false;
let zoom = 1;
let isdragged = false;
let lastX, lastY;
let offsetX = 0;
let offsetY = 0;
solarsystem.addEventListener("click", function(e){
    const rect = solarsystem.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    //checks if mouse in inside the planet

    const ex = mouseX - gaia.x;
    const ey = mouseY - gaia.y;
    const edistance = Math.sqrt(ex*ex + ey * ey);
    if(edistance < gaia.radius){
        console.log("clicked Gaia");
        window.location.href = "gaia.html"
    }
    const mcx = mouseX - pyronis.x;
    const mcy = mouseY - pyronis.y;
    const mcdistance = Math.sqrt(mcx*mcx + mcy*mcy);
    if(mcdistance < pyronis.radius){
        console.log("clicked Pyronis");
        window.location.href = "pyronis.html"

    }
    const vx = mouseX - asteron.x;
    const vy = mouseY - asteron.y;
    const vdistance = Math.sqrt(vx*vx + vy * vy);
    if(vdistance < asteron.radius){
        console.log("clicked Asteron");
        window.location.href = "asteron.html"

    }

    const jx = mouseX - thalassa.x;
    const jy = mouseY - thalassa.y;
    const jdistance = Math.sqrt(jx*jx + jy * jy);
    if(jdistance < thalassa.radius){
        console.log("clicked Thalassa");
        window.location.href = "thalassa.html"
    }
    const sx = mouseX - aurora.x;
    const sy = mouseY - aurora.y;
    const sdistance = Math.sqrt(sx*sx + sy * sy);
    if(sdistance < aurora.radius){
        console.log("clicked Aurora");
        window.location.href = "aurora.html"
    }
    const ux = mouseX - cyrion.x;
    const uy = mouseY - cyrion.y;
    const udistance = Math.sqrt(ux*ux + uy * uy);
    if(udistance < cyrion.radius){
        console.log("clicked Cyrion");
        window.location.href = "cyrion.html"

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

    //checks if mouse in inside the planet
    const dx = mouseX - gaia.x;
    const dy = mouseY - gaia.y;
    const distance = Math.sqrt(dx*dx + dy * dy);
    if(distance < gaia.radius){
        gaia.card.style.display = "block";
        gaia.card.style.left = (pageX  + gaia.card.offsetWidth /2)+ "px";
        gaia.card.style.top = (pageY + gaia.card.offsetHeight -10)+ "px";
    }
    const mcx = mouseX - pyronis.x;
    const mcy = mouseY - pyronis.y;
    const mcdistance = Math.sqrt(mcx*mcx + mcy*mcy);
    if(mcdistance < pyronis.radius){
        pyronis.card.style.display = "block";
        pyronis.card.style.left = (pageX  + pyronis.card.offsetWidth /2)+ "px";
        pyronis.card.style.top = (pageY + pyronis.card.offsetHeight -10)+ "px";
    }
    const vx = mouseX - asteron.x;
    const vy = mouseY - asteron.y;
    const vdistance = Math.sqrt(vx*vx + vy * vy);
    if(vdistance < asteron.radius){
        card.style.display = "block";
        card.style.left = (pageX  + card.offsetWidth /2)+ "px";
        card.style.top = (pageY + card.offsetHeight -10)+ "px"; 
    }
    const jx = mouseX - thalassa.x;
    const jy = mouseY - thalassa.y;
    const jdistance = Math.sqrt(jx*jx + jy * jy);
    if(jdistance < thalassa.radius){
        card.style.display = "block";
        card.style.left = (pageX  + card.offsetWidth /2)+ "px";
        card.style.top = (pageY + card.offsetHeight -10)+ "px";
    }
    const sx = mouseX - aurora.x;
    const sy = mouseY - aurora.y;
    const sdistance = Math.sqrt(sx*sx + sy * sy);
    if(sdistance < aurora.radius){
       card.style.display = "block";
        card.style.left = (pageX  + card.offsetWidth /2)+ "px";
        card.style.top = (pageY + card.offsetHeight -10)+ "px";
    }
    const ux = mouseX - cyrion.x;
    const uy = mouseY - cyrion.y;
    const udistance = Math.sqrt(ux*ux + uy * uy);
    if(udistance < cyrion.radius){
        card.style.display = "block";
        card.style.left = (pageX  + card.offsetWidth /2)+ "px";
        card.style.top = (pageY + card.offsetHeight -10)+ "px";
    }


    
});

//adds individual attributes to each planet
var pyronis =  new Planet(8, 75, 50, 0.05, sun, "tomato", "pyronis.html", pyronisCard);
var asteron =    new Planet(11, 120, 100, 0.02, sun,  "beige", "asteron.html", asteronCard);
var gaia =    new Planet(12, 200, 175, 0.02, sun,"teal", "gaia.html", gaiaCard);
var thalassa =  new Planet(25, 350, 400, 0.01, sun, "aqua", "thalassa.html", thalassaCard);
var aurora  =  new Planet(20, 450, 500, 0.012, sun, "peachpuff", "aurora.html", auroraCard);
var cyrion  =  new Planet(15, 500, 550, 0.005, sun, "blue", "cyrion.html", cyrionCard);
var planets = [pyronis, gaia, asteron, thalassa, aurora, cyrion]; //array to hold all planets for easy access in loops
//checks that all attributes are callable 
console.log("the gaia's size is " + gaia.radius + " position is " + gaia.x + ", " + gaia.y + ". and it's color is " + gaia.color);

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
        planets[i].drawPath(context);
        planets[i].draw(context);//draws each planet in the array 
    }

    requestAnimationFrame(orbit)//nested function to keep the orbit ongoing

};
orbit();
