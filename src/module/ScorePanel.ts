export default class ScorePanel{
    private _score: number;
    private _level: number;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    maxLevel:number;
    updateScore:number;

    get score(): number { return this._score;};
    get level(): number { return this._level;};
    
    constructor(maxLevel:number=10,updateScore:number=10){
        this._score = 0;
        this._level = 0;
        this.scoreEle = document.getElementById("score")!;
        this.scoreEle.innerHTML = this._score + "";
        this.levelEle = document.getElementById("level")!;
        this.levelEle.innerHTML = this._level + "";
        this.maxLevel = maxLevel;
        this.updateScore = updateScore;
    }
    
    addScore(): void{
        this.scoreEle.innerHTML = ++this._score + "";
        if(this._score%this.updateScore===0){
            this.levelUp();
        }
    }
    levelUp(): void{
        if(this._level<=this.maxLevel){
            this._level++;
        }
        this.levelEle.innerHTML = this._level + "";
    }
}