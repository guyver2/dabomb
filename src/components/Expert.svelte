<script lang="ts">
	import ManBasic from '../components/manuals/ManBasic.svelte';
	import ManKeypad from '../components/manuals/ManKeypad.svelte';
	import ManMemory from '../components/manuals/ManMemory.svelte';
	// import ManWires from '../components/manuals/ManWires.svelte';
	import '../style/manual.css';

	const manuals = [ManBasic, ManKeypad, ManMemory, ManMemory, ManMemory];
</script>

<div class="flexc">
	{#each manuals as manual}
		<div class="module">
			<svelte:component this={manual} />
		</div>
	{/each}
</div>

<style lang="css">
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
		width: 50em;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 20px;
		margin: 20px;
		-webkit-box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
		box-shadow: 0px 0px 10px 0px rgba(33, 41, 63, 0.35);
	}
</style>
