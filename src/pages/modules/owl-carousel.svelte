<div use:slider class="my-slider">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>

<script>
  import { tns } from 'tiny-slider/src/tiny-slider.js'

  function slider(node) {
    tns({
      container: '.my-slider',
      items: 3,
      slideBy: 'page',
      autoplay: true,
    })
  }
</script>

<style lang="scss">
  .tns-outer {
    padding: 0 !important; // remove padding: clientWidth = width + padding (0) = width
    [hidden] {
      display: none !important;
    }
    [aria-controls],
    [data-action] {
      cursor: pointer;
    }
  }
  .tns-slider {
    -webkit-transition: all 0s;
    -moz-transition: all 0s;
    transition: all 0s;
    > .tns-item {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }

  .tns-horizontal {
    &.tns-subpixel {
      white-space: nowrap;
      > .tns-item {
        display: inline-block;
        vertical-align: top;
        white-space: normal;
      }
    }
    &.tns-no-subpixel {
      &:after {
        content: '';
        display: table;
        clear: both;
      }
      > .tns-item {
        float: left;
      }
    }
    &.tns-carousel {
      &.tns-no-subpixel {
        > .tns-item {
          margin-right: -100%;
        }
      }
    }
  }
  .tns-no-calc {
    position: relative;
    left: 0;
  }
  .tns-gallery {
    position: relative;
    left: 0;
    min-height: 1px; // make sure slider container is visible
    // overflow: hidden;
    > .tns-item {
      position: absolute;
      left: -100%;
      -webkit-transition: transform 0s, opacity 0s;
      -moz-transition: transform 0s, opacity 0s;
      transition: transform 0s, opacity 0s;
    }
    > .tns-slide-active {
      position: relative;
      left: auto !important;
    }
    > .tns-moving {
      -webkit-transition: all 0.25s;
      -moz-transition: all 0.25s;
      transition: all 0.25s;
    }
  }
  .tns-autowidth {
    display: inline-block;
  }
  .tns-lazy-img {
    -webkit-transition: opacity 0.6s;
    -moz-transition: opacity 0.6s;
    transition: opacity 0.6s;
    opacity: 0.6;
    &.tns-complete {
      opacity: 1;
    }
  }
  .tns-ah {
    -webkit-transition: height 0s;
    -moz-transition: height 0s;
    transition: height 0s;
  }
  .tns-ovh {
    overflow: hidden;
  }
  .tns-visually-hidden {
    position: absolute;
    left: -10000em;
  }
  .tns-transparent {
    opacity: 0;
    visibility: hidden;
  }

  .tns-fadeIn {
    opacity: 1;
    filter: alpha(opacity=100);
    z-index: 0;
  }
  .tns-normal,
  .tns-fadeOut {
    opacity: 0;
    filter: alpha(opacity=0);
    z-index: -1;
  }

  // *** Fix a viewport issue in initialization
  .tns-vpfix {
    white-space: nowrap;
    > div,
    > li {
      display: inline-block;
    }
  }

  // *** Detecting browser capability ***
  $width: 310px;
  $height: 10px;
  $count: 70;
  $perpage: 3;

  .tns-t {
    &-subp2 {
      margin: 0 auto;
      width: $width;
      position: relative;
      height: $height;
      overflow: hidden;
    }
    &-ct {
      width: (100% * $count / $perpage);
      width: -webkit-calc(100% * #{$count} / #{$perpage});
      width: -moz-calc(100% * #{$count} / #{$perpage});
      width: calc(100% * #{$count} / #{$perpage});
      position: absolute;
      right: 0;
      &:after {
        content: '';
        display: table;
        clear: both;
      }
      > div {
        width: (100% / $count);
        width: -webkit-calc(100% / #{$count});
        width: -moz-calc(100% / #{$count});
        width: calc(100% / #{$count});
        height: $height;
        float: left;
      }
    }
  }
</style>
