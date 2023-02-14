<script>
	import MediaQuery from '../components/MediaQuery.svelte';
</script>

<!-- MOBILE -->
<MediaQuery query="(max-width: 800px)" let:matches>
	{#if matches}
		<center><h1 class="title-mobile">Welcome to BOMB</h1></center>
		<div class="flex">
			<div class="grid-mobile">
				<a href="/defuser"><img class="img-mobile" src="defuser.jpg" alt="defuser" /></a>
				<a href="/defuser"><div class="link">Defuser</div></a>
				<a href="/expert"><img class="img-mobile" src="expert.jpg" alt="Expert" /></a>
				<a href="/expert"><div class="link">Expert</div></a>
				<a href="/nofriends"><img class="img-mobile" src="nofriends.jpg" alt="No Friends" /></a>
				<a href="/nofriends"><div class="link">I have no friends</div></a>
			</div>
		</div>
	{/if}
</MediaQuery>

<!-- DESKTOP -->
<MediaQuery query="(min-width: 801px)" let:matches>
	{#if matches}
		<center><h1 class="title">Welcome to BOMB</h1></center>
		<div class="flex">
			<div class="grid">
				<a href="/defuser"><img class="img" src="defuser.jpg" alt="defuser" /></a>
				<a href="/expert"><img class="img" src="expert.jpg" alt="Expert" /></a>
				<a href="/nofriends"><img class="img" src="nofriends.jpg" alt="No Friends" /></a>
				<a href="/defuser"><div class="link">Defuser</div></a>
				<a href="/expert"><div class="link">Expert</div></a>
				<a href="/nofriends"><div class="link">I have no friends</div></a>
			</div>
		</div>
	{/if}
</MediaQuery>

<style>
	.title {
		padding-top: 180px;
	}

	.title-mobile {
		padding-top: 30px;
		padding-bottom: 30px;
	}

	.img {
		min-width: 200px;
		max-width: 100%;
		height: auto;
		border-radius: 10px;
	}

	.img-mobile {
		max-width: 100%;
		height: auto;
		border-radius: 10px;
	}

	a {
		text-decoration: none;
	}

	.link {
		text-align: left;
		color: rgb(63, 63, 63);
		font-size: larger;
		font-weight: 700;
		padding: 10px;
	}

	.flex {
		display: flex;
		justify-content: space-around;
	}

	.grid {
		width: 60%;
		margin: 100px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		gap: 20px;
	}

	.grid-mobile {
		width: 90%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-items: start;
		align-items: center;
		gap: 20px;
	}
</style>
