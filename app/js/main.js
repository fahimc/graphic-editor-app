const Main = {
    init(){
       document.addEventListener('DOMContentLoaded', this.onLoad.bind(this)); 
    },
    onLoad(){
        window.addEventListener('resize', this.onResize.bind(this)); 
        this.resizeCanvas();
        App.init();
    },
    onResize(){
        this.resizeCanvas();
    },
    resizeCanvas(){
        //canvas = document.querySelector('canvas');
        //canvas.width = window.innerWidth;
       // canvas.height = window.innerHeight;
    }
}.init();