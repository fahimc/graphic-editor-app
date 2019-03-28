const App = {
    canvas:null,
    collection:[],
    undoPointer:0,
    state:{
        redo:false,
    },
    init(){
        console.log(this);
        this.canvas = new fabric.Canvas('app-canvas');
        window.addEventListener('resize', this.onResize.bind(this));
        document.addEventListener('CANVAS_CHANGE', this.onChange.bind(this));
        this.canvas.on("object:added", this.onAdded.bind(this));
        this.onResize();
    },
    drawRect(){
        let rect = new fabric.Rect({
            left: this.canvas.width * 0.1,
            top: this.canvas.width * 0.1,
            fill: 'red',
            width: this.canvas.width * 0.2,
            height: this.canvas.width * 0.2,
            stroke: 'rgba(100,200,200,0.5)',
            strokeWidth: 5,
        });
        this.canvas.add(rect);
    },
    drawCircle() {
        let circle = new fabric.Circle({
            radius: this.canvas.width * 0.2,
            fill: 'green',
            left: this.canvas.width * 0.1,
            top: this.canvas.width * 0.1,
            stroke: 'rgba(100,200,200,0.5)',
            strokeWidth: 5,
        });
        this.canvas.add(circle);
    },
    toggleDraw(){
      this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    },
    undo(){
        if (this.undoPointer > 0) this.undoPointer--;
        if (this.collection[this.undoPointer]) this.canvas.remove(this.collection[this.undoPointer]);
    },
    redo() {
        if (this.collection[this.undoPointer]) {
            this.state.redo = true;
            this.canvas.add(this.collection[this.undoPointer]);
        }
    },
    onChange(e) {
        console.log(e);
        switch(e.detail.type){
            case 'DRAW':
                this.toggleDraw();
            break;
            case 'DRAW_RECT':
                this.drawRect();
            break;
            case 'DRAW_CIRCLE':
                this.drawCircle();
            break;
            case 'UNDO':
            this.undo();
            break;
            case 'REDO':
            this.redo();
            break;
        }
    },
    onAdded(e){
        this.collection[this.undoPointer] = e.target;
        if (!this.state.redo) this.collection = this.collection.slice(0, this.undoPointer + 1);
        this.state.redo = false;
        this.undoPointer++;
    },
    onResize(){
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.renderAll();
    }
}