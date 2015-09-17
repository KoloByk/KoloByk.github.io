Function.prototype.extends = function (parentclass) {
    this.prototype = Object.create(parentclass.prototype);
    this.prototype.constructor = this;
    this.parent = parentclass;
};

Math.randomIntBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

