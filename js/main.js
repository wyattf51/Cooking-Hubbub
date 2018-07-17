import Title from "./states/title.js";
import Play from "./states/play.js";

console.log("GAME STARTING");

const game  = new Phaser.Game({
    height: 400,
    width: 500,
    physics: {
        default: "arcade",
        debug: true
    }
})

game.scene.add("title", Title)
game.scene.add("play", Play)

game.scene.start("title")
