<script lang="ts">
	import Expert from '../../components/Expert.svelte';
	import Defuser from '../../components/Defuser.svelte';
	import MediaQuery from '../../components/MediaQuery.svelte';

	let showDefuser = true;

	function swipe() {
		showDefuser = !showDefuser;
	}
</script>

<MediaQuery query="(max-width: 800px)" let:matches>
	{#if matches}
		{#if showDefuser}
			<Defuser />
		{:else}
			<Expert />
		{/if}
		<div id="swipe">
			<button class="swipe-button" on:click={swipe}>{showDefuser ? 'MANUAL' : 'BOMB'}</button>
		</div>
	{/if}
</MediaQuery>

<!-- DESKTOP -->
<MediaQuery query="(min-width: 801px)" let:matches>
	{#if matches}
		<div class="flexr">
			<div class="w45">
				<Defuser />
			</div>
			<div class="w45">
				<Expert />
			</div>
		</div>
	{/if}
</MediaQuery>

<style lang="css">
	.flexr {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.w45 {
		width: 45%;
		height: 100vh;
		overflow: auto;
	}

	#swipe {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}

	.swipe-button {
		background-color: #31b0d5;
		color: white;
		font-weight: 600;
		font-size: 2em;
		padding: 10px 20px;
		border-radius: 5px;
		border-color: #46b8da;
	}
</style>
