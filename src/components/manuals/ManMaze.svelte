<script lang="ts">
	import { Maze, mazes } from '$lib/maze';
	const allMazes = mazes.map((m) => new Maze(m));
</script>

<main>
	<h1>About the Maze</h1>
	<div class="story">Don't get lost, hand on the left wall and keep walking.</div>
	<div class="ifu">
		<ul>
			<li>Find the correct maze from the gold circles' positions.</li>
			<li>Move the blue dot to the orange one.</li>
		</ul>
		<div class="grid">
			{#each allMazes as maze}
				<div class="maze">
					{#each maze.grid as row, r}
						{#each row as cell, c}
							<div
								class="cell 
                                    {maze.cellBorders(r, c)}  
                                    {maze.isLight(r, c) ? 'light' : ''}
                                    "
							>
								<div class="empty" />
							</div>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		justify-content: center;
		row-gap: 10px;
		column-gap: 10px;
	}

	.maze {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		place-items: center;
		justify-content: center;
		gap: 0px;
		border: solid black 1px;
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2em;
		height: 2em;
		box-sizing: border-box;
		border-radius: 3px;
	}

	.u {
		border-top: solid black 1px;
	}

	.d {
		border-bottom: solid black 1px;
	}

	.l {
		border-left: solid black 1px;
	}

	.r {
		border-right: solid black 1px;
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
