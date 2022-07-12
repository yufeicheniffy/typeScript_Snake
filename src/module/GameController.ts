import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
export default class GameController {
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;
    direction: string;
    isLive: Boolean = false;
    startBoard: HTMLElement;
    informBorad: HTMLElement;
    finishBoard: HTMLElement;
    restartBtn: HTMLElement;

    constructor() {
        let startBtn = document.getElementById("startBtn")!;
        this.startBoard = document.getElementById("startBoard")!;
        this.informBorad = document.getElementById("informBoard")!;
        this.finishBoard = document.getElementById("finishBoard")!;
        this.restartBtn = document.getElementById("restartBtn")!;

        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel(10, 2);

        this.direction = "";
        startBtn.addEventListener("click", () => {
            console.log("初始化中...")
            this.init();
            this.informBorad.classList.add("hidden");
            console.log("初始化完毕...")
        });
        this.restartBtn.addEventListener("click", () => {
            this.food = new Food();
            this.snake = new Snake();
            this.scorePanel = new ScorePanel(10, 2);
            this.informBorad.classList.add("hidden");
            this.direction="";
            this.init();
        });
        document.addEventListener("keydown", this.keydownHandler.bind(this));
    }

    init() {
        this.isLive = true;
        this.run();
    }

    keydownHandler(keyEvent: KeyboardEvent) {
        keyEvent.preventDefault();
        let position = this.snake.getPosition();
        switch (keyEvent.key) {
            case "ArrowUp":
            case "Up": {
                this.direction = keyEvent.key;
                break;
            }
            case "ArrowDown":
            case "Down": {
                this.direction = keyEvent.key;
                break;
            }
            case "ArrowLeft":
            case "Left": {
                this.direction = keyEvent.key;
                break;
            }
            case "ArrowRight":
            case "Right": {
                this.direction = keyEvent.key;
                break;
            }
        }
    }

    run(): void {
        try {
            this.snake.run(this.direction);
            this.getFood();
            this.isLive && setTimeout(() => {
                this.run();
            }, 200 - ((this.scorePanel.level) - 1) * 15);
        } catch (e) {
            this.openFinishBoard((e as Error).message);
            this.isLive = false;
        }
    }

    getFood(): boolean {
        if (this.snake.getPosition()[0] === this.food.getPosition()[0] && this.snake.getPosition()[1] === this.food.getPosition()[1]) {
            this.snake.grow();
            this.food.changePosition();
            this.scorePanel.addScore();
            return true;
        }
        return false;
    }

    openFinishBoard(message: string): void {
        let scoreSpan: HTMLElement = document.getElementById("scoreSpan")!;
        let statusSpan: HTMLElement = document.getElementById("statusSpan")!;
        scoreSpan.innerHTML = this.scorePanel.score + "";
        statusSpan.innerHTML = message;
        this.informBorad.classList.remove('hidden');
        this.startBoard.classList.add('hidden');
        this.finishBoard.classList.remove('hidden');
    }
}