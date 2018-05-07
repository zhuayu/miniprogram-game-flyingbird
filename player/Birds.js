// 小鸟类
import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';


export class Birds extends Sprite{
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);


        //小鸟三种状态的数据，小鸟宽34，高24，上下边距10，左右边距9
        const birdWidth   = 34;
        const birdHeight  = 24;
        this.clippingX = [9,9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
        this.clippingY = [10,10,10,10];
        this.clippingWidth  = [birdWidth,birdWidth,birdWidth,birdWidth];
        this.clippingHeight = [birdHeight,birdHeight,birdHeight,birdHeight];
        this.birdX = DataStore.getInstance().canvas.width / 4;
        this.birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsX = [this.birdX,this.birdX,this.birdX];
        this.birdsY = [this.birdY,this.birdY,this.birdY];
        this.birdsWidth  = [birdWidth,birdWidth,birdWidth];
        this.birdsHeight = [birdHeight,birdHeight,birdHeight];
        this.y = [this.birdY,this.birdY,this.birdY];
        this.index = 0;
        this.count = 0;
        this.time  = 0;
    }

    draw() {
        // 切换三只小鸟速度
        const speed = 0.2;
        this.count = this.count + speed;
        if(this.index >=2 ){
            this.count = 0;
        }
        this.index = Math.floor(this.count);
        // 模拟重力加速度
        const g = 0.98 / 2.5;
        const offsetUp = 30;
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        for(let i = 0; i<=2 ; i++){
            this.birdsY[i] = this.y[i] + offsetY
        }
        this.time ++;

        super.draw(this.img,
            this.clippingX[this.index],this.clippingY[this.index],
            this.clippingWidth[this.index],this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],
            this.birdsWidth[this.index],this.birdsHeight[this.index])
    }
}