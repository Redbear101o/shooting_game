import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// Initialize Kaboom
kaboom();

// Load sprites (ensure the paths are correct)
loadBean()
loadSprite("rifle", "./sprites/Icons/rifle1.png"); // Correct relative path to rifle sprite
loadSprite("inventory", "./sprites/Icons/minecraft-inventory-png-4.jpg");
loadSprite("background", "./sprites/Icons/your mom.jpg");

// Scene "one"
scene("one", () => {
    const SPEED = 300;
    const gravity = 1600;
    let bullets = []
    add([
        sprite("background"),
        pos(0,0),
        scale(3)
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
        rect(width(), 40),
        color(0, 0, 0),
        pos(0, height() - 40),
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
        player.move(-SPEED, 0);
        rifle.flipX = true
    });

    onKeyDown("d", () => {
        player.move(SPEED, 0);
        rifle.flipX = false
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
            color(0,0,0)
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
                bullets[i][0].move(-100, 0)
            }
            else{
                bullets[i][0].move(100, 0)
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
    let inventoryOpen = false;
    let i = add([
        sprite("inventory"),
        pos(0,0), 
        opacity(0)
    ]);

    add([
        sprite("background"),
        pos(0,0),
        scale(3)
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
        rect(width(), 40),
        color(0, 0, 0),
        pos(0, height() - 40),
        area(),
        body({ isStatic: true })
    ]);

    // Add rifle
    const rifle = add([
        sprite("rifle"),
        pos(1, 2),
        scale(1.5),
        rotate(45)

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


    // Set gravity
    setGravity(gravity);

    // Player controls
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        rifle.flipX = true;
    });

    onKeyDown("d", () => {
        player.move(SPEED, 0);
        rifle.flipX = false;
    });

    onKeyPress("w", () => {
        if (player.isGrounded()) {
            player.jump(800);
        }
    });

    onKeyPress("e", () => {
        if (inventoryOpen) {
            inventoryOpen = false
        }
        else{
            inventoryOpen = true
        }
    });

    // Update action
    onUpdate(() => {
        rifle.pos = player.pos;
        
    });
});

// Start with scene "one"
go("one");
