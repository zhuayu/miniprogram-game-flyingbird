// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from './base/ResourceLoader.js';
import { Director } from './Director.js';
import { DataStore } from './base/DataStore.js';
import { BackGround } from './runtime/BackGround.js';
import { Land } from './runtime/Land.js';
import { Birds } from './player/Birds.js';
import { StartButton } from './player/StartButton.js';
import { Score } from './player/Score.js';


export class Main {
    constructor(props) {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map){
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    createBackgroundMusic(){
        var bgm = wx.createInnerAudioContext()
        bgm.autoplay = true
        bgm.loop = true
        bgm.src = "audios/bgm.mp3";
    }

    init(){
        let background = new BackGround();
        let land       = new Land();
        let birds      = new Birds();
        let startbutton = new StartButton();
        let score       = new Score();
        this.director.isGameOver = false;
        this.dataStore
            .put('background',background)
            .put('land',land)
            .put('pencils',[])
            .put('birds',birds)
            .put('startbutton',startbutton)
            .put('score',score)

        // this.createBackgroundMusic();
        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent(){
        wx.onTouchStart(()=>{
            if(this.director.isGameOver){
                console.log('游戏重新开始')
                this.init();
            }else{
                this.director.birdsEvent();
            }
        })
    }
}