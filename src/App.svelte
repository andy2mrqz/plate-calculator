<script lang="ts">
  let barWeight = 45;
  let otherBarWeight = false;

  // Initialize total weight to bar weight
  let totalWeight = barWeight;

  let plates = {
    55: 1,
    45: 1,
    35: 1,
    25: 1,
    15: 1,
    5: 1,
    2.5: 1,
  };
  let otherPlateWeight = "";
  let handleAddingOtherPlateWeight = () => {
    if (otherPlateWeight !== "") {
      plates[otherPlateWeight] = 1;
      otherPlateWeight = "";
    }
  };

  // Sort plates descending
  $: sortedPlates = Object.entries(plates).sort(
    ([plateA, _a], [plateB, _b]) => {
      return Number(plateA) > Number(plateB) ? -1 : 1;
    }
  );

  $: totalPossibleWeight =
    barWeight +
    Object.entries(plates).reduce(
      (acc, [plate, numPairs]) => acc + Number(plate) * numPairs,
      0
    ) *
      2;
</script>

<main>
  <h1>Plate Calculator</h1>

  <strong>Debug</strong>
  <p>Bar weight is {barWeight}</p>
  <p>Total weight is {totalWeight}</p>
  <p>Total possible weight is {totalPossibleWeight}</p>
  <strong>End Debug</strong>
  <br />
  <br />
  <br />

  <label for="weight">Total Weight:</label>
  <input
    type="number"
    id="weight"
    name="weight"
    min={barWeight}
    step={5}
    bind:value={totalWeight}
  />
  <br />
  <br />
  <br />

  <details open>
    <summary> Settings </summary>

    <fieldset>
      <legend>Bar Weight</legend>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={45}
          on:change={() => (otherBarWeight = false)}
        />
        45
      </label>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={35}
          on:change={() => (otherBarWeight = false)}
        />
        35
      </label>
      <label>
        <input
          type="radio"
          bind:group={barWeight}
          name="barWeight"
          value={25}
          on:change={() => (otherBarWeight = false)}
        />
        25
      </label>
      <label>
        <input type="radio" name="barWeight" bind:value={otherBarWeight} />
        Other
        {#if otherBarWeight}
          <input type="number" name="barWeight" bind:value={barWeight} />
        {/if}
      </label>
    </fieldset>

    <fieldset>
      <legend>Plates</legend>
      {#each sortedPlates as [weight]}
        <label>
          {weight} lbs
          <input
            type="number"
            name="numPlatesFor{weight}"
            bind:value={plates[weight]}
            min={0}
          />
        </label>
        <button
          on:click={() => {
            delete plates[weight];
            plates = plates;
          }}>delete</button
        >
        <br />
      {/each}
      <label>
        Other plate size:
        <input
          class="no-arrows"
          type="number"
          min={0.01}
          name="otherPlateWeight"
          placeholder="100 lbs"
          bind:value={otherPlateWeight}
          on:keypress={({ key }) =>
            key === "Enter" && handleAddingOtherPlateWeight()}
        />
      </label>
      {#if otherPlateWeight !== ""}
        <button on:click={handleAddingOtherPlateWeight}>add</button>
      {/if}
    </fieldset>
  </details>
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
