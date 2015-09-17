function Player(image) {
    Player.parent.prototype.constructor.call(this, image);
    this.position = new Vector((screenWidth - image.width) / 2, (screenHeight - image.height) / 2);
    this.speed = PLAYER_DEFAULT_SPEED;
    this.resistance = false;
    this.scaleNumber = DEFAULT_SCALE;
    this.opacity = PLAYER_DEFAULT_OPACITY;
}

Player.extends(Entity);

function onKeydown(evt) {

    switch (evt.keyCode) {
        // Left arrow.
        case 37:
            player.direction.x = -1;
            break;
        // Right arrow.
        case 39:
            player.direction.x = 1;
            break;
        // Down arrow
        case 40:
            player.direction.y = 1;
            break;
        // Up arrow
        case 38:
            player.direction.y = -1;
            break;
    }
}

function onKeyup(evt) {
    switch (evt.keyCode) {
        // Left arrow.
        case 37:
            player.direction.x = 0;
            break;
        // Right arrow.
        case 39:
            player.direction.x = 0;
            break;
        // Down arrow
        case 40:
            player.direction.y = 0;
            break;
        // Up arrow
        case 38:
            player.direction.y = 0;
            break;
    }
}

window.addEventListener('keydown', onKeydown, false);
window.addEventListener('keyup', onKeyup, false);

