import { randomInRange } from "../util.js";

const toppingOptions = ["Patty", "Lettuce", "Tomato"]
const playerSpeed = 300;
let PattyText;
let LettuceText;
let TomatoText;
let pattyOrderText;
let sodaOrderText;
let friesOrderText;
let scoreText;
let score;

export default class Play {
    preload() {
        this.load.image("sprite", "./img/sprite.jpg")
        this.load.image("sprite_zero", "./img/sprite_zero.png")
        this.load.image("player", "./img/Player.png")
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

        score = 0;

        this.genOrder();
    };
    
    genOrder() {
        this.currentOrder.set("Patty", randomInRange(0, 3))
        this.currentOrder.set("Lettuce", randomInRange(0, 3))
        this.currentOrder.set("Tomato", randomInRange(0, 3))    
    }   

    create() {
        const G = this.add.graphics();
        G.fillStyle(0xeaeaea);
        G.fillRect(0, 0, 700, 500);

        this.add.text(20, 10, "Burger: ", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        this.add.text(160, 10, "Soda: ", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        this.add.text(320, 10, "Fries: ", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        pattyOrderText = this.add.text(670, 10, "HI", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        sodaOrderText = this.add.text(670, 30, "Bye", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        friesOrderText = this.add.text(670, 50, "Rawr", {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        PattyText = this.add.text(75, 10, this.selectedToppings.get("Patty"), {
            color: "#0c0221",
            fontFamily: "Helvetica"
          });

        LettuceText = this.add.text(210, 10, this.selectedToppings.get("Lettuce"), {
            color: "#0c0221",
            fontFamily: "Helvetica"
        })

        TomatoText = this.add.text(360, 10, this.selectedToppings.get("Tomato"), {
            color: "#0c0221",
            fontFamily: "Helvetica"
          });

          scoreText = this.add.text(480, 10, `Score: ${score}`, {
              color: "#0c0221",
              fontFamily: "Helvetica"
          })
        
        this.toppings = this.physics.add.group();

        this.tIndicators = this.physics.add.group();

        for (let i = 0; i < toppingOptions.length; i++) {
            const topping = this.toppings.create(150*i+50, 201, "sprite_zero")
            topping.setScale(1)
            topping.setData("type", toppingOptions[i]);
        }


        this.trash = this.physics.add.sprite(450, 201, "sprite_zero");

        this.player = this.physics.add.sprite(250, 270, "player");
        this.player.setScale(1);

        this.player.setCollideWorldBounds(true);


        this.keys = this.input.keyboard.addKeys({
            Left: Phaser.Input.Keyboard.KeyCodes.LEFT,      
            Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,      
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
          });
    }
    update() {
        PattyText.setText(((this.selectedToppings.get("Patty") || 0).toString()));

        
        LettuceText.setText(((this.selectedToppings.get("Lettuce") || 0).toString()));

        TomatoText.setText(((this.selectedToppings.get("Tomato") || 0).toString()));

        scoreText.setText(`Score: ${score}`)


        pattyOrderText.setText(this.currentOrder.get("Patty"))

        sodaOrderText.setText(this.currentOrder.get("Lettuce"))

        friesOrderText.setText(this.currentOrder.get("Tomato"))
    
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
                    delay: 300,
                    callback: () => {
                        this.toppingSelectable = true;
                    }
                })
            }
        })

        this.physics.overlap(this.player, this.trash, (player, trash) => {
            if (this.keys.SPACE.isDown) {
                this.selectedToppings.clear()
                console.log("Cleared Toppings")
            }
        })

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
            this.sound.play("")
            this.genOrder();
            this.selectedToppings.clear();
        }
    }
}