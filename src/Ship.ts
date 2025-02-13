export class Ship {
    size: number;
    hits: number;
    isVertical: boolean;
    positions: { row: number; col: number }[];

    constructor(size: number, isVertical: boolean) {
        this.size = size;
        this.hits = 0;
        this.isVertical = isVertical;
        this.positions = [];
    }

    isSunk(): boolean {
        return this.hits === this.size;
    }
}