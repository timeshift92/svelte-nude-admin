  <nu-card width="400px">
    <nu-grid rows="3" columns="6" gap="1">
      <nu-heading level="4" column="span 5">Order Statistics - August</nu-heading>
      <nu-flex content="space-around" flow="row" column="span 6">
        <nu-flex flow="column">
          <nu-el>24</nu-el>
          <nu-el>pending</nu-el>
        </nu-flex>
        <nu-flex flow="column">
          <nu-el>12</nu-el>
          <nu-el>Shipping</nu-el>
        </nu-flex>
        <nu-flex flow="column">
          <nu-el>23</nu-el>
          <nu-el>Completed</nu-el>
        </nu-flex>
      </nu-flex>
      <nu-flex column="span 2" content="space-between">
        <nu-icon  size="xl" name="archive" />
        <nu-flex flow="column">
          <nu-el>Total orders</nu-el>
          <nu-el>59</nu-el>
        </nu-flex>
      </nu-flex>
    </nu-grid>
  </nu-card>

<script>
  import Chart from 'co/Chart'
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
  }
  import Section from 'co/base/Section.svelte'
</script>
