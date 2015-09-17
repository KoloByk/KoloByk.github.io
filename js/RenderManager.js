// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas, context, currentTime, deltaTime, player, startTime, timer, pause, div, p, bonusEntity1;
var entities = [];

var imgNames = ['resistance.png', 'speed.png', 'scale.png', 'player.png'];
var imagesLocation = 'resources/';
var images = {};
var screenWidth = 1024;
var screenHeight = 576;

var i = 0;
imgNames.forEach(function (img) {
    var image = new Image();

    image.onload = function () {
        i++;
        if (i === imgNames.length) {
            init();
        }
    };

    image.src = imagesLocation + img;
    img = (img.split('.'))[0];
    images[img] = image;
});

createDOMElements();

function init() {
    currentTime = Date.now();
    player = new Player(images['player']);

    var circleEntity1 = new RandomAttackEntity();
    var circleEntity2 = new AttackPlayerEntity();
    var circleEntity3 = new AttackPlayerEntity();
    var circleEntity4 = new AttackPlayerEntity();
    var circleEntity5 = new RandomAttackEntity();
    var circleEntity6 = new RandomAttackEntity();
    var circleEntity7 = new RandomAttackEntity();
    var circleEntity8 = new AttackPlayerEntity();
    var circleEntity9 = new AttackPlayerEntity();
    var circleEntity10 = new AttackPlayerEntity();
    var circleEntity11 = new AttackPlayerEntity();

    bonusEntity1 = new BonusEntity(images['scale'], BONUS_ITEMS_ACTIONS.scale);
    var bonusEntity3 = new BonusEntity(images['resistance'], BONUS_ITEMS_ACTIONS.resist);
    var bonusEntity2 = new BonusEntity(images['speed'], BONUS_ITEMS_ACTIONS.speed);

    entities.push(player, circleEntity1, circleEntity2, circleEntity3, circleEntity4, circleEntity5, circleEntity6,
        circleEntity7, circleEntity8, circleEntity9, circleEntity10, circleEntity11, bonusEntity1, bonusEntity2, bonusEntity3);

    startTime = Date.now();
}

animate();

function animate() {
    deltaTime = (Date.now() - currentTime) / 1000;
    timer = (Date.now() - startTime) / 1000 || 0;
    currentTime = Date.now();
    requestAnimFrame(animate);
    action();
}

function update() {
    entities.forEach(function (entity) {
        entity.update();
        collisionUpdate(entity);
    });
}

function draw() {
    context.clearRect(0, 0, screenWidth, screenHeight);
    entities.forEach(function (entity) {
        if (!entity.disabled) {
            context.save();

            if (entity.opacity < 1) {
                context.globalAlpha = entity.opacity;
            }

            context.translate(entity.position.x + entity.image.width / 2,
                entity.position.y + entity.image.height / 2);
            context.scale(entity.scaleNumber, entity.scaleNumber);
            context.translate(-(entity.position.x + entity.image.width / 2),
                -(entity.position.y + entity.image.height / 2));
            context.drawImage(entity.image, entity.position.x, entity.position.y);
            context.restore();
        }
    });
    context.font = '22px serif';
    context.fillText('Time: ' + Math.floor(timer), 5, 18);
}

function action() {
    if (pause) {
        return;
    }
    update();
    draw();
}

function collisionUpdate(mob) {
    if (!(mob instanceof Player)) {
        var dx = (player.position.x - player.correctCoordinates() + player.radius) - (mob.position.x - mob.correctCoordinates() + mob.radius);
        var dy = (player.position.y - player.correctCoordinates() + player.radius) - (mob.position.y - mob.correctCoordinates() + mob.radius);
        var distance = Math.sqrt(dx * dx + dy * dy);

        if ((distance <= (player.radius + mob.radius)) && !mob.disabled) {
            if (mob.collisionCallback) {
                mob.disable();
                mob.collisionCallback();
            }
            else {
                displayRecordMessage();
            }
        }
    }
}

function createDOMElements() {
    var btn = document.createElement('button');
    canvas = document.createElement('canvas');
    div = document.createElement('div');
    p = document.createElement('p');
    context = canvas.getContext('2d');

    div.style.top = (/*window.innerHeight*/ screenHeight - 116) / 2 + 'px';
    div.style.left = (/*window.innerWidth*/ document.body.clientWidth - 250) / 2 + 'px';

    btn.innerHTML = 'Restart';
    btn.addEventListener('click', restart, false);

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    div.appendChild(p);
    div.appendChild(btn);

    document.body.appendChild(canvas);
    document.body.appendChild(div);
}

function restart() {

    pause = false;
    entities.length = 0;
    div.style.display = 'none';
    timer = 0;
    init();
}

function displayRecordMessage() {
    if (!player.resistance) {
        pause = true;
        div.style.display = 'block';
        p.innerHTML = 'Your result: ' + Math.floor(timer) + ' sec.';
    }
}
