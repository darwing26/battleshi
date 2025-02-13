"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
class Ship {
    constructor(size, isVertical) {
        this.size = size;
        this.hits = 0;
        this.isVertical = isVertical;
        this.positions = [];
    }
    isSunk() {
        return this.hits === this.size;
    }
}
exports.Ship = Ship;
