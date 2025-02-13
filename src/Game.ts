import { Board } from './Board';
import { Ship } from './Ship';
import * as readlineSync from 'readline-sync';

export class Game {
    playerBoard: Board;
    computerBoard: Board;
    shipsToPlace: number[];

    constructor() {
        this.playerBoard = new Board(16);
        this.computerBoard = new Board(16);
        this.shipsToPlace = [5, 4, 3, 3, 2, 1];
    }

    start(): void {
        this.placePlayerShips();
        this.placeComputerShips();
        this.play();
    }

    placePlayerShips(): void {
        for (const size of this.shipsToPlace) {
            let placed = false;
            while (!placed) {
                const position = this.getValidPosition(`Introduce la posición inicial para un barco de tamano ${size} (ej. A1):`);
                const orientation = this.getValidOrientation("¿Vertical? (s/n):");
                const row = position.charCodeAt(0) - 65;
                const col = parseInt(position.slice(1), 10);
                const ship = new Ship(size, orientation);
                placed = this.playerBoard.placeShip(ship, row, col);
                if (!placed) {
                    console.log("Posicion invalida. Intenta de nuevo.");
                }
            }
        }
    }

    placeComputerShips(): void {
        for (const size of this.shipsToPlace) {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 16);
                const col = Math.floor(Math.random() * 16);
                const orientation = Math.random() < 0.5;
                const ship = new Ship(size, orientation);
                placed = this.computerBoard.placeShip(ship, row, col);
            }
        }
    }

    play(): void {
        while (true) {
            console.log("Tu tablero:");
            this.playerBoard.display();
            console.log("Tablero de la computadora:");
            this.computerBoard.displayForOpponent(); 

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

    private getValidPosition(message: string): string {
        let position: string;
        do {
            position = readlineSync.question(message).toUpperCase();
            if (!/^[A-P]\d{1,2}$/.test(position)) {
                console.log("Formato de posición invalido. Usa el formato A1, B2, etc.");
            }
        } while (!/^[A-P]\d{1,2}$/.test(position));
        return position;
    }

    private getValidOrientation(message: string): boolean {
        let orientation: string;
        do {
            orientation = readlineSync.question(message).toLowerCase();
            if (!/^[sn]$/.test(orientation)) {
                console.log("Debes ingresar 's' para vertical o 'n' para horizontal.");
            }
        } while (!/^[sn]$/.test(orientation));
        return orientation === 's';
    }
}