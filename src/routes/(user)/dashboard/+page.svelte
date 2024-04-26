<script>
  import Chart from '$lib/components/Chart.svelte';
import Navbar from '$lib/components/Navbar.svelte';
  import { spring } from 'svelte/motion';
  import { fn, range, domain } from 'vissi';

  /**
   * Get points
   * @param {number} s
   * @param {number} n
   */
  const getPoints = (s, n) => fn((x) => x * x, range(s, n, 1));

  const data = spring(range(0, 10, 1).map((x) => ({ x: x, y: 0 })));
  const points = getPoints(0, 10);
  $: data.set(points);
  $: d = domain(points);
  $: console.log($data);
</script>

<Navbar />

<div class="w-full">
  <main class="w-full max-w-screen-xl mx-auto px-4 py-4">
    <Chart data={$data} domain={d} class="w-full h-[600px]" />
  </main>
</div>
