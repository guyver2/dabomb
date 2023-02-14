<script>
	import { lives, maxLives } from '../lib/store';

	let countLives = 0;

	let unsubscribe = lives.subscribe((value) => {
		countLives = value;
	});
</script>

<main>
	<div class="flexr">
		{#each { length: $maxLives } as _, i}
			<img src="heart{countLives > i ? '' : '_ko'}.png" alt="1 life" />
		{/each}
	</div>
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}

	.flexr {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
	img {
		width: 30%;
	}
</style>
