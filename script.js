class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn  = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentsnare = './sounds/snare-acoustic01.wav';
        this.currenthihat = './sounds/hihat-808.wav';
        this.currenttom = './sounds/tom-808.wav';

        this.kickAudio = document.querySelector('.kick-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.tomAudio = document.querySelector('.tom-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    activepad() {
        this.classList.toggle("active")
        // console.log(this);
    }
    repeat(){
       let step = this.index % 8;
       const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            if(bar.classList.contains('active')){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();

                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                    
                }
                if(bar.classList.contains("tom-pad")){
                    this.tomAudio.currentTime = 0;
                    this.tomAudio.play();
                    
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                    
                }
            }
        })

       this.index++;
      
       
    }
    start(){
       
        const interval  = (60/this.bpm)*1000;

        if(!this.isPlaying){
         this.isPlaying = setInterval(()=>{
           this.repeat();
        },interval);
       
    }else{
        clearInterval(this.isPlaying);
        this.isPlaying =null;
    }
}
    updatePlay(){
        if(!this.isPlaying){
            this.playBtn.innerText ="Stop"
            this.playBtn.classList.add('active')
        }else{
            this.playBtn.innerText ="Play"
            this.playBtn.classList.remove('active')
        }

       
    }
    changeSound(e) {
        const selectionName = e.target.name; // e.g. 'kick-select', 'snare-select'
        const selectionValue = e.target.value; // e.g. './sounds/new-kick.wav'
        switch (selectionName) {
            case "kick-select":
             this.kickAudio.src = selectionValue;
             break;
             case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
             case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break; 
            case "tom-select":
                this.tomAudio.src = selectionValue;
                break; 
                
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
          switch (muteIndex) {
            case "0":
              this.kickAudio.volume = 0;
              break;
            case "1":
              this.snareAudio.volume = 0;
              break;
            case "2":
              this.hihatAudio.volume = 0;
              break;
            case "3":
                this.tomAudio.volume =0;

          }
        }else{
            switch (muteIndex) {
                case "0":
                  this.kickAudio.volume = 1;
                  break;
                case "1":
                  this.snareAudio.volume = 1;
                  break;
                case "2":
                  this.hihatAudio.volume = 1;
                  break;

                case "3":
                  this.tomAudio.volume =1;
        }
        
    }
}
changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

}



const drumkit = new Drumkit();

drumkit.pads.forEach((pad)=>{
    pad.addEventListener('click',drumkit.activepad);
    pad.addEventListener('animationend',function(){
        this.style.animation="";
    })
})
   
 

drumkit.playBtn.addEventListener('click',function(){
    drumkit.updatePlay();
    drumkit.start()
})

drumkit.selects.forEach(select =>{
    select.addEventListener('change',function(e){
        drumkit.changeSound(e);
    })
})

drumkit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      drumkit.mute(e);
    });
  });


  drumkit.tempoSlider.addEventListener("input", function(e) {
    drumkit.changeTempo(e);
  });
  drumkit.tempoSlider.addEventListener("change", function(e) {
    drumkit.updateTempo(e);
  });
