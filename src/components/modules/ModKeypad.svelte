<script lang="ts">
	import { onMount } from 'svelte';
	import { seed, loseLife, updateModule, ModuleState, debug } from '$lib/store';
	export let done = false;
	export let id: number;
	let keys = ['🐵', '🐶', '🦊', '🐱', '🦁', '🦄', '🐮', '🐷', '🐻', '🐼'];
	let guess = '';
	let shaking = false;
	let stage = 0;
	let passwordLength = 4;
	let nextExpectedKey = '';
	let historyValues = [] as number[];
	let historyKeys = [] as string[];

	function shuffle() {
		keys = keys.sort((a, b) => 0.5 - Math.random());
		updateNextExpectedKey();
	}

	function updateNextExpectedKey() {
		switch (stage) {
			case 0:
				nextExpectedKey = keys[(keyValue('🦊') + keyValue('🐷') - 1) % 10];
				break;
			case 1:
				const v0 = keyValue('🦁');
				const v1 = keyValue('🐱');
				const v2 = keyValue('🦄');
				const v3 = keyValue('🐼');
				const idn = Math.floor((v0 * (v1 + v2 + v3)) / 10 + 9) % 10;
				nextExpectedKey = keys[idn];
				break;
			case 2:
				if (keyValue('🐱') > keyValue('🦁')) {
					nextExpectedKey = '🦄';
				} else if (keyValue('🐷') < keyValue('🦄')) {
					nextExpectedKey = '🐻';
				} else {
					nextExpectedKey = keys[(historyValues[0] + 9) % 10];
				}
				break;
			case 3:
				const k0 = keyValue(historyKeys[0]);
				const k1 = keyValue(historyKeys[1]);
				const k2 = keyValue(historyKeys[2]);
				const sum = k0 + k1 + k2;
				if (sum % 2 == 0) {
					nextExpectedKey = '🦊';
				} else {
					nextExpectedKey = keys[9];
				}

				break;
			default:
				console.log('should not show this');
		}
		if (debug) {
			console.log('Keypad:', stage, 'next key:', nextExpectedKey);
		}
	}

	function keyValue(key: string): number {
		const value = (keys.findIndex((e) => e == key) + 1) % 10;
		return value;
	}

	function batches(values: string[]): string[][] {
		return [
			[values[6], values[7], values[8]],
			[values[3], values[4], values[5]],
			[values[0], values[1], values[2]]
		];
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	function add(val: string) {
		if (stage < passwordLength) {
			if (nextExpectedKey != val) {
				loseLife();
				shake();
			} else {
				guess = guess + val;
				stage++;
				historyKeys.push(val);
				historyValues.push(keyValue(val));
			}
		}
		if (stage == passwordLength) {
			done = true;
			updateModule(id, undefined, ModuleState.DONE);
		} else {
			shuffle();
		}
	}

	onMount(async () => {
		shuffle();
	});
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<div class="title">
			<input type="text" value={guess} readonly />
		</div>
		<div class="flexr">
			<div class="flexc">
				{#each batches(keys) as batch, i}
					<div class="flexr">
						{#each batch as val, j}
							<button on:click={() => add(val)}>{val}</button>
						{/each}
					</div>
				{/each}
			</div>
			<div class="lastButton">
				<button on:click={() => add(keys[9])}>{keys[9]}</button>
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

	.lastButton button {
		height: 7em;
		max-height: 100%;
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
