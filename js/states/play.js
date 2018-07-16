const toppingOptions = ["bacon", "canadian bacon", "raw bacon"]
const playerSpeed = 100;


export default class Play {
    preload() {
        this.load.image("sprite", "./img/sprite.jpg")
        this.load.image("sprite_zero", "./img/sprite_zero.png")
    }
    init() {
        this.player = undefined;
        this.toppings = undefined;
        this.keys = undefined;

        this.selectedToppings = new Set();
    }
    create() {
        this.player = this.physics.add.sprite(200, 270, "sprite");
        this.player.setScale(1)

        this.toppings = this.physics.add.group();

        for (let i = 0; i < toppingOptions.length; i++) {
            const topping = this.toppings.create(150*i+50, 201, "sprite_zero")
            topping.setScale(1)
            topping.setData("type", toppingOptions[i]);
        }

        this.keys = this.input.keyboard.addKeys({
            Left: Phaser.Input.Keyboard.KeyCodes.LEFT,      
            Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,      
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
          });
    }
    update() {
        this.physics.overlap(this.player, this.toppings, (player, topping) => {
            const toppingType = topping.getData("type");
            if (this.keys.SPACE.isDown && !this.selectedToppings.has(toppingType)) {
                console.log(`Added topping ${toppingType}`)
                this.selectedToppings.add(toppingType);
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