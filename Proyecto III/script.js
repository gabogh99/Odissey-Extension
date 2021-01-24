let previous = document.querySelector('#prev');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volumen= document.querySelector('#volumen');
let volumen_show = document.querySelector('#volumen_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
    {
      name: "The Box",
      path: "music/The_Box.mp3",
      img: "images/box.jpg",
      singer: "Roddy Rich"
    },
    {
      name: "Sunflower",
      path: "music/Sunflower.mp3",
      img: "images/sunflower.jpg",
      singer: "Post Malone"
    },
    {
      name: "Heartless",
      path: "music/heartless.mp3",
      img: "images/heartless.jpg",
      singer: "The Weeknd"
    },
    {
      name: "Highest in the Room",
      path: "music/Highest.mp3",
      img: "images/room.jpg",
      singer: "Travis Scott"
    },
    {
      name: "Lazy Song",
      path: "music/LazySong.mp3",
      img: "images/lazy.jpg",
      singer: "Bruno Mars"
    }
 ];

//All functions

//function load the track

function load_track(index_no){
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
}

timer = setInterval(range_slider, 1000);

load_track(index_no);




//Checking songs playing or not

document.getElementById("justplay").addEventListener("click", justplay);
function justplay(){
    if(Playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

// play song
function playsong(){
    track.play();
    Playing_song = true;
  }
  
  //pause song
  function pausesong(){
      track.pause();
      Playing_song = false;
  }

  //next song
  document.getElementById("next_song").addEventListener("click", next_song);
  function next_song(){
      if(index_no<All_song.length - 1){
          index_no+=1;
          load_track(index_no);
          playsong();
      }else{
          index_no = 0;
          load_track(index_no);
          playsong();
      }
  }

  
  //previous song
  document.getElementById("prev_song").addEventListener("click", prev_song);
  function prev_song(){
      if(index_no>0){
          index_no-=1;
          load_track(index_no);
          playsong();
      }else{
          index_no = All_song.length;
          load_track(index_no);
          playsong();
      }
  }


 //Change volume 
  document.getElementById("volumen").addEventListener("change", volumen_change);
  function volumen_change(){
      volumen_show.innerHTML = recent_volumen.value;
      track.volume = recent_volumen.value / 100;

  }




   //Change volume 
   document.getElementById("duration_slider").addEventListener("change", change_duration);
   function change_duration(){
       slider_position = track.duration * (slider.value / 100);
       track.currentTime = slider_position;
 
   }

   function range_slider(){
       let position = 0;

       if(!isNaN(track.duration)){
           position = track.currentTime * (100/ track.duration);
           slider.value = position;
       }


   }

