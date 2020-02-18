
<script>
const list = [1,2,3]
export let color = '#3ff9dc'
</script>

<style>
  @keyframes pulse {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0.25;
      transform: scale(0.75);
    }
  }
  .pulse-bubble-1 {
    animation: pulse 0.4s ease 0s infinite alternate;
  }
  .pulse-bubble-2 {
    animation: pulse 0.4s ease 0.2s infinite alternate;
  }
  .pulse-bubble-3 {
    animation: pulse 0.4s ease 0.4s infinite alternate;
  }
</style>

<nu-flex items="center" content="center" height="100%" width="100%">
    <nu-el  class="pulse-bubble-1"  width="20px" height="20px" radius="50%" fill={color}/>
    <nu-el  class="pulse-bubble-2"  width="20px" height="20px" radius="50%" fill={color}/>
    <nu-el  class="pulse-bubble-3"  width="20px" height="20px" radius="50%" fill={color}/>
</nu-flex>
