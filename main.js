status="";

    function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

    function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
    } 
    
    function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    object_name=document.getElementById("object_name").value;
    }

    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        console.log(results);
        objects=results;
        }

    function draw(){
    image(video,0,0,480,300);

    if(status!= ""){
    objectDetector.detect(video,gotResult);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML= "status: objects Deteted";
        document.getElementById("number_of_objects").innerHTML= "Number of objects Deteted are: "+ objects.length;

        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(Objects[i].label+""+ percent+ "%", objects[i].x +15,objects[i].y+15);
        nofill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
        
        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detected(gotResult);
            document.getElementById("object_status").innerHTML= object_name+ "found";
            synth= window.speechSynthesis;
            utterThis= new SpeechSynthesisUtterance(object_name + "found");
            synth.speak(utterThis);

        }

        else{
            document.getElementById("object_status").innerHTML= object_name+ "not Found";
            
        }

    }
    }
}