<script>
  /**
   * @typedef Domain
   * @property {number} x1
   * @property {number} x2
   * @property {number} y1
   * @property {number} y2
  */

  import { cm } from "$lib/utils/utils";
  import { style, range } from "vissi";
  import { Chart, Ticks, Bars, Box } from "vissi-svelte";
  

  /** @type {import("vissi").Point[]} */
  export let data = [];
  export let barSize = 1;
  export let gap = 0.1;
  export let barColor = "hsla(190, 100%, 50%, 0.5)";
  export let barBorder = "hsla(190, 100%, 50%, 1)";
  export let tickColor = "black";
  export let axisColor = "black";
  export let gridColor = "#ccc";
  /** @type {Domain} */
  export let domain = {
    x1: 0,
    x2: 10,
    y1: 0,
    y2: 10,
  };

  let className = "";
  export { className as class };

</script>
<div
	class={cm("container", className)}
>
	<div>
		<Chart x1={domain.x1 - barSize / 2} x2={domain.x2 + barSize / 2} y1={domain.y1} y2={domain.y2}>
			<Ticks ticks={range(10)} let:value>
				<span
					class="x label"
					style={style({
						color: tickColor
					})}>{value}</span
				>
			</Ticks>

			<Bars {data} color={barColor} width={barSize}>
				<div
					class={barBorder ? 'bar bborder' : 'bar'}
					style={style({
						backgroundColor: barColor,
						width: `${100 - (gap / barSize) * 100}%`,
						"--border-color": barBorder,
					})}
				></div>
			</Bars>
		</Chart>
	</div>

	<div>
		<Chart x1={domain.x1} x2={domain.x2} y1={domain.y1} y2={domain.y2}>
			<Box x1={domain.x1} x2={domain.x2} y1={domain.y1} y2={domain.y2}>
				<div
					class="axes"
					style={style({
						borderColor: axisColor
					})}
				></div>
			</Box>
			<Ticks horizontal count={9} let:value>
				<div
					class="grid-line horizontal"
					style={style({
						borderColor: gridColor
					})}
				>
					<span
						style={style({
							color: tickColor
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

	.bar.bborder::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		width: 100%;
		height: 100%;
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
    top: -1px;
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