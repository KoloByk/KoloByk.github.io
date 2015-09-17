function Vector(x, y) {
    this.x = x;
    this.y = y;
}

/**
 *
 * @param {Vector} vector
 * @returns {Vector}
 */
Vector.prototype.add = function (vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
};

/**
 *
 * @param s
 * @returns {Vector}
 */
Vector.prototype.multiplyScalar = function (s) {
    this.x *= s;
    this.y *= s;

    return this;
};

/**
 *
 * @returns {Vector}
 */
Vector.prototype.copy = function () {
    return new Vector(this.x, this.y);
};

/**
 *
 * @param {Vector} vector
 * @returns {Vector}
 */
Vector.prototype.sub = function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
};

Vector.prototype.normalize = function () {
    var mag = this.magnitude();

    if (mag === 0) {
        this.x = 0;
        this.y = 0;
    } else {
        this.x = this.x / mag;
        this.y = this.y / mag;
    }
    return this;
};

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};