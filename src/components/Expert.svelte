<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';

	import ManBasic from './manuals/ManBasic.svelte';
	import ManKeypad from './manuals/ManKeypad.svelte';
	import ManMemory from './manuals/ManMemory.svelte';
	import ManPassword from './manuals/ManPassword.svelte';
	import ManMaze from './manuals/ManMaze.svelte';
	import ManWords from './manuals/ManWords.svelte';

	import '../style/manual.css';

	const manuals = [ManBasic, ManKeypad, ManMemory, ManPassword, ManMaze, ManWords];
</script>

<div class="center">
	<div class="flexc">
		{#each manuals as manual}
			<div class="module">
				<svelte:component this={manual} />
			</div>
		{/each}
	</div>
</div>

<style lang="css">
	.center {
		display: flex;
		flex-direction: column;
		place-items: center;
		justify-content: center;
	}

	.flexc {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: min(800px, 80%);
	}

	.module {
		width: 100%;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
		-webkit-box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
		box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
	}
</style>
