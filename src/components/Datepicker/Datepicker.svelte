{#if Flatpickr}
  <svelte:component
    this={Flatpickr}
    options={flatpickrOptions}
    bind:value={date}
    element={'#' + element_id}
    placeholder="optional placeholder"
    on:change={(event) => handleChange(event.detail[0][0])}>
    <div class="flatpickr" id={element_id}>
      <input class="date"  type="text" placeholder="Select Date.." data-input />

    </div>
  </svelte:component>
{/if}

<script context="module">
let counter = -1
const getCounter = () => counter++;
</script>

<script>
	let Flatpickr
	import Russian from 'flatpickr/dist/l10n/ru.js'
  import 'flatpickr/dist/flatpickr.css'
  import 'flatpickr/dist/themes/light.css'
  import { onMount } from 'svelte'
  onMount(async () => {
		const module = await import('svelte-flatpickr')
		import ('flatpickr/dist/flatpickr.css')
  	import ('flatpickr/dist/themes/light.css')
    Flatpickr = module.default
  })

  let element_id = `picker-${getCounter()}`;
  export let date = new Date()
  const flatpickrOptions = {
    element: `#${element_id}`,
    enableTime: true,
    altInputClass: 'date',
    locale: Russian.ru,
    dateFormat: 'l, F j, Y  H:i',
  }

  function handleChange(selectedDates) {
    date = selectedDates.toLocaleDateString().split('.').reverse().join('-') + selectedDates.getDate() + 'T' + selectedDates.toLocaleTimeString() + '.000Z'
  }
</script>

<style>
  .date {
    padding: 10px 20px;
    border: 1px solid var(--white-02);
    display: block;
    text-align: center;
    width: 300px;
    text-decoration: none;
    cursor: pointer;
    background: var(--white);
    border-radius: 7px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }

  :global(.flatpickr-calendar) {
    border: 1px solid var(--l-grey-1);
  }
  :global(.flatpickr-months .flatpickr-month) {
    background: var(--bg-color);
  }
  :global(.flatpickr-current-month .flatpickr-monthDropdown-months) {
    background: var(--bg-color);
    color: var(--black);
  }
  :global(.flatpickr-current-month) {
    color: var(--black);
  }
  /* :global(.flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month){
    color: var(--black)
  }
  :global(.flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month):hover {
    color: var(--l-grey-1)
  } */
  :global(.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month) {
    background: var(--white);
  }
  :global(.flatpickr-innerContainer .flatpickr-weekdays) {
    background: var(--white);
    color: var(--black);
  }
  :global(.flatpickr-innerContainer .flatpickr-weekday) {
    background: var(--white);
    color: var(--black);
  }
  :global(.dayContainer) {
    background-color: var(--bg-color);
  }
  :global(.flatpickr-days) {
    border: none;
  }
  :global(.flatpickr-days .flatpickr-day) {
    color: var(--black);
  }
  :global(.flatpickr-day):hover {
    color: var(--white);
  }
  :global(.dayContainer .nextMonthDay) {
    color: var(--l-grey-h-3);
  }
  :global(.flatpickr-innerContainer) {
    border: none;
  }
  :global(.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time) {
    border-top: 1px solid var(--l-grey-1);
    border-bottom: none;
    border-left: none;
    border-right: none;
    color: var(--black);
    background: var(--white);
  }
  :global(.flatpickr-time input) {
    color: var(--black);
  }
  :global(.flatpickr-time input):hover {
    background: var(--bg-color);
  }
  :global(.flatpickr-time .flatpickr-time-separator, .flatpickr-time .flatpickr-am-pm) {
    color: var(--black);
  }
</style>
