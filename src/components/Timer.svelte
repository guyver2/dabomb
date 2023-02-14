<script>
	import { tweened } from 'svelte/motion';
	import { duration, setTimer } from '../lib/store';

	let localDuration;
	const totalDuration = $duration;

	let unsubscribe = duration.subscribe((value) => {
		localDuration = value;
	});

	let timer = tweened(localDuration);

	// ------ dont need to modify code below
	setInterval(() => {
		if ($timer > 0) {
			$timer--;
			setTimer($timer);
		}
	}, 1000);

	$: minutes = Math.floor($timer / 60);
	$: minname = minutes > 1 ? 'mins' : 'min';
	$: seconds = Math.floor($timer - minutes * 60);
</script>

<div class="flexc">
	{#if $timer < 1}
		<div class="boom">BOOM!</div>
	{:else}
		<div class="flexr">
			<div class="title">TIME LEFT</div>
			<h1>
				<span class="mins">{minutes} </span>{minname}
				<span class="secs">{seconds}</span>s!
			</h1>
		</div>
		<progress value={$timer / totalDuration} />
	{/if}
</div>

<style>
	progress {
		display: block;
		width: 100%;
	}
	.mins {
		color: rgb(184, 66, 11);
	}
	.secs {
		color: rgb(184, 95, 11);
	}
	.flexc {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.flexr {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.title {
		font-size: 2rem;
		font-weight: bold;
	}
	.boom {
		font-size: 2rem;
		font-weight: bold;
		color: brown;
	}
</style>
