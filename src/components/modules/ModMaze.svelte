<script lang="ts">
	import { Maze, mazes } from '$lib/maze';
	import { onMount } from 'svelte';
	import { loseLife, updateModule, ModuleState, debug } from '../../lib/store';
	export let done = false;
	export let id: number;
	let position = [0, 0];
	let target = [5, 5];
	let shaking = false;
	let maze = new Maze(mazes[Math.floor(Math.random() * mazes.length)]);
	function move(direction: string) {
		if (maze.canMove(position, direction)) {
			if (direction == 'u') {
				position[0]--;
			}
			if (direction == 'd') {
				position[0]++;
			}
			if (direction == 'l') {
				position[1]--;
			}
			if (direction == 'r') {
				position[1]++;
			}
		} else {
			loseLife();
			shake();
		}
		if (position.join() == target.join()) {
			done = true;
			updateModule(id, undefined, ModuleState.DONE);
		}
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	onMount(async () => {
		const startingQuadrants = [
			[0, 3],
			[1, 2],
			[2, 1],
			[3, 0]
		];
		const quad = startingQuadrants[Math.floor(Math.random() * startingQuadrants.length)];
		let r = 3 * Math.floor(quad[0] / 2) + Math.floor(Math.random() * 3);
		let c = 3 * (quad[0] % 2) + Math.floor(Math.random() * 3);
		position = [r, c];
		r = 3 * Math.floor(quad[1] / 2) + Math.floor(Math.random() * 3);
		c = 3 * (quad[1] % 2) + Math.floor(Math.random() * 3);
		target = [r, c];
	});
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<button
			on:click={() => {
				move('u');
			}}>⬆️</button
		>
		<div class="flexr">
			<button
				on:click={() => {
					move('l');
				}}>⬅️</button
			>
			<div class="grid">
				{#each maze.grid as row, r}
					{#each row as cell, c}
						<div
							class="cell 
                            {debug ? maze.cellBorders(r, c) : ''}  
                            {maze.isLight(r, c) ? 'light' : ''}
                            "
						>
							{#if r == position[0] && c == position[1]}
								<div class="perso" />
							{:else if r == target[0] && c == target[1]}
								<div class="target" />
							{:else}
								<div class="empty" />
							{/if}
						</div>
					{/each}
				{/each}
			</div>
			<button
				on:click={() => {
					move('r');
				}}>➡️</button
			>
		</div>
		<button
			on:click={() => {
				move('d');
			}}>⬇️</button
		>
	</div>
</main>

<style>
	main {
		border-radius: 5px;
		padding: 10px;
	}

	.main_done {
		background-color: rgb(107, 107, 107);
		pointer-events: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		place-items: center;
		justify-content: center;
		gap: 0px;
		border: solid black 1px;
		border-radius: 5px;
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3em;
		height: 3em;
		box-sizing: border-box;
		border-radius: 5px;
	}

	.u {
		border-top: solid black 1px;
	}

	.d {
		border-bottom: solid black 1px;
	}

	.l {
		border-left: solid black 1px;
	}

	.r {
		border-right: solid black 1px;
	}

	.light {
		background-color: rgb(228, 228, 51);
	}

	.perso {
		background-color: rgb(0, 162, 255);
		border-radius: 50%;
		width: 50%;
		height: 50%;
	}

	.target {
		background-color: rgb(243, 52, 5);
		border-radius: 50%;
		width: 50%;
		height: 50%;
	}

	.empty {
		background-color: rgb(104, 87, 100);
		border-radius: 50%;
		width: 15%;
		height: 15%;
	}

	.flexc {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.flexr {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	button {
		padding: 10px;
		font-size: 1.5em;
		background-color: aliceblue;
		border-radius: 5px;
	}

	.shaking {
		animation: shake 0.3s;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
