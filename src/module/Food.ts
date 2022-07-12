export default class Food{
    element: HTMLElement;
    constructor(){
        this.element = document.getElementById("food")!;
    }

    get X():number{
        return this.element.offsetLeft;
    }

    get Y(): number {
        return this.element.offsetTop;
    }

    getPosition():[number,number]{
        return [this.X,this.Y];
    }

    changePosition(){
        let randX:number = Math.floor(Math.random()*29)*10;
        let randY:number = Math.floor(Math.random()*29)*10;
        this.element.style.left = randX + "px";
        this.element.style.top = randY + "px";
    }
}