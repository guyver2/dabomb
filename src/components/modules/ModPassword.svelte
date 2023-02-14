<script lang="ts">
	import { onMount } from 'svelte';
	import { loseLife, updateModule, ModuleState, debug } from '$lib/store';
	export let done = false;
	export let id: number;
	let shaking = false;
	let guess = '';
	let words = [
		'about',
		'after',
		'again',
		'below',
		'could',
		'every',
		'first',
		'found',
		'great',
		'house',
		'large',
		'learn',
		'never',
		'other',
		'place',
		'plant',
		'point',
		'right',
		'small',
		'sound',
		'spell',
		'still',
		'study',
		'their',
		'there',
		'these',
		'thing',
		'think',
		'three',
		'water',
		'where',
		'which',
		'world',
		'would',
		'write'
	];
	let password = '';
	let choices = [] as string[][];
	let choiceIds = [0, 0, 0, 0, 0];

	function updateGuess(letterId: number, shift: number) {
		choiceIds[letterId] = (choiceIds[letterId] + shift + 6) % 6;
		guess = '';
		for (let i = 0; i < 5; i++) {
			guess += choices[i][choiceIds[i]];
		}
	}

	function validate() {
		if (words.includes(guess)) {
			done = true;
			updateModule(id, undefined, ModuleState.DONE);
		} else {
			if (debug) {
				console.log('Password:', password);
			}
			loseLife();
			shake();
		}
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	onMount(async () => {
		password = words[Math.floor(Math.random() * words.length)];
		// for each letter:
		// - pick 6 letters that exist at that position in the list of words at random
		// - if the actual password letter is not in the chosen list, replace the first letter with this one
		// - shuffle
		for (let i = 0; i < 5; i++) {
			let letters = [...new Set(words.map((w) => w.at(i)))] as string[];
			letters.sort((a, b) => 0.5 - Math.random());
			letters = letters.slice(0, 6);
			if (!letters.includes(password.at(i))) {
				letters[0] = password.at(i);
			}
			choices.push(letters.sort((a, b) => 0.5 - Math.random()));
			guess += choices[i][choiceIds[i]];
		}

		if (debug) {
			console.log('Password:', password);
		}
	});
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<div class="flexr">
			{#each { length: 5 } as _, i}
				<div class="flexr">
					<button
						on:click={() => {
							updateGuess(i, 1);
						}}>⬆️</button
					>
				</div>
			{/each}
		</div>
		<div class="flexr guess">
			{#each guess as l}
				<div class="letter">{l}</div>
			{/each}
		</div>
		<div class="flexr">
			{#each { length: 5 } as _, i}
				<div class="flexr">
					<button
						on:click={() => {
							updateGuess(i, -1);
						}}>⬇️</button
					>
				</div>
			{/each}
		</div>
		<button on:click={validate}>Submit</button>
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

	.guess {
		justify-content: space-around;
		width: 100%;
		font-size: 2em;
		font-family: monospace;
		text-transform: uppercase;
		font-weight: 800;
		padding-top: 20px;
		padding-bottom: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
		border: solid gainsboro;
		border-radius: 4px;
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
