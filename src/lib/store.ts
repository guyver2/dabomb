import { writable } from 'svelte/store';

export const seed = writable(123456);
export const lives = writable(5);
export const maxLives = writable(5);
export const duration = writable(100*60);
export const debug = true;


export enum ModuleState {
    PENDING,
    DONE,
    FAILED,
}

export enum GameState {
    PENDING,
    WIN,
    LOSE,
}

export class Module {
    id: number;
    name: string;
    state: ModuleState;
    
    constructor(id=0, name="default", state=ModuleState.PENDING) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}

export const gameState = writable(GameState.PENDING);
export const modules = writable<Module[]>([]);


export function registerModule(module:Module) {
    modules.update(items => [...items, module]);
}

function checkForWinCondition(modules: Module[]){
    let win = true;
    for (const mod of modules) {
        if(mod.state != ModuleState.DONE) {
            win = false;
            break;
        }
    }
    if (win)
    gameState.update(() => GameState.WIN);
}

export function updateModule(id: number, name?: string, state?: ModuleState) {
    modules.update(items => {
        items.forEach(module => {
            if(module.id == id){
                module.name = name || module.name;
                module.state = state || module.state;
            }
        });
        checkForWinCondition(items);
        return items;
    })
}

export function loseLife() {
    lives.update((l) => l - 1);
}

export function setTimer(t:number) {
    duration.set(t);
}