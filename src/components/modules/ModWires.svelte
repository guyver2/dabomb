<script lang="ts">
	import { seed, loseLife, updateModule, ModuleState } from '../../lib/store';
	export let done = false;
	export let id: number;

	let shaking = false;
	const serialNumber = Math.floor(Math.random() * 1000);

	const width = 400;
	const height = 400;
	const wiresHeigth = 40;
	const wireLength = width - 2 * wiresHeigth;
	const nbWires = 3 + Math.floor(Math.random() * 4);
	const spacing = (height - wiresHeigth * nbWires) / (1 + nbWires);

	function shake() {
		shaking = true;
		setTimeout(() => {
			shaking = false;
		}, 500);
	}

	function cutWire(position: number, color: string) {
		console.log(`cutting ${position}, ${color}`);
	}

	function svgWire(start: { x: number; y: number }, end: { x: number; y: number }) {
		const steps = 5 + Math.random() * 5;
		const step = (end.x - start.x) / steps;
		const vertWiggle = wiresHeigth / 3;

		let path = `M ${start.x} ${start.y} `;
		for (let i = 1; i < steps; i++) {
			path += `T ${start.x + step * i} ${start.y + Math.random() * vertWiggle - vertWiggle / 2}`;
		}
		path += `T ${end.x} ${end.y}`;
		return path;
	}
</script>

<main class="main_{done ? 'done' : 'pending'} {shaking ? 'shaking' : ''}">
	<div class="flexc">
		<div class="title">
			{serialNumber}
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="wires"
			version="1.1"
			viewBox="0 0 {width} {height}"
			{height}
			{width}
		>
			<metadata id="metadata">
				<rdf:RDF>
					<cc:Work rdf:about="">
						<dc:format>image/svg+xml</dc:format>
						<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
						<dc:title />
					</cc:Work>
				</rdf:RDF>
			</metadata>
			<g>
				<rect
					y="0"
					x="0"
					{height}
					{width}
					id="bg"
					style="opacity:1;fill:#f2955e;fill-opacity:1;stroke:none;stroke-width:0.36500001;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke"
				/>
				{#each { length: nbWires } as _, i}
					<circle
						style="opacity:1;fill:#919db1;fill-opacity:1;stroke:none;stroke-width:0.24127118;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke"
						cx={(width - wireLength) / 2}
						cy={spacing + wiresHeigth / 2 + i * (spacing + wiresHeigth)}
						r={wiresHeigth / 2}
					/>
					<circle
						style="opacity:1;fill:#919db1;fill-opacity:1;stroke:none;stroke-width:0.24127118;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke"
						cx={width - (width - wireLength) / 2}
						cy={spacing + wiresHeigth / 2 + i * (spacing + wiresHeigth)}
						r={wiresHeigth / 2}
					/>
					<path
						d={svgWire(
							{
								x: (width - wireLength) / 2,
								y: spacing + wiresHeigth / 2 + i * (spacing + wiresHeigth)
							},
							{
								x: width - (width - wireLength) / 2,
								y: spacing + wiresHeigth / 2 + i * (spacing + wiresHeigth)
							}
						)}
						style="fill:none;stroke:#0bff00;stroke-width:8;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
						id="wire{i + 1}"
						on:click={() => cutWire(i + 1, 'red')}
						on:keypress={() => cutWire(i + 1, 'red')}
					/>
				{/each}
			</g>
		</svg>
	</div>
</main>

<style>
	main {
		border-radius: 5px;
		padding: 10px;
	}

	.main_done {
		background-color: rgb(107, 107, 107);
		pointer-events: none;
	}

	.main_pending {
	}

	.flexc {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.flexr {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	button {
		padding: 10px;
		font-size: 2em;
		background-color: aliceblue;
		border-radius: 5px;
	}

	input {
		font-size: 2em;
		padding: 10px;
		width: 8em;
		text-align: center;
	}

	.shaking {
		animation: shake 0.3s;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
