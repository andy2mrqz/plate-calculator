<script lang="ts">
  import { plates, barWeight, defaultBarWeight, reset } from "./store";
  import { sortedEntries } from "./utils";

  // Initialize total weight to bar weight
  // TODO: Move totalWeight to store
  let totalWeight = $barWeight;
  let isCustomBarWeight = $barWeight !== defaultBarWeight;

  let otherPlateWeight = "";
  let handleAddingOtherPlateWeight = () => {
    if (otherPlateWeight !== "") {
      $plates[otherPlateWeight] = 1;
      otherPlateWeight = "";
    }
  };

  $: if ($barWeight > totalWeight) {
    totalWeight = $barWeight;
  }

  $: totalPossibleWeight =
    $barWeight +
    Object.entries($plates).reduce(
      (acc, [plate, numPairs]) => acc + Number(plate) * numPairs,
      0
    ) *
      2;
</script>

<main>
  <h1>Plate Calculator</h1>

  <strong>Debug</strong>
  <p>Bar weight is {$barWeight}</p>
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
    min={$barWeight}
    step={5}
    bind:value={totalWeight}
  />
  <br />
  <br />
  <br />

  <!-- TODO: Add `open` to store? -->
  <details open>
    <summary>Settings</summary>

    <fieldset>
      <legend>Bar Weight</legend>
      <label>
        <input
          type="radio"
          bind:group={$barWeight}
          name="barWeight"
          value={45}
          on:change={() => (isCustomBarWeight = false)}
        />
        45
      </label>
      <label>
        <input
          type="radio"
          bind:group={$barWeight}
          name="barWeight"
          value={35}
          on:change={() => (isCustomBarWeight = false)}
        />
        35
      </label>
      <label>
        <input
          type="radio"
          bind:group={$barWeight}
          name="barWeight"
          value={25}
          on:change={() => (isCustomBarWeight = false)}
        />
        25
      </label>
      <label>
        <input type="radio" name="barWeight" bind:value={isCustomBarWeight} />
        Other
        {#if isCustomBarWeight}
          <input
            type="number"
            name="barWeight"
            bind:value={$barWeight}
            min={0}
          />
        {/if}
      </label>
    </fieldset>

    <fieldset>
      <legend>Plates</legend>
      {#each sortedEntries($plates, true, false) as [weight]}
        <label>
          {weight} lbs
          <input
            type="number"
            name="numPlatesFor{weight}"
            bind:value={$plates[weight]}
            min={0}
          />
        </label>
        <button
          on:click={() => {
            const { [weight]: _discard, ...newPlates } = $plates;
            plates.set(newPlates);
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
      <br />
      <br />
      <button on:click={reset}>RESET</button>
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
