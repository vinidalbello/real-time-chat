<script lang="ts">
  async function handleCheckout() {
    fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        console.log(res);

        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error("Error during fetching", e);
        console.log();
      });
  }
</script>

<svelte:head>
  <title>Chá de Revelação | Checkout</title>
</svelte:head>

<div class="flex justify-center items-center h-screen bg-lightGray">
  <button
    class="px-6 py-3 bg-darkGreen text-white font-semibold rounded-md hover:bg-lightGreen"
    on:click={handleCheckout}
  >
    Checkout
  </button>
</div>
