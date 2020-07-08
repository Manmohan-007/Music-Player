var myAud=document.getElementById("myAudio");
var playBtn=document.getElementById("play-btn");
var pauseBtn=document.getElementById("pause-btn");
var progressBar=document.getElementById("progress-display"); 
var totaltime = document.getElementById("total-time") ;
var initialtime = document.getElementById("initial-time") ; 
var music = document.getElementsByClassName
("MusicPlayer_Slider")[0] ; 
var volumeon = document.getElementById("vol-on") ; 
var volumeoff= document.getElementById("vol-off") ; 
var playlistwrapper = document.getElementById("playlist-wrapper") ; 
var songname = document.getElementById("song-name") ; 
var songimage = document.getElementById("song-img") ; 
var forwardbutton = document.getElementById("forward-button") ; 
var shufflebutton = document.getElementById("random") ; 
var backbutton = document.getElementById("back-btn") ; 
var length = myAud.duration ; 
totaltime.innerText = endtime(length) ; 
let currentid = 0 ; 
let flag = 0 ; 
//---------Playlist card!!!!!!!!----------- 















var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5ee90a15ca595700160298cc.mockapi.io/playlist", true);
xhttp.send();
xhttp.onreadystatechange = function () { 
  if (xhttp.readyState === 4) {
      var response = JSON.parse(xhttp.responseText); 
      // window.currentid = 0 ; 
      for (var i = 0; i < response.length; i++) {
      var audiodata = response[i]; 
      var cardfun = createplaylistcard(audiodata) ; 
      playlistwrapper.appendChild(cardfun) ; 
}  
      myAud.src = response[0].file ; 
      songname.innerText = response[0].artist + " - " + response[0].track ; 
      songimage.src = response[0].albumCover ; 
      myAud.onended =()=>{
        songforward(response) ; 
        
      }    
      forwardbutton.onclick=()=>{ 
      console.log(currentid) ; 
      songforward(response) ; 
         
        
        
       } ; 
      backbutton.onclick=()=>{
        songbackward(response) ; 
      }
      shufflebutton.onclick=()=>{ 
       if (flag==0) {  
         shuffle(response) ; 
         shufflebutton.style.color="#2a5298"; 
         flag=1 ; 
       } 
       else if(flag==1){ 
         shuffle1(response); 
         shufflebutton.style.color="black"; 
         flag=0 ; 
       } 
      }
}
};
songforward=(response)=>{
if (currentid==response.length-1) {
   currentid = 0 ;  
   myAud.src=response[currentid].file ; 
   songname.innerText = response[currentid].artist + " - " + response[currentid].track ; 
   songimage.src = response[currentid].albumCover ; 
    playBtn.style.display="none";
    pauseBtn.style.display="block";  
  }
else{
   currentid++ ; 
   myAud.src=response[currentid].file ; 
   songname.innerText = response[currentid].artist + " - " + response[currentid].track ; 
   songimage.src = response[currentid].albumCover ; 
   myAud.play() ; 
   playBtn.style.display="none";
   pauseBtn.style.display="block";  
   
   // console.log(currentid) ; 
}  
  
}

songbackward = (response)=>{
  // console.log(currentid) ; 
if (currentid==0) {
   currentid = response.length-1;  
   myAud.src=response[currentid].file ; 
   songname.innerText = response[currentid].artist + " - " + response[currentid].track ; 
   songimage.src = response[currentid].albumCover ; 
    playBtn.style.display="none";
    pauseBtn.style.display="block";  
  }
else{
   currentid-- ; 
   myAud.src=response[currentid].file ; 
   songname.innerText = response[currentid].artist + " - " + response[currentid].track ; 
   songimage.src = response[currentid].albumCover ; 
   myAud.play() ; 
   playBtn.style.display="none";
   pauseBtn.style.display="block";  
   
   // console.log(currentid) ; 
}  
  
} 
shuffle=(response)=>{ 
forwardbutton.onclick=()=>{ 
songforwardshuffle(response) ; 
} ;  
backbutton.onclick=()=>{
        songbackwardshuffle(response) ; 
      };
myAud.onended=()=>{
var randomid = Math.floor(Math.random() * response.length-1) + 1; 
myAud.src= response[randomid].file ;
songname.innerText = response[randomid].artist + " - " + response[randomid].track ; 
songimage.src = response[randomid].albumCover ;  
currentid = randomid ;   
myAud.play()  
 }
}  

shuffle1=(response)=>{ 
forwardbutton.onclick=()=>{
  songforward(response) ; 
} ;
      backbutton.onclick=()=>{
        songbackward(response) ; 
      }
myAud.onended=()=>{
songforward(response) ;
 }}  
