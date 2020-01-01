<script>
  export let label, type, value, placeholder, error, autocomplete, min ;
</script>

<div class="w-1/3">
  <label
    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    for="grid-last-name">
    {label}
  </label>
  <input
    class="appearance-none block w-full bg-gray-200 text-gray-700 border {error ? 'border-red-500' : 'border-gray-200'}
    rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
    focus:border-gray-500"
    bind:value
    {min}
    {...type=='number'? {step:0.01}:''}
    {...type ? { type: type } : ''}
    {autocomplete}
    {placeholder} />
  {#if error}
    <p class="text-red-500 text-xs italic">{error}</p>
  {/if}
</div>