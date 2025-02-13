"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Board_1 = require("./Board");
const Ship_1 = require("./Ship");
const readlineSync = __importStar(require("readline-sync"));
class Game {
    constructor() {
        this.playerBoard = new Board_1.Board(16);
        this.computerBoard = new Board_1.Board(16);
        this.shipsToPlace = [5, 4, 3, 3, 2, 1];
    }
    start() {
        this.placePlayerShips();
        this.placeComputerShips();
        this.play();
    }
    placePlayerShips() {
        for (const size of this.shipsToPlace) {
            let placed = false;
            while (!placed) {
                const position = this.getValidPosition(`Introduce la posición inicial para un barco de tamano ${size} (ej. A1):`);
                const orientation = this.getValidOrientation("¿Vertical? (s/n):");
                const row = position.charCodeAt(0) - 65;
                const col = parseInt(position.slice(1), 10);
                const ship = new Ship_1.Ship(size, orientation);
                placed = this.playerBoard.placeShip(ship, row, col);
                if (!placed) {
                    console.log("Posicion invalida. Intenta de nuevo.");
                }
            }
        }
    }
    placeComputerShips() {
        for (const size of this.shipsToPlace) {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 16);
                const col = Math.floor(Math.random() * 16);
                const orientation = Math.random() < 0.5;
                const ship = new Ship_1.Ship(size, orientation);
                placed = this.computerBoard.placeShip(ship, row, col);
            }
        }
    }
    play() {
        while (true) {
            console.log("Tu tablero:");
            this.playerBoard.display();
            console.log("Tablero de la computadora:");
            this.computerBoard.displayForOpponent(); // Usar displayForOpponent aquí
            const playerMove = this.getValidPosition("Introduce tu movimiento (ej. A1):");
            const row = playerMove.charCodeAt(0) - 65;
            const col = parseInt(playerMove.slice(1), 10);
            if (this.computerBoard.receiveAttack(row, col)) {
                if (this.computerBoard.ships.every(ship => ship.isSunk())) {
                    console.log("¡Ganaste!");
                    break;
                }
            }
            const computerRow = Math.floor(Math.random() * 16);
            const computerCol = Math.floor(Math.random() * 16);
            if (this.playerBoard.receiveAttack(computerRow, computerCol)) {
                if (this.playerBoard.ships.every(ship => ship.isSunk())) {
                    console.log("¡La computadora gano!");
                    break;
                }
            }
        }
    }
    getValidPosition(message) {
        let position;
        do {
            position = readlineSync.question(message).toUpperCase();
            if (!/^[A-P]\d{1,2}$/.test(position)) {
                console.log("Formato de posición invalido. Usa el formato A1, B2, etc.");
            }
        } while (!/^[A-P]\d{1,2}$/.test(position));
        return position;
    }
    getValidOrientation(message) {
        let orientation;
        do {
            orientation = readlineSync.question(message).toLowerCase();
            if (!/^[sn]$/.test(orientation)) {
                console.log("Debes ingresar 's' para vertical o 'n' para horizontal.");
            }
        } while (!/^[sn]$/.test(orientation));
        return orientation === 's';
    }
}
exports.Game = Game;
