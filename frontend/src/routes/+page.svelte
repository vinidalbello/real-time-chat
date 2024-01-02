<script lang="ts">
  import { onMount } from "svelte";
  import io from "socket.io-client";

  let socket: any = io("http://localhost:3000");

  let textfield = "";
  let username = "";

  let messages: any = [];

  onMount(() => {
    socket.on("message", (message: any) => {
      messages = [...messages, message];
    });
    socket.on("name", (name: any) => {
      username = name;
    });

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          return registration.pushManager
            .getSubscription()
            .then(async (subscription) => {
              if (subscription) return subscription;
              const response = await fetch(
                "http://localhost:3000/vapidPublicKey",
              );
              const vapidPublicKey = await response.text();
              const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
              });
            });
        })
        .then((subscription) => {
          fetch("http://localhost:3000/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });
        })
        .catch((error) => console.error("Service Worker error", error));
    }

    function urlBase64ToUint8Array(base64String: string): Uint8Array {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  });

  function sendMessage() {
    const message = textfield.trim();
    if (!message) return;

    textfield = "";
    socket.emit("message", message);
  }
</script>

<svelte:head>
  <title>Real Time | Chat</title>
</svelte:head>

<div class="h-screen w-screen bg-darkGray">
  <div class="h-full w-full max-w-md mx-auto bg-lightGray flex flex-col">
    <header
      class="px-6 py-4 border-b border-zinc-800 bg-darkGreen text-white shrink-0 flex items-center justify-between"
    >
      <span class="font-bold text-xl">Real Time Chat</span>
      <span>{username}</span>
    </header>

    <div class="h-full w-full p-4">
      {#each messages as message}
        <div
          class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit"
        >
          <span class="flex items-center space-between gap-4">
            <b>{message.from}</b>
            <i>{message.time}</i>
          </span>
          {message.message}
        </div>
      {/each}
    </div>

    <form
      action="#"
      on:submit|preventDefault={sendMessage}
      class="px-6 py-4 border-t border-zinc-800 bg-darkGreen text-white shrink-0 flex items-center"
    >
      <input
        type="text"
        bind:value={textfield}
        placeholder="Type something..."
        class="bg-transparent mr-5 border-none px-4 py-3 w-full"
      />
      <button
        type="submit"
        class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button
      >
    </form>
    <button>
      <a href="/checkout">Clique aqui para nos ajudar com uma doação</a>
    </button>
  </div>
</div>
