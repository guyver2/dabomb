<script lang="ts">
	import { onMount } from 'svelte';

	import ModBasic from './modules/ModBasic.svelte';
	import ModKeypad from './modules/ModKeypad.svelte';
	import ModMemory from './modules/ModMemory.svelte';
	import ModWires from './modules/ModWires.svelte';
	import ModPassword from './modules/ModPassword.svelte';
	import ModMaze from './modules/ModMaze.svelte';
	import ModWords from './modules/ModWords.svelte';
	import Lives from './Lives.svelte';
	import Timer from './Timer.svelte';

	import {
		seed,
		duration,
		lives,
		Module,
		modules,
		registerModule,
		clearModules,
		GameState,
		gameState
	} from '../lib/store';

	const numberOfModules = 3;
	const mods = {
		Basic: ModBasic,
		Keypad: ModKeypad,
		Memory: ModMemory,
		Wires: ModWires,
		Password: ModPassword,
		Maze: ModMaze,
		Words: ModWords
	};
	let i = 0;

	let countLives = 0;
	let unsubscribeLives = lives.subscribe((value) => {
		countLives = value;
	});
	let timer = 0;
	let unsubscribeDuration = duration.subscribe((value) => {
		timer = value;
	});

	let localGameState = GameState.PENDING;
	let unsubscribeGameState = gameState.subscribe((value) => {
		localGameState = value;
	});

	onMount(async () => {
		clearModules();
		registerModule(new Module(i++, 'Basic'));
		registerModule(new Module(i++, 'Password'));
		registerModule(new Module(i++, 'Keypad'));
		registerModule(new Module(i++, 'Memory'));
		registerModule(new Module(i++, 'Maze'));
		registerModule(new Module(i++, 'Words'));
	});
</script>

{#if localGameState == GameState.WIN}
	<div>🎉 WON 🎉</div>
{:else if countLives > 0 && timer > 0}
	<div class="flexc">
		<div class="header">
			<div class="timer">
				<Timer />
			</div>
			<div class="lives">
				<Lives />
			</div>
		</div>
		<div class="flexr">
			{#each $modules as mod, i}
				<div class="module">
					<svelte:component this={mods[mod.name]} id={mod.id} />
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div>LOST</div>
{/if}

<style lang="css">
	.header {
		max-width: min(60%, 400px);
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.timer {
		width: 100%;
	}
	.lives {
		width: 100%;
	}

	.flexc {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.flexr {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.module {
		max-width: 90%;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 5px;
		margin: 20px;
		-webkit-box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
		box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
	}
</style>
