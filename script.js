import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// Initialize Kaboom
kaboom();

// Load sprites (ensure the paths are correct)
loadBean()
loadSprite("rifle", "sprites/Icons/rifle1.png"); // Correct relative path to rifle sprite
loadSprite("inventory", "sprites/Icons/minecraft-inventory-png-4.jpg");
loadSprite("background", "sprites/other/create-vector-2d-game-background-for-your-game.png");
loadSprite("caseoh", "sprites/Icons/OIP.jpg");
loadSound("gunshot", "sounds/single-gunshot-6-101876_gUpzQ8DB.mp3")
loadSprite("title", "sprites/other/start-game-button-on-abstract-background-with-crystals-vector.jpg");
loadSound("music", "sounds/pixel-fight-8-bit-arcade-music-background-music-for-video-208775.mp3", {
    loop: true
});
loadSprite("boss", "sprite sheets/glitch_walker-removebg-preview.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        "idle": {
            from: 0,
            to: 0
        },
        "walk": {
            from: 0,
            to: 15,
            loop: true
        }
    }
})
loadSound("fart", "sprites/other/fart-83471.mp3")

play("music")

// Scene "one"
scene("one", () => {
    const SPEED = 300;
    const gravity = 1600;
    let bullets = []
    add([
        sprite("background", { width: width(), height: height()}),
        pos(0,0),
    ]);
    // Add player
    const player = add([
        sprite("bean"),
        pos(120, 80),
        area(),
        body()
    ]);

    const target = add([
        sprite("caseoh"),
        pos(500, 80),
        area()
    ]);


    target.onCollide("bullet", (bullet)=>{
        bullet.destroy()
        target.destroy()
        play("fart")
    })
    // Add ground
    add([
        rect(width(), height()/10),
        opacity(0),
        pos(0, height() - height()/6),
        area(),
        body({ isStatic: true })
    ]);

    // Add rifle
    const rifle = add([
        sprite("rifle"),
        anchor("center"),
        pos(20, 0),
        scale(.3),
        rotate(0)

    ]);

    // Add platform
    add([
        rect(200, 20),
        color(0, 46, 0),
        pos(190, 370),
        area(),
        body({ isStatic: true })
    ]);

    // Set gravity
    setGravity(gravity);

    // Player controls
    onKeyDown("a", () => {
        if (player.pos.x > 100)
            player.move(-SPEED, 0);
        rifle.flipX = true
    });

    onKeyDown("d", () => {
        if (player.pos.x < width())
            player.move(SPEED, 0);
        rifle.flipX = false
    });

    onKeyPress("w", () => {
        if (player.isGrounded()) {
            player.jump(800);
        }
    });

    onMousePress(()=>{
        play("gunshot")
        bullets.push([add([
            circle(3),
            pos(rifle.pos),
            color(0,0,0),
            area(),
            "bullet"
        ]), rifle.flipX])
    })


    // Update action
    onUpdate(() => {
        if (player.pos.x >= width() - 10) {
            go("two");
        }
        rifle.pos = player.pos;
        for(let i=0;i<bullets.length;i++){
            if(bullets[i][1] === true){
                bullets[i][0].move(-500, 0)
            }
            else{
                bullets[i][0].move(500, 0)
            }
            if(bullets[i][0].pos.x < 0 || bullets[i][0].pos.x > width()){
                bullets[i][0].destroy()
            }
        }
    });
});

// Scene "two"
scene("two", () => {
    const SPEED = 300;
    const gravity = 1600;
    let bullets = []
    let inventoryOpen = false;
    let i = add([
        sprite("inventory"),
        pos(0,0), 
        opacity(0)
    ]);

    add([
        sprite("background", { width: width(), height: height()}),
        pos(0,0),
    ]);

    // Add player
    const player = add([
        sprite("bean"),
        pos(120, 80),
        area(),
        body()
    ]);

    // Add ground
    add([
        rect(width(), height()/10),
        opacity(0),
        pos(0, height() - height()/6),
        area(),
        body({ isStatic: true })
    ]);

    // Add rifle
    const rifle = add([
        sprite("rifle"),
        anchor("center"),
        pos(20, 0),
        scale(.3),
        rotate(0)

    ]);

    // Add platform
    add([
        rect(100, 200),
        color(0, 0, 200),
        pos(190, 370),
        area(),
        body({ isStatic: true })
    ]);


    add([
        rect(100, 200),
        color(0, 0, 200),
        pos(300, 370),
        area(),
        body({ isStatic: true })
    ]);

    const b = add([
        sprite("boss"),
        pos(width()-200,0),
        area(),
        body()
    ])
    b.flipX = true
    b.play("walk")


    // Set gravity
    setGravity(gravity);

    // Player controls
    onKeyDown("a", () => {
        if (player.pos.x > 100)
            player.move(-SPEED, 0);
        rifle.flipX = true;
    });

    onKeyDown("d", () => {
        if (player.pos.x < width()-100)
            player.move(SPEED, 0);
        rifle.flipX = false;
    });

    onKeyPress("w", () => {
        if (player.isGrounded()) {
            player.jump(800);
        }
    });

    onMousePress(()=>{
        bullets.push([add([
            circle(3),
            pos(rifle.pos),
            color(0,0,0),
            area(),
            "bullet"
        ]), rifle.flipX])
    })

    onKeyPress("e", () => {
        if (inventoryOpen) {
            inventoryOpen = false
        }
        else{
            inventoryOpen = true
        }
    });
    b.onCollide("bullet", ()=>{
        b.destroy()
        play("fart")
    })
    // Update action
    onUpdate(() => {
        rifle.pos = player.pos;
        for(let i=0;i<bullets.length;i++){
            if(bullets[i][1] === true){
                bullets[i][0].move(-500, 0)
            }
            else{
                bullets[i][0].move(500, 0)
            }
            if(bullets[i][0].pos.x < 0 || bullets[i][0].pos.x > width()){
                bullets[i][0].destroy()
            }
        }
        b.move(-100, 0)
    });
});


// title scene
scene("title", ()=>{
    add([
        sprite("title", { width: width(), height: height()}),
        pos(0,0),
    ]);

    const submit_button = add([
        rect(width()/2.7, height()/7),
        pos(width()/3.1, height()/2.1),
        opacity(0),
        area(),
        "submit"
    ]);

    onClick("submit",()=>{
        go("one")
    })
})



// Start with scene "one"
go("title");
