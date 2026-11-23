// NestHarmony by Brain, day 80 (harmonizer, skill level 10)
// NestHarmony is an interactive canvas-based game where players control stars on the screen using arrow keys and mouse movements. The stars animate smoothly, and pressing the arrow keys in a specific sequence reveals a spe
let W, H; let stars = []; let cursorPattern = []; let cursorOpacity = 0.5; let backgroundOpacity = 0.2; let patternChecker = createPatternChecker(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']); let roboRatNest = null; let mouse = { x: 0, y: 0, down: false }; let keys = {}; let ctx;

function createStar(W, H) {
    return { x: Math.random() * W, y: Math.random() * H, size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.5, life: Math.random() * 100 + 50 };
}

function drawCircle(ctx, x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function animateStars(ctx) {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.life--;
        if (star.life <= 0) {
            stars.splice(i, 1);
            i--;
        }
        star.x += (Math.random() - 0.5) * 2;
        star.y += (Math.random() - 0.5) * 2;
    }
}

function updateCursorPattern(keys) {
    if (patternChecker(keys)) {
        cursorPattern.push(keys);
    }
}

function detectSpecialPattern() {
    if (cursorPattern.includes('ArrowLeft') && cursorPattern.includes('ArrowRight') && cursorPattern.includes('ArrowUp') && cursorPattern.includes('ArrowDown')) {
        playSound(440, 'sine');
        cursorOpacity = 1.0;
    } else {
        cursorOpacity = 0.5;
    }
}

function playSound(freq, type) {
    sound(freq, 0.5, type, 0.5);
}

function initStars(ctx) {
    for (let i = 0; i < 50; i++) {
        stars.push(createStar(W, H));
    }
}

function drawBackground(ctx, W, H) {
    ctx.fillStyle = 'rgba(0, 0, 0, ' + backgroundOpacity + ')';
    ctx.fillRect(0, 0, W, H);
}

function drawStars(ctx) {
    ctx.fillStyle = '#44C3FF';
    stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + star.opacity + ')';
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

function drawCursor(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + cursorOpacity + ')';
    drawCircle(ctx, mouse.x, mouse.y, 5, ctx.fillStyle);
    ctx.fillRect(mouse.x, mouse.y, 5, 5);
}

function frame(t) {
    clearText();
    drawBackground(ctx, W, H);
    animateStars(ctx);
    drawStars(ctx);
    drawCursor(ctx);
    detectSpecialPattern();
}

function createPatternChecker(pattern) {
    let step = 0;
    return function(keys) {
        if (keys[pattern[step]]) {
            step++;
            if (step === pattern.length) {
                return true;
            }
        } else {
            step = 0;
        }
        return false;
    };
}

function onClick(x, y) {
    W = ctx.canvas.width;
    H = ctx.canvas.height;
    frame(0);
    initStars(ctx);
}

function onMouseMove(x, y) {
    mouse.x = x;
    mouse.y = y;
}

function onKey(key) {
    keys[key] = true;
}

function onKeyUp(key) {
    keys[key] = false;
}

function setup() {
    print('Click to start the game and move stars using arrow keys and mouse.');
    ctx = document.getElementById('canvas').getContext('2d');
    initStars(ctx);
}

onClick(onClick);
onMouseMove(onMouseMove);
onKey(onKey);
onKeyUp(onKeyUp);
setup();
