let playerState = "idle"
//con esta variable controlamos el dropdown del HTML 
const dropdown = document.getElementById("animation")
dropdown.addEventListener("change", function (e) {
    playerState = e.target.value;
})
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
// en esta variable llamamos al src del personaje 
playerImage.src = 'shadow_dog.png';

const spriteWidth = 575;

const spriteHeight = 523;



let gameFrame = 0;

const staggerFrames = 5;

const spriteAnimations = [];
// estados y sprites de la animación 
const animationStates = [
    {
        name: "idle",
        sprites: 7
    }
    , {
        name: "jump",
        sprites: 7
    }
    , {
        name: "fall",
        sprites: 7
    }
    , {
        name: "run",
        sprites: 9
    }
    , {
        name: "dizzy",
        sprites: 11
    }
    , {
        name: "sit",
        sprites: 5
    }
    , {
        name: "roll",
        sprites: 7
    }
    , {
        name: "bite",
        sprites: 7
    }
    , {
        name: "ko",
        sprites: 12
    }
    , {
        name: "getHit",
        sprites: 4
    }

];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    //loop para calcular animación 
    for (let j = 0; j < state.sprites; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY })
    }
    spriteAnimations[state.name] = frames;
});
// funcion para animar 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();