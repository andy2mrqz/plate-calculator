<script lang="ts">
  let barWeight = 45;
  let otherBarWeight = false;

  // Initialize total weight to bar weight
  let totalWeight = barWeight;
</script>

<main>
  <h1>Plate Calculator</h1>

  <strong>Debug</strong>
  <p>Bar weight is {barWeight}</p>
  <p>Total weight is {totalWeight}</p>
  <strong>End Debug</strong>
  <br />
  <br />
  <br />

  <details>
    <summary> Settings </summary>
    <fieldset>
      <legend>Bar Weight</legend>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={45}
          on:change={() => otherBarWeight = false}
        />
        45
      </label>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={35}
          on:change={() => otherBarWeight = false}
        />
        35
      </label>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={25}
          on:change={() => otherBarWeight = false}
        />
        25
      </label>
      <label>
        <input
          type="radio"
          name="barWeight"
          bind:value={otherBarWeight}
        />
        Other
        {#if otherBarWeight}
          <input type="number" name="barWeight" bind:value={barWeight} />
        {/if}
      </label>
    </fieldset>
  </details>
  <label for="weight">Weight:</label>
  <input
    type="number"
    id="weight"
    name="weight"
    min={barWeight}
    step={5}
    bind:value={totalWeight}
  />
</main>

<style>
  details {
    user-select: none;
    margin-bottom: 1rem;
  }

  details > summary {
    cursor: pointer;
    list-style: none;
  }

  details > summary::-webkit-details-marker /* Safari */ {
    display: none;
  }
</style>
