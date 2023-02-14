<script lang="ts">
	import { lists, maps } from '$lib/words';
	import { each } from 'svelte/internal';
</script>

<main>
	<h1>About the Words</h1>
	<div class="story">
		i'm the best with words, I have all the best words, long words, short words, terrific words.
	</div>
	<div class="ifu">
		<ul>
			<li>
				First find the highlited word based on the tables bellow and the word shown at the top.
			</li>
			<li>Then use that word to find the correct list of words.</li>
			<li>Finally press on the button that has the word that appears the first on that list.</li>
			<li>Repeat.</li>
		</ul>
		<div class="subtitle">Tables:</div>
		<div class="flexr">
			{#each Object.keys(maps) as k}
				<div class="grid">
					<div class="display">&nbsp;{k}&nbsp;</div>
					{#each { length: 6 } as _, i}
						<div class="cell {maps[k] == i ? 'light' : ''}">
							<div class="empty">&nbsp;</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="subtitle">Lists:</div>
		<div class="lists">
			{#each Object.keys(lists) as k}
				<div class="list_key"><div>"{k}"</div></div>
				<div class="list_list">
					{#each lists[k] as word}
						<span>{word}</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	.lists {
		display: grid;
		grid-template-columns: 1fr 8fr;
		justify-content: center;
		align-items: center;
		gap: 0px;
		border: solid black 1px;
	}

	.list_key {
		display: flex;
		place-items: center;
		font-weight: 700;
		text-align: center;
		width: 100%;
		height: 100%;
		text-transform: uppercase;
		border: solid black 1px;
	}

	.list_key div {
		width: 100%;
	}

	.list_list {
		padding-left: 1em;
		font-size: smaller;
		font-weight: 500;
		text-transform: uppercase;
		border: solid black 1px;
	}
	.list_list span:not(:last-child):after {
		content: ', ';
	}

	.flexr {
		margin: 3em;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2em;
		flex-wrap: wrap;
	}

	.display {
		width: 100%;
		text-align: center;
		vertical-align: middle;
		grid-column-start: 1;
		grid-column-end: span 2;
		background-color: black;
		color: white;
	}

	.grid {
		width: 6em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		justify-content: center;
		gap: 0px;
		border: solid black 1px;
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: solid black 1px;
	}

	.light {
		background-color: rgb(228, 228, 51);
	}

	.empty {
		background-color: rgb(104, 87, 100);
		border-radius: 50%;
		width: 15%;
		height: 15%;
	}
</style>
