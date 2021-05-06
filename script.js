const button1 = document.getElementById('button1');


const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
const audio1 = document.getElementById('audio1');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let audioSource;
let analyser;
container.addEventListener('click',function(){
    
});

file.addEventListener('change',function(){
    const files = this.files;
    RegisterAudio(URL.createObjectURL(files[0]));
    audio1.load();
    audio1.play();
    playVisualiser();
});
function RegisterAudio(audioURL)
{
    audio1.src = audioURL;
    const audioCtx = new AudioContext();
    audioSource =  audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 2048;
}
function playVisualiser()
{
    const bufferLength = analyser.frequencyBinCount;
    const dataArray =new Uint8Array(bufferLength);

    const barWidth =5;
   
    let barHeight;
    let x;

    function animate(){
        x = 0;
        ctx.clearRect(0 ,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength,x,barWidth,barHeight,dataArray)
        requestAnimationFrame(animate);
    }
    
    animate();
}
function drawVisualiser(bufferLength,x,barWidth,barHeight,dataArray){
   
    for(let i= 0; i< bufferLength; i++){
        barHeight =dataArray[i]*1.5;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i*Math.PI *4/bufferLength);
        const hue = i * 0.3;
        ctx.fillStyle = 'hsl(' +hue+',100%,'+barHeight/3+'%)';
        ctx.fillRect(0,0,barWidth,barHeight);
        x += barWidth;
        ctx.restore();
    }
}