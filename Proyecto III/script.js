//Declaración de las variables a utilizar 

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
let album = document.querySelector('#album');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false; //Se inicializa el playing song en false para cargarla y no reproducir


//Se crea un elemento de audio
let track = document.createElement('audio');


//Lista de canciones del playlist
let All_song = [
    {
      name: "The Box",
      path: "music/The_Box.mp3",
      img: "images/box.jpg",
      singer: "Roddy Ricch",
      album: "  Excuse Me"
    },
    {
      name: "Sunflower",
      path: "music/Sunflower.mp3",
      img: "images/sunflower.jpg",
      singer: "Post Malone",
      album: "Spider-Man"

    },
    {
      name: "Heartless",
      path: "music/heartless.mp3",
      img: "images/heartless.jpg",
      singer: "The Weeknd",
      album: "After Hours"

    },
    {
      name: "Highest in the Room",
      path: "music/Highest.mp3",
      img: "images/room.jpg",
      singer: "Travis Scott",
      album: "AstroWorld"

    },
    {
      name: "Lazy Song",
      path: "music/LazySong.mp3",
      img: "images/lazy.jpg",
      singer: "Bruno Mars",
      album: "Doo-Woops"

    },
    {
        name: "Blinding Lights",
        path: "music/BlindingLights.mp3",
        img: "images/blinding.jpg",
        singer: "The Weeknd",
        album: "After Hours"

      },

      {
        name: "One",
        path: "music/One.mp3",
        img: "images/one.jpg",
        singer: "Metallica",
        album: "And Justice for All"

      },

      {
        name: "YRN",
        path: "music/Yrn.mp3",
        img: "images/yrn.jpg",
        singer: "Migos",
        album: "YRN"

      }
 ];

//Funciones del programa

/**
 * Función que carga las canciones
 * @param {*} index_no 
 */

function load_track(index_no){
    track.src = All_song[index_no].path; //Se carga el path de las canciones
    title.innerHTML = All_song[index_no].name;//Se define el titulo de la canción
    track_image.src = All_song[index_no].img;//Se define la imagen de la canción
    artist.innerHTML = All_song[index_no].singer;//Se define el artista de la canción
    album.innerHTML = All_song[index_no].album;//Se define el album de la canción

    track.load();//carga el archivo de audio
    }


timer = setInterval(range_slider, 1000); //Se inicializa un tiempo de carga de canciones

load_track(index_no); //Se carga la cancion del indice de la lista de canciones




/** 
 * Funcion que verifica si la canción está siendo reproducida y la reproduce
 */

document.getElementById("justplay").addEventListener("click", justplay);//Crea el evento click
function justplay(){
    if(Playing_song==false){ //Verifica si se está reproduciendo
        playsong(); //Llama a la funcion playsong
        () => console.log('i injected');
    }else{
        pausesong();//Pausa la canción en otro caso
    }
}

/**
 * Función que reproduce una canción aleatoria de la lista
 * 
 */
document.getElementById("shuffle").addEventListener("click", shuffle);
function shuffle(){
    if(Playing_song==false){//Verifica si se está reproduciendo
        load_track(Math.floor(Math.random(index_no)*10)) //Carga la cancion con un indice random de la lista de canciones
        playsong();//Reproduce la canción
        () => console.log('i injected');
    }else{
        pausesong();//En otro caso pausa la canción
    }
}

/**
 * Función para reproducir la canción
 */
function playsong(){
    track.play();
    Playing_song = true;//Hace true el playing song
  }
  
/**
 * Función para detener la canción
 */
  function pausesong(){
      track.pause();
      Playing_song = false;//Hace false el playing song
  }

/** 
 * Función para pasar a la siguiente canción
 */
  document.getElementById("next_song").addEventListener("click", next_song);//Se crea el evento click
  function next_song(){
      if(index_no<All_song.length - 1){ //Verifica que el indice no sea mayor que el largo de la lista
          index_no+=1;//Cambia el indice en 1 al siguiente indice
          load_track(index_no);//Carga la canción
          playsong();//Reproduce la cancion
      }else{
          index_no = 0;//Cuando el indice supera la longitud de la lista se vuelve 0
          load_track(index_no);//Carga la canción
          playsong();//Reproduce la cancion
      }
  }

/** 
 * Función para ir a la canción anterior
 */
  document.getElementById("prev_song").addEventListener("click", prev_song); //Se crea el evento click
  function prev_song(){
      if(index_no>0){//Verifica que el indice no sea menor que 0
          index_no-=1;//Cambia el indice en 1 al indice anterior
          load_track(index_no);//Carga la canción
          playsong();//Reproduce la cancion
      }else{
          index_no = All_song.length;//Cuando el indice supera la longitud de la lista se vuelve el valor maximo de la longitud de la lista
          load_track(index_no);//Carga la canción
          playsong();//Reproduce la cancion
      }
  }


/**
 * Funcion para definir el volumen 
*/
  document.getElementById("volumen").addEventListener("change", volumen_change);//Se crea el evento change
  function volumen_change(){
      volumen_show.innerHTML = recent_volumen.value; //Redefine el valor del volumen
      track.volume = recent_volumen.value / 100; //Le hace un set volume al volumen de la cancion cargada

  }



/**
 * Funcion para cambiar el volumen 
*/
   document.getElementById("duration_slider").addEventListener("change", change_duration);//Se crea el evento change
   function change_duration(){
       slider_position = track.duration * (slider.value / 100);//Asocia el valor del slider con el del volumen del track
       track.currentTime = slider_position; //Le da el valor cuando se mueve el slider
 
   }

/**
 * Función que permite adelantar y retrasar la canción
 */
   function range_slider(){
       let position = 0;//Se inicia en 0

       if(!isNaN(track.duration)){
           position = track.currentTime * (100/ track.duration); //Asocia la posicion del slider con el tiempo de la cancion
           slider.value = position;//Le da el calor cuando se mueve
       }


   }

/**
 * Función que detecta si se está en una pantalla de YouTube
 */
   chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {

        if(/^https:\/\/www\.youtube/.test(current_tab_info.url)){
            chrome.tabs.executeScript(null, {file:'./foreground.js'}, () => console.log('i injected'))

        }
    });
});

