const U = 0x0001;
const R = 0x0010;
const D = 0x0100;
const L = 0x1000;

type GridData = {
    grid: number[][];
    lights: number[][];
};

const M1 = {grid:[
    [U+L, U+D, U+R, U+L, U+D, U+R+D],
    [R+L, U+L, R+D, D+L,U+D, U+R],
    [R+L, L+D, U+R, U+L, U+D, R],
    [R+L, U+D+L, D, D+R, U+D+L, R],
    [L, U+D, U+R, U+L, U+R+D, R+L],
    [D+L, U+R+D, D+L, R+D, U+D+L, R+D],
], lights: [[1,0],[2,5]]} as  GridData;

const M2 = {grid:[
    [L+U+D, U, U+R+D, U+L, U, U+R+D],
    [L+U, R+D, U+L, R+D, L+D, U+R],
    [L+R, U+L, R+D, U+L, U+D, R],
    [L, R+D, U+L, R+D, U+R+L, L+R],
    [L+R, U+R+L, L+R, L+U, D+R, L+R],
    [L+D+R, L+D, D+R, L+D, U+D, D+R],
], lights: [[1,4],[3,1]]} as  GridData;

const M3 = {grid:[
    [L+U, U+D, U+R, U+R+L, U+L, U+R],
    [L+D+R, L+U+R, L+R, L+D, D+R, L+R],
    [L+U, R, L+R, L+U, U+R, L+R],
    [L+R, L+R, L+R,L+R, L+R, L+R],
    [L+R, L+D, D+R,L+R, L+R, L+R],
    [L+D, U+D, U+D, R+D, L+D, R+D],
], lights: [[3,3],[3,5]]} as  GridData;

const M4 = {grid:[
    [L+U, U+R, U+L+D, U+D, U+D, U+R],
    [L+R, L+R, L+U, U+D, U+D, R],
    [L+R, L+D, D+R, L+U, U+R+D, L+R],
    [L+R, L+U+D, U+D, D, U+D, R],
    [L, U+D, U+D, U+D, U+R, L+R],
    [L+D, U+D, U+D+R, U+D+L, R+D, L+D+R],
], lights: [[0,0],[3,0]]} as  GridData;

const M5 = {grid:[
    [L+U+D, U+D, U+D, U+D, U, U+R],
    [L+U, U+D, U+D, U, D+R, L+D+R],
    [L, U+R, U+L+D, R+D, L+U, U+R],
    [L+R, L+D, U+D, U+R, L+R+D, L+R],
    [L+R, L+U, U+D, D, U+D+R, L+R],
    [L+R+D, D+L, U+D, U+D, U+D, D+R],
], lights: [[2,4],[5,3]]} as  GridData;

const M6 = {grid:[
    [L+U+R, U+L, U+R, L+U+D, U, U+R],
    [L+R, L+R, L+R, L+U, R+D, L+R],
    [L, D+R, L+R+D, L+R, L+U, R+D],
    [L+D, U+R, L+U, R, L+R, U+L+R],
    [L+U, D+R, L+R+D, L+R, L+D, R],
    [L+D, U+D, U+D, R+D, L+U+D, D+R],
], lights: [[0,5],[4,2]]} as  GridData;

const M7 = {grid:[
    [L+U, U+D, U+D, U+R, L+U, U+R],
    [L+R, L+U, U+D+R, L+D, D+R, L+R],
    [L+D, D+R, L+U, D+R+U, L+U, D+R],
    [L+U, U+R, L, U+D, D+R, L+U+R],
    [L+R, L+R+D, L+D, U+D, U+R, L+R],
    [L+D, U+D, U+D, U+D, D, D+R],
], lights: [[0,1],[5,1]]} as  GridData;

const M8 = {grid:[
    [L+U+R, L+U, U+D, U+R, L+U, U+R],
    [L, D, U+R+D, L+D, D+R, L+R],
    [L+R, U+L, U+D, U+D, U+R, L+R],
    [L+R, L+D, U+R, L+U+D, D, D+R],
    [L+R, L+R+U, L+D, U+D, U+D, U+D+R],
    [L+D, D, U+D, U+D, U+D, U+D+R],
], lights: [[0,3],[3,2]]} as  GridData;

const M9 = {grid:[
    [L+U+R, L+U, U+D, U+D, U, U+R],
    [L+R, L+R, L+U, U+R+D, L+R, L+R],
    [L, D, D+R, L+U, R+D, L+R],
    [L+R, L+R+U, L+U, D+R, D+L+U, R],
    [L+R, L+R, L+R, L+U, U+R, L+D+R],
    [L+D, D+R, L+D, D+R, L+D, U+R+D],
], lights: [[1,2],[4,0]]} as  GridData;

export const mazes = [M1, M2, M3, M4, M5, M6, M7, M8, M9];


export class Maze {
    lights: number[][]
    grid: number[][];

    cellBorders(r:number, c:number): string {
        let result = "";
        if (this.grid[r][c] & U) result += 'u ';
        if (this.grid[r][c] & R) result += 'r ';
        if (this.grid[r][c] & D) result += 'd ';
        if (this.grid[r][c] & L) result += 'l ';

        return result;
    }

    isLight(r:number, c:number): boolean{
        for (let i = 0; i < this.lights.length; i++) {
            if (this.lights[i][0] == r && this.lights[i][1] == c) {
                return true;
            }
        }
        return false;
    }

    canMove(position:number[], direction:string){
        if (direction == 'u' && this.grid[position[0]][position[1]] & U){
                return false;
            }
        if (direction == 'd' && this.grid[position[0]][position[1]] & D){
                return false;
            }
        if (direction == 'l' && this.grid[position[0]][position[1]] & L){
                return false;
            }
        if (direction == 'r' && this.grid[position[0]][position[1]] & R){
                return false;
            }
        return true;
    }

    constructor(grid: GridData){
        this.grid = grid.grid;
        this.lights = grid.lights;
    }
}