import { randomInRange } from "../util.js";

const toppingOptions = ["Patty", "Lettuce", "Tomato"]
const playerSpeed = 500;
let PattyText;
let LettuceText;
let TomatoText;
let pattyOrderText;
let sodaOrderText;
let friesOrderText;
let scoreText;
let score;
let timer;
let timerText;

export default class Play {

    preload() {
        this.load.image("sprite", "./img/sprite.jpg")
        this.load.image("sprite_zero", "./img/sprite_zero.png")
        this.load.image("player", "./img/Player.png")
        this.load.image("Patty", "./img/burger.png")
        this.load.image("Tomato", "./img/fries.png")
        this.load.image("Lettuce", "./img/soda.png")
        this.load.image("trash", "./img/trash.png")
        this.load.image("BK", "./img/Background.png")

        this.load.audio("bgm", "./audio/bgm.mp3")
        this.load.audio("score", "./audio/score.mp3")
    }
    init() {
        this.player = undefined;
        this.toppings = undefined;
        this.trash = undefined;
        this.keys = undefined;
        this.platforms = undefined;

        this.selectedToppings = new Map();
        this.currentOrder = new Map();
        this.toppingSelectable = true;
        this.musicPlaying = false;

        score = 0;
        timer = 40;

        this.genOrder();
    };
    
    genOrder() {
        this.currentOrder.set("Patty", randomInRange(0, 3))
        this.currentOrder.set("Lettuce", randomInRange(0, 3))
        this.currentOrder.set("Tomato", randomInRange(0, 3))    
    }   

    create() {
        this.add.image(350, 250, "BK")
       
        //adds the text for burger count
        this.add.text(20, 10, "Burger: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        PattyText = this.add.text(75, 10, this.selectedToppings.get("Patty"), {
            //color: "#0c0221",
            fontFamily: "Helvetica"
          });

        //adds the text for soda count
        this.add.text(20, 30, "Soda: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        LettuceText = this.add.text(70, 30, this.selectedToppings.get("Lettuce"), {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
       
        //adds text for number of fries
        this.add.text(20, 50, "Fries: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        TomatoText = this.add.text(70, 50, this.selectedToppings.get("Tomato"), {
            //color: "#0c0221",
            fontFamily: "Helvetica"
          });

        //Order generation
        this.add.text(570, 10, "# of Burgers: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        pattyOrderText = this.add.text(670, 10, "HI", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        this.add.text(580, 30, "# of Sodas: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        sodaOrderText = this.add.text(670, 30, "Bye", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        this.add.text(590, 50, "# of Fries: ", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        friesOrderText = this.add.text(670, 50, "Rawr", {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })

        timerText = this.add.text(300, 10, `Time: ${Math.floor(timer)}`,{
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })

        scoreText = this.add.text(300, 30, `Score: ${score}`, {
            //color: "#0c0221",
            fontFamily: "Helvetica"
        })
        
        this.toppings = this.physics.add.group();

        this.tIndicators = this.physics.add.group();

        for (let i = 0; i < toppingOptions.length; i++) {
            const topping = this.toppings.create(200*i+50, 201, toppingOptions[i])
            topping.setScale(1)
            topping.setData("type", toppingOptions[i]);
        }

        //trash can sprite creation
        this.trash = this.physics.add.sprite(620, 201, "trash").setScale(4);

        //Player stuff
        this.player = this.physics.add.sprite(250, 280, "player");
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);

        this.keys = this.input.keyboard.addKeys({
            Left: Phaser.Input.Keyboard.KeyCodes.LEFT,      
            Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,      
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
          });

        //timer
        const tick = () => {
            timer -= .1
            if(timer <= 0){
                this.scene.start("gameOver")
            }else {
                this.time.addEvent({
                    delay: 100,
                    callback: tick
                })
            }
            
            console.log(timer)
        }
        this.time.addEvent({
            delay: 100,
            callback: tick
        })
    }
    update() {

        PattyText.setText(((this.selectedToppings.get("Patty") || 0).toString()));

        
        LettuceText.setText(((this.selectedToppings.get("Lettuce") || 0).toString()));

        TomatoText.setText(((this.selectedToppings.get("Tomato") || 0).toString()));

        scoreText.setText(`Score: ${score}`)

        timerText.setText(`Time: ${Math.floor(timer) }`)


        pattyOrderText.setText(this.currentOrder.get("Patty"))

        sodaOrderText.setText(this.currentOrder.get("Lettuce"))

        friesOrderText.setText(this.currentOrder.get("Tomato"))
    
        //mechanism for increasing the number of an item
        this.physics.overlap(this.player, this.toppings, (player, topping) => {
            const toppingType = topping.getData("type");
            if (this.keys.SPACE.isDown && this.toppingSelectable) {
                this.toppingSelectable = false;

                if (this.selectedToppings.has(toppingType)) {
                    this.selectedToppings.set(toppingType, this.selectedToppings.get(toppingType)+1);
                } else {
                    this.selectedToppings.set(toppingType, 1)
                }

                console.log(`Added ${toppingType}, now at ${this.selectedToppings.get(toppingType)}`)

                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.toppingSelectable = true;
                    }
                })
            }
        })

        //trash can mechanism
        this.physics.overlap(this.player, this.trash, (player, trash) => {
            if (this.keys.SPACE.isDown) {
                this.selectedToppings.clear()
                console.log("Cleared Toppings")
            }
        })

        //player movement
        if (this.keys.Left.isDown) {
            this.player.setVelocityX(-playerSpeed)
        } else if (this.keys.Right.isDown) {
            this.player.setVelocityX(playerSpeed)
        } else {
            this.player.setVelocityX(0)
        }

        const patty = this.selectedToppings.get("Patty") === this.currentOrder.get("Patty");
        const lettuce = this.selectedToppings.get("Lettuce") === this.currentOrder.get("Lettuce");
        const tomato = this.selectedToppings.get("Tomato") === this.currentOrder.get("Tomato");

        if (patty && lettuce && tomato) {
            score++;
            this.sound.play("score")
            this.genOrder();
            this.selectedToppings.clear();
        }
    }
}
