<script lang="ts">
	import ModBasic from '../components/modules/ModBasic.svelte';
	import ModKeypad from '../components/modules/ModKeypad.svelte';
	import ModMemory from '../components/modules/ModMemory.svelte';
	import ModWires from '../components/modules/ModWires.svelte';
	import Lives from '../components/Lives.svelte';
	import Timer from '../components/Timer.svelte';

	import {
		seed,
		duration,
		lives,
		Module,
		modules,
		registerModule,
		GameState,
		gameState
	} from '../lib/store';

	const numberOfModules = 3;
	const mods = { Basic: ModBasic, Keypad: ModKeypad, Memory: ModMemory, Wires: ModWires };
	registerModule(new Module(1, 'Basic'));
	registerModule(new Module(2, 'Keypad'));
	registerModule(new Module(3, 'Memory'));
	//registerModule(new Module(4, 'Wires'));

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
</script>

{#if localGameState == GameState.WIN}
	<div>🎉 WON 🎉</div>
{:else if countLives > 0 && timer > 0}
	<div class="flexc">
		<div class="flexr">
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
	.lives {
		width: 10%;
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
		border: 1px solid gray;
		border-radius: 5px;
		padding: 20px;
		margin: 20px;
		-webkit-box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
		box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
	}
</style>
