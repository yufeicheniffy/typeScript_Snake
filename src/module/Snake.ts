export default class Snake{
    element:HTMLElement;
    head:HTMLElement;
    bodies:HTMLCollection;
    length:number;
    constructor(){
        this.element = document.getElementById("snake")!;
        this.head = document.getElementById("snakeHead")!;
        this.bodies = this.element.getElementsByTagName("div");
        this.head.style.left = 0 + "px";
        this.head.style.top = 0 + "px";
        this.length = 1;
        for(let i = 1; i < this.bodies.length; i){
            this.element.removeChild(this.bodies[i]);  
        }
    }

    grow(){
        this.element.insertAdjacentElement("beforeend",document.createElement("div")); 
        this.length++;
        let item:HTMLElement = this.bodies[this.length-1] as HTMLElement;
        let nextItem:HTMLElement = this.bodies[this.length-2] as HTMLElement;
        item.style.top = nextItem.style.top;
        item.style.left = nextItem.style.left;
    }

    getPosition():[number,number]{
        return [this.head.offsetLeft,this.head.offsetTop]
    }
    changePosition(headX:number, headY:number){
        this.moveBody();
        this.head.style.top = headY + "px";
        this.head.style.left = headX + "px";
    }
    run(direction:string){
        let position = this.getPosition();
        let x = this.getPosition()[0];
        let y = this.getPosition()[1];
        switch(direction){
            case "ArrowUp":
                case "Up": {
                    y=y-10;
                    break;
                }
                case "ArrowDown":
                case "Down": {
                    y=y+10; 
                    break;
                }
                case "ArrowLeft":
                case "Left": {
                    x = x - 10; 
                    break;
                }
                case "ArrowRight":
                case "Right": {
                    x = x+10; 
                    break;
                }
        }
        if(x>290||x<0||y<0||y>290) {
            throw new Error("蛇撞墙了");
        }
        if(this.checkTurnaround([x,y])){
            console.log("转弯了");
            let position  = this.checkTurnaround([x,y]) as [number,number];
            this.changePosition(position[0],position[1]);
        }else{
            this.changePosition(x,y); 
        }
        if(this.checkAgainstSelf()){
            throw new Error("蛇撞自己了");
        }
    }

    moveBody():void{
        for(let i = this.bodies.length-1;i>0;i--){
            let item:HTMLElement = this.bodies[i] as HTMLElement;
            let nextItem:HTMLElement = this.bodies[i-1] as HTMLElement;
            item.style.top = nextItem.style.top;
            item.style.left = nextItem.style.left;
        }
    }

    checkTurnaround(position:[number,number]):boolean|[number,number]{
        //if new position equals second last old body item position, snack is turned;
        if(this.length>1){
            let secondItem:HTMLElement = this.bodies[1] as HTMLElement;
            if(secondItem.offsetTop === position[1]&&secondItem.offsetLeft === position[0]){
                //如果掉头了，返回应该修正的坐标
                if(this.head.offsetTop > secondItem.offsetTop){
                    //蛇方向向上
                    return [this.head.offsetLeft,this.head.offsetTop+10];
                }else if(this.head.offsetTop < secondItem.offsetTop){
                    return [this.head.offsetLeft,this.head.offsetTop-10]; 
                }else if(this.head.offsetLeft < secondItem.offsetLeft){
                    return [this.head.offsetLeft -10,this.head.offsetTop]; 
                }else if(this.head.offsetLeft > secondItem.offsetLeft){
                    return [this.head.offsetLeft +10,this.head.offsetTop]; 
                }
            }    
        }
        return false;
    }

    checkAgainstSelf():boolean{
        for(let i =1;i<this.length;i++){
            let item = this.bodies[i] as HTMLElement;
            if(this.head.offsetTop === item.offsetTop &&this.head.offsetLeft === item.offsetLeft){
                return true;
            }
        }
        return false;
    }
}