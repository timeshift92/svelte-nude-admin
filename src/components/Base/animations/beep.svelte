<div class="beep" />

<style>
  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  .beep {
    position: relative;
  }
  .beep:after {
    content: '';
    position: absolute;
    top: 2px;
    right: 8px;
    width: 7px;
    height: 7px;
    background-color: #ffa426;
    border-radius: 50%;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 1;
  }
</style>
