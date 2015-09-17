function AttackPlayerEntity() {
    this.color = PLAYER_ATTACK_ENTITY_COLOR;
    this.radius = Math.randomIntBetween(ENTITY_RADIUS_MIN, ENTITY_RADIUS_MAX);
    this.quadrant = Math.randomIntBetween(1, 4);
    AttackPlayerEntity.parent.prototype.constructor.call(this, this.create(this.radius, this.color), this.quadrant);
    this.interval = Math.randomIntBetween(PLAYER_ATTACK_ENTITY_INTERVAL_MIN, ENTITY_INTERVAL_MAX);
    this.timeCreate = Date.now();
}

AttackPlayerEntity.extends(Entity);

AttackPlayerEntity.prototype.create = function (radius, color) {
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

AttackPlayerEntity.prototype.update = function () {
    if (currentTime - this.timeCreate > this.interval) {
        this.direction = player.findCenterPosition().copy().sub(this.findCenterPosition());
        this.timeCreate = Date.now();
    }

    var dV = this.direction.copy().normalize().multiplyScalar(deltaTime * this.speed);
    this.position.add(dV);
    this.canvasSizeCondition();
};

