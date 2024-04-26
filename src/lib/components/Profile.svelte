<script>
  export const img =
    'https://images.unsplash.com/photo-1714085164244-e748705d3fd4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  let showDropdown = false;
  let isOpen = false;
  /**
   * @type {HTMLDivElement}
   */
  let dropdown;

  $: if (dropdown) dropdown.dataset.state = isOpen ? 'open' : 'closed';

  function toggleDropdown() {
    isOpen = !isOpen;
    if (isOpen) {
      showDropdown = true;
      document.addEventListener('click', clickClose);
    }
  }

  /**
   * @param {MouseEvent} event
   */
  function clickClose(event) {
    if (!dropdown) return;
    let t = /** @type {HTMLElement | null} */ (event.target);
    if (!dropdown.contains(t)) {
      isOpen = false;
      document.removeEventListener('click', clickClose);
    }
  }

  function closeDropdown() {
    if (!isOpen) {
      showDropdown = false;
    }
  }
</script>

<div bind:this={dropdown} class="relative">
  <div>
    <button
      on:click={toggleDropdown}
      class="aspect-square overflow-hidden rounded-full cursor-pointer"
    >
      <img class="object-cover w-full h-full" src={img} alt="Profile" />
    </button>
  </div>

  {#if showDropdown}
    <div
      on:animationend={closeDropdown}
      data-state={isOpen ? 'open' : 'closed'}
      class="border rounded absolute w-64 mt-2 right-0 bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <div class="p-3 border-b text-sm font-bold">My Account</div>

      <ul class="p-1 border-b">
        <li class="text-sm">
          <div class="p-2 text-sm rounded hover:bg-gray-100">Profile</div>
        </li>
        <li class="text-sm">
          <div class="p-2 text-sm rounded hover:bg-gray-100">Settings</div>
        </li>
      </ul>

      <ul class="p-1">
        <li class="text-sm">
          <div class="p-2 text-sm rounded hover:bg-red-100 text-red-600">
            Log Out
          </div>
        </li>
      </ul>
    </div>
  {/if}
</div>
