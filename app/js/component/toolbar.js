class Toolbar extends HTMLElement{
    static get observedAttributes(){
        return [];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();

        this.element.innerHTML = this.getTemplate();
    }
    connectedCallback() {
        const shadow = this.attachShadow({
            mode: 'open'
        });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();

        new jscolor(this.element.querySelector('.jscolor'));

        this.element.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onButtonClick.bind(this)));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {}
    }
    onButtonClick(event){
       const name = event.target.getAttribute('name');
       let detail = {
           type:'',
           data:{},
       };
       switch(name){
        case 'btn-draw':
            detail.type = 'DRAW';
        break;
        case 'btn-rect':
        detail.type = 'DRAW_RECT';
        break;
        case 'btn-circle':
        detail.type = 'DRAW_CIRCLE';
        break;
        case 'btn-undo':
        detail.type = 'UNDO';
        break;
        case 'btn-redo':
        detail.type = 'REDO';
        break;
       }
       if(detail.type) {
           document.dispatchEvent(new CustomEvent('CANVAS_CHANGE', {
               detail: detail
           }));
       }
    }
    getStyle() {
        return `
        button {
            display:block;
        }
            `;
    }
    getTemplate() {
        return `
        <input class="jscolor" value="ab2567">
            <button name="btn-fill">fill color</button>
            <button name="btn-border-color"> border color </button>
            <button name="btn-border-width"> border width </button>
            <button name="btn-draw"> draw </button>
            <button name="btn-line"> line </button>
            <button name="btn-rect"> rect </button>
            <button name="btn-circle"> circle </button>
            <button name="btn-erase"> erase </button>
            <button name="btn-undo"> undo </button>
            <button name="btn-redo"> redo </button>
        `;
    }
}
customElements.define('x-toolbar',Toolbar);