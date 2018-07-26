export default class GameOver{
    init() {
        this.keys = undefined;
    }
    preload() {
        this.load.image("gameover", "./img/GameOver.png")
    }
    create() {
        this.scene.stop("Play");
        
        this.keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
        const gameover = this.add.image(0, 0, "gameover")

        gameover.setOrigin(-0.9, -1.5)

        const Gtext = this.add.text(165, 350, "Press Enter to try again",{
            fontSize: 26
        })
    }
    update() {
        if (this.keys.Space.isDown || this.keys.Enter.isDown) {
            this.scene.start("Title");
        }
    }
}
