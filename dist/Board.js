"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(' '));
        this.ships = [];
    }
    placeShip(ship, row, col) {
        if (this.canPlaceShip(ship, row, col)) {
            for (let i = 0; i < ship.size; i++) {
                if (ship.isVertical) {
                    this.grid[row + i][col] = 'S';
                    ship.positions.push({ row: row + i, col });
                }
                else {
                    this.grid[row][col + i] = 'S';
                    ship.positions.push({ row, col: col + i });
                }
            }
            this.ships.push(ship);
            return true;
        }
        return false;
    }
    canPlaceShip(ship, row, col) {
        for (let i = 0; i < ship.size; i++) {
            if (ship.isVertical) {
                if (row + i >= this.size || this.grid[row + i][col] !== ' ')
                    return false;
            }
            else {
                if (col + i >= this.size || this.grid[row][col + i] !== ' ')
                    return false;
            }
        }
        return true;
    }
    receiveAttack(row, col) {
        if (this.grid[row][col] === 'S') {
            this.grid[row][col] = 'X';
            const ship = this.ships.find(s => s.positions.some(p => p.row === row && p.col === col));
            if (ship) {
                ship.hits++;
                if (ship.isSunk()) {
                    console.log("¡Barco hundido!");
                }
                else {
                    console.log("¡Barco golpeado!");
                }
            }
            return true;
        }
        else if (this.grid[row][col] === ' ') {
            this.grid[row][col] = 'O';
            console.log("Agua.");
            return false;
        }
        return false;
    }
    display() {
        console.log("   " + Array.from({ length: this.size }, (_, i) => i.toString().padStart(2, ' ')).join(' '));
        for (let i = 0; i < this.size; i++) {
            console.log(String.fromCharCode(65 + i) + "  " + this.grid[i].join('  '));
        }
    }
    displayForOpponent() {
        console.log("   " + Array.from({ length: this.size }, (_, i) => i.toString().padStart(2, ' ')).join(' '));
        for (let i = 0; i < this.size; i++) {
            const row = this.grid[i].map(cell => {
                if (cell === 'S') {
                    return ' '; // Oculta los barcos
                }
                return cell; // Muestra 'X' o 'O'
            });
            console.log(String.fromCharCode(65 + i) + "  " + row.join('  '));
        }
    }
}
exports.Board = Board;
