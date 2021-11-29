objects = [];
sound = "";
status = "";

function preload(){
     sound = loadSound("ringtone.mp3");
}

function setup(){
     canvas = createCanvas(500, 400);
     canvas.position(500, 250);

     video = createCapture(VIDEO);
     video.size(500, 400);
     video.hide();

     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
     console.log('model loaded!');
     status = true;
}

function gotResult(error, results){
     if(error){
          console.error(error);
     }

     else{
          console.log(results);
          objects = results;
     }
}



function draw(){
    image(video, 0,0, 500, 400);
    objectDetector.detect(video, gotResult);
    
    for(i = 0; i < objects.length; i++){
         fill('#ff0000')
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
         nofill();
         rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
    }

    if(objects.label == 'person'){
     document.getElementById("status").innerHTML = "Status : Object Detected";
     document.getElementById("found").innerHTML = "Baby found";
     sound.stop();
}

else{
     document.getElementById("status").innerHTML = "Status : Object Detected";
     document.getElementById("found").innerHTML = "Baby not found";
     sound.play();
}

if(objects.length > 0){
     document.getElementById("status").innerHTML = "Status : Object Detected";
     document.getElementById("found").innerHTML = "Baby not found";
     sound.play();
}
}