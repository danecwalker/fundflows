<script>
  import Profile from './Profile.svelte';
</script>

<header class="w-full border-b">
  <nav class="w-full max-w-screen-xl mx-auto px-4 py-4">
    <ul class="flex gap-8 items-center">
      <li class="flex-1">
        <a href="/">
          <h1 class="text-2xl font-bold">FundFlows</h1>
        </a>
      </li>
      <li>
        <div class="w-12">
          <Profile />
        </div>
      </li>
    </ul>
  </nav>
</header>
