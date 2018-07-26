import Title from "./states/title.js";
import Play from "./states/play.js";
import gameOver from "./states/gameOver.js";

console.log("GAME STARTING");

const game  = new Phaser.Game({
    height: 500,
    width: 700,
    physics: {
        default: "arcade",
        debug: true
    }
})

game.scene.add("title", Title)
game.scene.add("play", Play)
game.scene.add("gameOver", gameOver)

game.scene.start("title")
