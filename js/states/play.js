const toppingOptions = ["Patty", "Lettuce", "Tomato"]
const playerSpeed = 200;


export default class Play {
    preload() {
        this.load.image("sprite", "./img/sprite.jpg")
        this.load.image("sprite_zero", "./img/sprite_zero.png")
        this.load.image("stove", "./img/Stove.png")
    }
    init() {
        this.player = undefined;
        this.toppings = undefined;
        this.trash = undefined;
        this.keys = undefined;

        this.selectedToppings = new Map();
        this.toppingSelectable = true;
    }
    create() {
        this.player = this.physics.add.sprite(250, 270, "sprite");
        this.player.setScale(1)

        this.toppings = this.physics.add.group();

        this.tIndicators = this.physics.add.group();

        for (let i = 0; i < toppingOptions.length; i++) {
            const topping = this.toppings.create(150*i+50, 201, "sprite_zero")
            topping.setScale(1)
            topping.setData("type", toppingOptions[i]);
        }


        this.trash = this.physics.add.sprite(450, 201, "sprite_zero");


        this.keys = this.input.keyboard.addKeys({
            Left: Phaser.Input.Keyboard.KeyCodes.LEFT,      
            Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,      
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
          });
    }
    update() {
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
                    delay: 250,
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
    }
}