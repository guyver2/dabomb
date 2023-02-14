<script lang="ts">
	import Expert from '../../components/Expert.svelte';
	import Defuser from '../../components/Defuser.svelte';
</script>

<div class="flexr">
	<div class="w45">
		<Defuser />
	</div>
	<div class="w45">
		<Expert />
	</div>
</div>

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
</style>
