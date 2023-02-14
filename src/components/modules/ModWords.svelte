<script lang="ts">
	import { onMount } from 'svelte';
	import { loseLife, updateModule, ModuleState, debug } from '$lib/store';
	import { randomize } from '$lib/array';
	import { lists, maps } from '$lib/words';
	export let done = false;
	export let id: number;
	let shaking = false;
	let stage = 0;
	let nextExpectedWord = '';

	let display = '';
	let words = [] as string[];

	function validate(word: string) {
		if (word == nextExpectedWord) {
			stage++;
		} else {
			loseLife();
			shake();
			return;
		}
		if (stage > 5) {
			done = true;
			updateModule(id, undefined, ModuleState.DONE);
		} else {
			shuffle();
		}
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	function shuffle() {
		// pick display word
		let keys = Object.keys(maps);
		display = keys[Math.floor(keys.length * Math.random())];

		// pick 1 words to show on highlighted button
		let words_keys = Object.keys(lists);
		randomize(words_keys);
		let highlighted_word = words_keys[0];

		// pick 6 words in the list of the highlighted word and replace the highlighted word in the right spot
		let tmp_words = [...lists[highlighted_word]];
		randomize(tmp_words);
		words = tmp_words.slice(0, 6);
		words[maps[display]] = highlighted_word;

		// find the next expected word
		tmp_words = [...lists[highlighted_word]];
		let pos = 100;
		for (let word of words) {
			let index = tmp_words.findIndex((w) => w == word);
			if (index < pos) {
				pos = index;
				nextExpectedWord = word;
			}
		}
		if (debug) {
			console.log('Words:', nextExpectedWord);
		}
	}

	onMount(async () => {
		shuffle();
	});
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<div class="screen">&nbsp;{display}&nbsp;</div>
		<div class="flexr">
			<div class="grid">
				{#each { length: 6 } as _, i}
					<button
						on:click={() => {
							validate(words[i]);
						}}>{words[i]}</button
					>
				{/each}
			</div>
			<div class="flexc">
				{#each { length: 6 } as _, i}
					<div class="dot {i < stage ? 'dot-done' : 'dot-todo'}">&nbsp;</div>
				{/each}
			</div>
		</div>
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

	.screen {
		background-color: rgb(10, 22, 77);
		color: aliceblue;
		width: 80%;
		padding: 10px;
		text-align: center;
		font-weight: 700;
		font-size: 2em;
		vertical-align: middle;
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

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		justify-content: center;
		gap: 10px;
		margin-right: 10px;
	}

	.dot {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5em;
		max-width: 1.5em;
		min-height: 1.5em;
		max-height: 1.5em;
		box-sizing: border-box;
		border-radius: 5px;
		border-radius: 50%;
	}

	.dot-done {
		background-color: rgb(0, 255, 136);
	}

	.dot-todo {
		background-color: rgb(104, 87, 100);
	}

	button {
		padding: 10px;
		font-size: 1.5em;
		background-color: aliceblue;
		border-radius: 5px;
		width: 100%;
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
