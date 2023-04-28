import { spriteWidth, spriteHeight} from "../main.js"

export class Frame{
    constructor(name,frames,positionAnimation) {
        this.name = name;
        this.frames = frames;
        this.positionAnimation = positionAnimation;
        this.loc = [];
        this.positionX = 0
        this.positionY = 0
    }
    divideSpritesByFrames() {
        for ( let i = 0; i < this.frames; i++)
        {this.positionX = i * spriteWidth; 
            this.positionY = this.positionAnimation * spriteHeight;
            this.loc.push({x: this.positionX, y: this.positionY})
        }
    }
    packSprites(options) {
        let AllAnims = []
        options.forEach(e => {
            e.divideSpritesByFrames()
            AllAnims.push(e)
        });
        return AllAnims
    }
}