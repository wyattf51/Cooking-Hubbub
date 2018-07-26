export default class Title {
    preload(){
        this.load.image("game", "./img/Game.png")
    }
    init() {
        this.keys = undefined;
    }
    create() {
        const G = this.add.graphics();
        G.fillStyle(0xeaeaea);
        G.fillRect(0, 0, 400, 400);

        this.keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.add.image(350, 250, "game");

        this.add.text(450, 260, "Instructions", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 26,
        })
        this.add.text(330, 290, "To play, press space to select the item. ", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 20,
        })
        this.add.text(320, 310, "The number of items that are requested.", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 20,
        })
        this.add.text(350, 330, "are at the top right corner.", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 20,
        })
        this.add.text(340, 350, "The items you have held are ", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 20,
        })
        this.add.text(360, 370, "at the top left corner.", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 20,
        })
        this.add.text(340, 390, "Press Space or Enter to Start", {
            color: "#0c0221",
            fontFamily: "Helvetica",
            fontSize: 26,
        })
    }
    update() {
        if (this.keys.Space.isDown || this.keys.Enter.isDown) {
            this.scene.start("play");
        }
    }
}