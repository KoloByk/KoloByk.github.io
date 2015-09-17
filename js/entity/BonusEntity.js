var BONUS_ITEMS_ACTIONS = {
    speed: function () {
        player.speed = BONUS_SPEED;
        setTimeout(function () {
            player.speed = PLAYER_DEFAULT_SPEED;
        }, BONUS_DURATION);
    },

    scale: function () {
        player.scaleNumber = BONUS_SCALE;
        player.radius = player.image.width / 2 * player.scaleNumber;
        setTimeout(function () {
            player.scaleNumber = DEFAULT_SCALE;
            player.radius = player.image.width / 2 * player.scaleNumber;
        }, BONUS_DURATION);
    },

    resist: function () {
        player.resistance = true;
        player.opacity = BONUS_OPACITY;
        setTimeout(function () {
            player.opacity = PLAYER_DEFAULT_OPACITY;
            player.resistance = false;
        }, BONUS_DURATION);
    }
};

function BonusEntity(image, collisionCallback) {
    BonusEntity.parent.prototype.constructor.call(this, image);
    this.position = new Vector(Math.random() * (screenWidth - this.image.width),
        Math.random() * (screenHeight - this.image.height));
    this.duration = Math.randomIntBetween(BONUS_ITEM_DURATION_TIME_MIN, BONUS_ITEM_DURATION_TIME_MAX);
    this.timeCreate = Date.now();
    this.disabled = true;
    this.timeAppeared = Math.randomIntBetween(BONUS_ITEM_TIME_APPEARED_MIN, BONUS_ITEM_TIME_APPEARED_MAX);
    this.collisionCallback = collisionCallback;
    this.scaleNumber = DEFAULT_SCALE;
    this.scaleStep = SCALE_STEP;
    this.lifetime = 0;
    this.radius = image.width / 2;
}

BonusEntity.extends(Entity);

BonusEntity.prototype.update = function () {
    this.lifetime = Date.now() - this.timeCreate;
    if (this.lifetime > this.timeAppeared) {
        this.disabled = false;

        this.scale();

        if (this.timeAppeared + this.duration <= this.lifetime) {
            this.disable();
        }
    }
};

BonusEntity.prototype.disable = function () {
    this.disabled = true;
    this.duration = Math.randomIntBetween(BONUS_ITEM_DURATION_TIME_MIN, BONUS_ITEM_DURATION_TIME_MAX);
    this.position = new Vector(Math.random() * (screenWidth - this.image.width),
        Math.random() * (screenHeight - this.image.height));
    this.timeAppeared = Math.randomIntBetween(BONUS_ITEM_TIME_APPEARED_MIN, BONUS_ITEM_TIME_APPEARED_MAX);
    this.timeCreate = Date.now();
};

BonusEntity.prototype.scale = function () {
    this.scaleNumber += this.scaleStep;
    if (this.scaleNumber < BONUS_ITEM_MIN_SCALE || this.scaleNumber > DEFAULT_SCALE) {
        this.scaleStep = -this.scaleStep;
    }
};


