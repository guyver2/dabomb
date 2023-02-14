<script lang="ts">
	import { onMount } from 'svelte';
	import { loseLife, updateModule, ModuleState, debug } from '../../lib/store';
	export let done = false;
	export let id: number;

	let instruction = 0;
	let current_buttons = [0, 1, 2, 3];
	let errors = 0;
	let shaking = false;
	let stage = 0;
	let maxStage = 5;
	let history = [] as { val: number; pos: number }[];
	let expected_input = { position: -1, value: -1 };

	function printState() {
		console.log('instruction:', instruction);
		console.log('current_buttons:', current_buttons);
		console.log('stage:', stage);
		console.log('history:', history);
	}

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	function shuffle() {
		instruction = Math.floor(4 * Math.random());
		current_buttons = current_buttons.sort((a, b) => 0.5 - Math.random());
		updateNextExpectedInput();
	}

	function updateNextExpectedInput() {
		let expected_position = -1;
		let expected_value = -1;
		switch (stage) {
			case 0:
				switch (instruction) {
					case 0:
						expected_position = 1;
						break;
					case 1:
						expected_position = 1;
						break;
					case 2:
						expected_position = 2;
						break;
					case 3:
						expected_position = 3;
						break;
					default:
						console.log(`Should not have instruction>3 (${instruction})`);
				}
				break;
			case 1:
				switch (instruction) {
					case 0:
						expected_value = 3;
						break;
					case 1:
						expected_position = history[0].pos;
						break;
					case 2:
						expected_position = 0;
						break;
					case 3:
						expected_position = history[0].pos;
						break;
					default:
						console.log(`Should not have instruction>3 (${instruction})`);
				}
				break;
			case 2:
				switch (instruction) {
					case 0:
						expected_value = history[1].val;
						break;
					case 1:
						expected_value = history[0].val;
						break;
					case 2:
						expected_position = 2;
						break;
					case 3:
						expected_value = 3;
						break;
					default:
						console.log(`Should not have instruction>3 (${instruction})`);
				}
				break;
			case 3:
				switch (instruction) {
					case 0:
						expected_position = history[0].pos;
						break;
					case 1:
						expected_position = 0;
						break;
					case 2:
						expected_position = history[1].pos;
						break;
					case 3:
						expected_position = history[1].pos;
						break;
					default:
						console.log(`Should not have instruction>3 (${instruction})`);
				}
				break;
			case 4:
				switch (instruction) {
					case 0:
						expected_value = history[0].val;
						break;
					case 1:
						expected_value = history[1].val;
						break;
					case 2:
						expected_value = history[3].val;
						break;
					case 3:
						expected_value = history[2].val;
						break;
					default:
						console.log(`Should not have instruction>3 (${instruction})`);
				}
				break;
			default:
				console.log(`Should not have stage>4 (${stage})`);
		}
		expected_input.position = expected_position;
		expected_input.value = expected_value;
		if (debug) {
			console.log('Memory:', stage, 'next input', expected_input);
		}
	}

	function validate_input(key_value: number, key_position: number) {
		if (
			(expected_input.position != -1 && expected_input.position == key_position) ||
			(expected_input.value != -1 && expected_input.value == key_value)
		) {
			stage++;
			history.push({ val: key_value, pos: key_position });
			if (stage == maxStage) {
				done = true;
				updateModule(id, undefined, ModuleState.DONE);
			} else {
				shuffle();
			}
		} else {
			stage = 0;
			errors++;
			shuffle();
			shake();
			loseLife();
		}
	}

	onMount(async () => {
		shuffle();
	});
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexr">
		<div class="flexc">
			<div class="instruction instruction_{instruction}" />
			<div class="flexr">
				{#each { length: 4 } as _, i}
					<button
						on:click={() => validate_input(current_buttons[i], i)}
						class="instruction_{current_buttons[i]}">{current_buttons[i] + 1}</button
					>
				{/each}
			</div>
		</div>
		<div class="flexc">
			{#each { length: 5 } as _, i}
				<div class="dot {errors > i ? 'error' : ''}" />
			{/each}
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

	.instruction {
		width: 100%;
		height: 10em;
	}

	.instruction_0 {
		background-color: #d94a4a;
		color: white;
	}

	.instruction_1 {
		background-color: #f2955e;
		color: white;
	}

	.instruction_2 {
		background-color: #8fb6d9;
		color: white;
	}

	.instruction_3 {
		background-color: #8c5d84;
		color: white;
	}

	.dot {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		background-color: #b4cf66;
	}

	.error {
		background-color: #d94a4a;
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