songforwardshuffle=(response)=>{ 
var randomid = Math.floor(Math.random() * response.length-1) + 1;    
   myAud.src=response[randomid].file ; 
   songname.innerText = response[randomid].artist + " - " + response[randomid].track ; 
   songimage.src = response[randomid].albumCover ; 
   playBtn.style.display="none";
   pauseBtn.style.display="block";  
   currentid = randomid ;   
   myAud.play() 
} ; 
songbackwardshuffle=(response)=>{
  var randomid = Math.floor(Math.random() * response.length-1) + 1;    
  myAud.src=response[randomid].file ; 
  songname.innerText = response[randomid].artist + " - " + response[randomid].track ; 
   songimage.src = response[randomid].albumCover ; 
   playBtn.style.display="none";
   pauseBtn.style.display="block";  
   currentid = randomid ;   
   myAud.play() 
} ; 




//---------Audio Player------------!!!!

function endtime(length){
    var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 4),
    seconds = parseFloat(seconds) ; 
    seconds = Math.round(seconds) ; 
    time = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
   // console.log(seconds) ; 
  
  return time;
}
function starttime(currentTime){
  var current_hour = parseInt(currentTime / 3600) % 24 ;
  var current_minute = parseInt(currentTime / 60) % 60 ; 
  var current_seconds_long = currentTime % 60 ; 
  var current_seconds = current_seconds_long.toFixed() ;
  var current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
return current_time;

} 
progressBar.addEventListener("click", function(e){
var percent = e.offsetX / this.offsetWidth; 
myAud.currentTime = percent * myAud.duration; 
console.log(myAud.duration);
  progressBar.value = percent / 100; 
});  
playBtn.addEventListener('click',function(){
  myAud.play();
  playBtn.style.display="none";
  pauseBtn.style.display="block";  
});
pauseBtn.addEventListener("click",function(){
    myAud.pause(); 
    playBtn.style.display="block";
    pauseBtn.style.display="none";
 });
function progress1(){ 
var songCurrentTime=myAud.currentTime;  
var songDuration=myAud.duration; 
if(songCurrentTime>0) {  
totaltime.innerText = endtime(songDuration) ; 
window.end = endtime(songDuration) ; 
}  
if (songCurrentTime==0) {
progressBar.value = "0";
initialtime.innerText=starttime(songCurrentTime) ;
}
else{  
progressBar.value=(songCurrentTime)/(songDuration);
initialtime.innerText=starttime(songCurrentTime) ;
} 
}
music.addEventListener("click", function(){
var musicvol  = music.value/100 ; 
myAud.volume = musicvol ;   
console.log(music.value) ; 
if(music.value>"0"){
  volumeon.style.display="block" ; 
  volumeoff.style.display="none" ; 
} 
else if (music.value=="0"){
  volumeon.style.display="none" ; 
  volumeoff.style.display="block" ; 
}  
}); 
volumeon.addEventListener("click" ,function(){
  music.value="0" ; 
  volumeon.style.display="none" ; 
  volumeoff.style.display="block" ; 
}) ; 
volumeoff.addEventListener("click",function(){
  volumeoff.style.display="none" ; 
  volumeon.style.display = "block" ; 
  music.value = "35" ; 
}) ; 


   



function createplaylistcard(audiodata){ 

var playlistcard = document.createElement('div') ; 
var imgplaycard = document.createElement("img") ; 
var playcardtextwrapper = document.createElement('div') ; 
var headingplaycard = document.createElement('h3') ; 
var paraplaycard = document.createElement('p') ; 
  
  playlistcard.classList.add("playlist-card") ; 
  playcardtextwrapper.classList.add("playcard-text-wrapper") ; 
  imgplaycard.src = audiodata.albumCover; 
  headingplaycard.innerText = audiodata.track ; 
  paraplaycard.innerText = audiodata.artist ; 
  playlistcard.appendChild(imgplaycard) ; 
  playlistcard.appendChild(playcardtextwrapper) ; 
  playcardtextwrapper.appendChild(headingplaycard) ; 
  playcardtextwrapper.appendChild(paraplaycard) ; 
  playlistcard.addEventListener("click" , function(){ 
  myAud.src = audiodata.file ; 
  myAud.play() ;  
  songname.innerText = audiodata.artist + " " + " - " +" "+ audiodata.track ;  
  songimage.src = audiodata.albumCover ; 
  playBtn.style.display="none";
  pauseBtn.style.display="block"; 
  currentid = audiodata.id ; 
}) 
 
return playlistcard ;  
} 