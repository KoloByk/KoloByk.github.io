function Entity(image, quadrant, radius) {
    this.radius = radius || image.width / 2;
    this.position = this.randomPosition(quadrant);
    this.direction = new Vector(0, 0);
    this.image = image;
    this.speed = Math.randomIntBetween(20, 130);
    this.scaleNumber = DEFAULT_SCALE;
    this.coordinateCorrected = 0;
}

Entity.prototype.update = function () {
    var dV = this.direction.copy().normalize().multiplyScalar(deltaTime * this.speed);
    this.position.add(dV);
    this.canvasSizeCondition();
};

Entity.prototype.canvasSizeCondition = function () {
    this.coordinateCorrected = this.correctCoordinates();
    if (this.position.x > screenWidth + this.coordinateCorrected - this.radius * 2) {
        this.position.x = screenWidth + this.coordinateCorrected - this.radius * 2;
    }
    else if (this.position.x <= this.coordinateCorrected) {
        this.position.x = this.coordinateCorrected;
    }

    if (this.position.y > screenHeight + this.coordinateCorrected - this.radius * 2) {
        this.position.y = screenHeight + this.coordinateCorrected - this.radius * 2;
    } else if (this.position.y <= this.coordinateCorrected) {
        this.position.y = this.coordinateCorrected;
    }

};

Entity.prototype.correctCoordinates = function () {
    return (this.image.width / 2) * (this.scaleNumber - 1);
};

Entity.prototype.findCenterPosition = function () {
    return this.position.copy().add(new Vector(this.image.width / 2, this.image.height / 2));
};

Entity.prototype.randomPosition = function (quadrant) {
    var x, y;

    switch (quadrant) {
        case 1:
        default :
            x = Math.randomIntBetween(0, screenWidth / 2 - this.radius * 3);
            y = Math.randomIntBetween(0, screenHeight / 2 - this.radius * 3);
            break;
        case 2:
            x = Math.randomIntBetween(screenWidth / 2 + this.radius * 3, screenWidth);
            y = Math.randomIntBetween(0, screenHeight / 2 - this.radius * 3);
            break;
        case 3:
            x = Math.randomIntBetween(0, screenWidth / 2 - this.radius * 3);
            y = Math.randomIntBetween(screenHeight / 2 + this.radius * 3, screenHeight);
            break;
        case 4:
            x = Math.randomIntBetween(screenWidth / 2 + this.radius * 3, screenWidth);
            y = Math.randomIntBetween(screenHeight / 2 + this.radius * 3, screenHeight);
            break;
    }

    return new Vector(x, y);
};