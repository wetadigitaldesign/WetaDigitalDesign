$(document).ready(function(){
    // console.log("loaded");
    // $("#masterContainer ")
    $("#masterContainer").append(
        `
            <div class="informationContent">
                <div class="discription">
                    <h1 data-swiftype-name="title" data-swiftype-type="string">Weta digital design</h1>
                    <br />
                    <br />
                    <br />
                    <p>The Weta is a native insect species to New Zealand. The aim of the Weta web design page is to test your drawing skills on the canvas and see how fast you can digitally draw a Weta.
                    <br />
                    <br />
                    Instructions:
                    <br />
                    Click start time and then click and drag the mouse on the canvas to draw. When you finish your drawing click stop time.
                    <br />
                    <br />
                    See if you can draw this Weta. 
                    </p>
                </div>
                <div class="wetaPictureContainer">
                <img src="./img/wetaOne.svg" alt="picture of a Weta"/>
                </div>
            </div>

            <div class="interactiveContent">
                <div class="interactiveHeader">
                    <div class="brushContainer">
                        <div class="brushInfo">
                            <h2>Click on the circles to change the brush colour.</h2>
                        </div>
                        <div class="brushes">
                        <button class="brush" type="button" value="#FCC4C9"></button>
                        <button class="brush" type="button" value="#F8E2CF"></button>
                        <button class="brush" type="button" value="#F5C6AA"></button>
                        <button class="brush" type="button" value="#9BEEC1"></button>
                        <button class="brush" type="button" value="#1a1a18"></button>
                        </div>
                    </div>
                    <button id="startTime">start time</button>
                    <button id="stopTime">stop time</button>
                </div>
                <div class="interactiveCanvas">
                <canvas id="canvas"></canvas>
                </div>
                <div class="interactiveFooter">
                    <button id="copyUrl" class="copyUrl">Click to copy web link</button>
                    <div class="linkDiscription">
                        <p>Send the copied link to family and friends to see how long it takes them</p>
                    </div>
                    <div class="timer">
                    <p><span id="seconds">00</span>:<span id="tens">00</span></p>
                    </div>
                </div>
            </div>
    
        `
    );



    
  
        var seconds = 00; 
        var tens = 00; 
        var appendTens = document.getElementById("tens")
        var appendSeconds = document.getElementById("seconds")
        var buttonStart = document.getElementById('startTime');
        var buttonStop = document.getElementById('stopTime');
        var buttonReset = document.getElementById('button-reset');
        var Interval ;
      
        buttonStart.onclick = function() {
          
          clearInterval(Interval);
           Interval = setInterval(startTimer, 10);
           $(buttonStart).hide();
           $(buttonStop).show();
        }
        
          buttonStop.onclick = function() {
             clearInterval(Interval);
        }
        
      
        // buttonReset.onclick = function() {
        //    clearInterval(Interval);
        //   tens = "00";
        //     seconds = "00";
        //   appendTens.innerHTML = tens;
        //     appendSeconds.innerHTML = seconds;
        // }
        
         
        
        function startTimer () {
          tens++; 
          
          if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
          }
          
          if (tens > 9){
            appendTens.innerHTML = tens;
            
          } 
          
          if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
          }
          
          if (seconds > 9){
            appendSeconds.innerHTML = seconds;
          }
        
        }


      
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx.strokeStyle = "#1a1a18";
        ctx.lineWidth = 0.1;
        
        let painting = false;
   

   

    function startPosition(e){
        painting = true;
        draw(e);
    }
    function finishedPosition(){
        painting= false;
        ctx.beginPath();
    }
    function draw(e){

        let rect = canvas.getBoundingClientRect();

        if(!painting) return;
        // ctx.lineWidth = 10;
        ctx.lineCap = "round";
        



        ctx.lineTo( (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width, 
            (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) ;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo( (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width, 
        (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);


        var colors = document.getElementsByClassName('brushes')[0];
        colors.addEventListener('click', function(event) {
        ctx.strokeStyle = event.target.value || '#1a1a18';
        });
        

       

    }





    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
    

});



$('.copyUrl').on('click', function() {
    let dummy = document.createElement('input'),
    text = window.location.href;

document.body.appendChild(dummy);
dummy.value = text;
dummy.select();
document.execCommand('copy');
document.body.removeChild(dummy);
 
})
