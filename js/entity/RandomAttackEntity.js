function RandomAttackEntity() {
    this.color = RANDOM_ATTACK_ENTITY_COLOR;
    this.radius = Math.randomIntBetween(ENTITY_RADIUS_MIN, ENTITY_RADIUS_MAX);
    this.quadrant = Math.randomIntBetween(1, 4);
    RandomAttackEntity.parent.prototype.constructor.call(this, this.create(this.radius, this.color), this.quadrant);
    this.interval = Math.randomIntBetween(RANDOM_ATTACK_ENTITY_INTERVAL_MIN, ENTITY_INTERVAL_MAX);
    this.timeCreate = Date.now();
}

RandomAttackEntity.extends(Entity);

RandomAttackEntity.prototype.create = function (radius, color) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    c.width = radius * 2;
    c.height = radius * 2;

    ctx.beginPath();
    ctx.arc(radius, radius, radius - 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    return c;
};

RandomAttackEntity.prototype.update = function () {
    if ((currentTime - this.timeCreate) > this.interval) {
        this.direction = new Vector(Math.randomIntBetween(-screenWidth, screenWidth),
            Math.randomIntBetween(-screenHeight, screenHeight));
        this.timeCreate = Date.now();
    }
    this.borderCorrection();

    var dV = this.direction.copy().normalize().multiplyScalar(deltaTime * this.speed);
    this.position.add(dV);

    this.canvasSizeCondition();
};

RandomAttackEntity.prototype.borderCorrection = function () {
    if (this.position.x > screenWidth - this.image.width || this.position.y > screenHeight - this.image.height
        || this.position.x <= 0 || this.position.y <= 0) {
        this.direction = new Vector(screenWidth / 2, screenHeight / 2);
    }
};


