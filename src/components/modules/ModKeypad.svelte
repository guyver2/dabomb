<script lang="ts">
	import { seed, loseLife, updateModule, ModuleState } from '../../lib/store';
	export let done = false;
	export let id: number;
	let keys = ['🐵', '🐶', '🦊', '🐱', '🦁', '🦄', '🐮', '🐷', '🐻'];
	let guess = '';
	const password = '🦄🦄🦄🦄';
	let shaking = false;

	function shuffle() {
		keys = keys.sort((a, b) => 0.5 - Math.random());
	}

	function batches(values: String[]): String[][] {
		return [
			[values[0], values[1], values[2]],
			[values[3], values[4], values[5]],
			[values[6], values[7], values[8]]
		];
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	function add(val: String) {
		shuffle();
		if (guess.length < password.length) {
			const temp_guess = guess + val;
			if (!password.startsWith(temp_guess)) {
				loseLife();
				shake();
			} else {
				guess = temp_guess;
			}
		}
		if (guess == password) {
			done = true;
			updateModule(id, undefined, ModuleState.DONE);
		}
	}
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<div class="title">
			<input type="text" value={guess} readonly />
		</div>
		{#each batches(keys) as batch, i}
			<div class="flexr">
				{#each batch as val, j}
					<button on:click={() => add(val)}>{val}</button>
				{/each}
			</div>
		{/each}
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

	.main_pending {
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
		font-size: 2em;
		background-color: aliceblue;
		border-radius: 5px;
	}

	input {
		font-size: 2em;
		padding: 10px;
		width: 8em;
		text-align: center;
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
