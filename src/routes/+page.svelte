<script>
	import { Bars, Box, Chart, Ticks } from 'vissi-svelte';
	import { spring } from 'svelte/motion';
	import { range, domain, fn, style } from 'vissi';

	let barSize = 1;
	let gap = .1;

	let start = 0;
  /** 
   * @param {number} s
   * @param {number} n
   */
	const getPoints = (s, n) => fn((x) => x*x, range(s, n, 1));
  
	const data = spring(range(0, 10, 1).map((x) => ({ x: x, y: 0 })));
	const points = getPoints(start, start + 10);
	$: data.set(points);
	$: d = domain(points);
	$: console.log($data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<div
	class="container"
	style={style({
		width: "1000px",
		height: "500px"
	})}
>
	<div>
		<Chart x1={d.x1 - barSize / 2} x2={d.x2 + barSize / 2} y1={d.y1} y2={d.y2}>
			<Ticks ticks={range(10)} let:value>
				<span
					class="x label"
					style={style({
						color: '#999'
					})}>{value}</span
				>
			</Ticks>

			<Bars data={$data} color={'hsla(210, 100%, 50%, 0.2)'} width={barSize}>
				<div
					class={'bar border'}
					style={style({
						backgroundColor: 'hsla(210, 100%, 50%, 0.2)',
						width: `${100 - (gap / barSize) * 100}%`,
						"--border-color": 'hsla(210, 100%, 50%, 1)',
					})}
				></div>
			</Bars>
		</Chart>
	</div>

	<div>
		<Chart {...d}>
			<Box {...d}>
				<div
					class="axes"
					style={style({
						borderColor: 'black'
					})}
				></div>
			</Box>
			<Ticks horizontal count={9} let:value>
				<div
					class="grid-line horizontal"
					style={style({
						borderColor: '#ccc'
					})}
				>
					<span
						style={style({
							color: '#999'
						})}>{Math.round(value*10)/10}</span
					>
				</div>
			</Ticks>
		</Chart>
	</div>
</div>

<style>
	.container {
		position: relative;
	}

	.label {
		position: absolute;
		font-size: 14px;
		line-height: 1;
		white-space: nowrap;
		font-family: sans-serif;
	}

	.x.label {
		bottom: -1.2rem;
		text-align: center;
		transform: translateX(-50%);
	}

	.container > div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 3em 2em 2em 3em;
		box-sizing: border-box;
	}

	.bar {
		position: absolute;
		height: 100%;
		left: 50%;
		transform: translateX(-50%);
	}

	.bar.border::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 2px);
		height: calc(100% - 1px);
		border-top: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}

	.axes {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid;
		border-left: 1px solid;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: 100%;
		left: 0;
		border-bottom: 1px solid;
	}
	.grid-line span {
		position: absolute;
		line-height: 1;
		font-family: sans-serif;
		font-size: 14px;
	}

	.grid-line.horizontal span {
		left: -0.6rem;
		bottom: 0;
		transform: translateX(-100%) translateY(50%);
	}
</style>