<script lang="ts" setup>
const connected = useConnected();
const disconnected = useDisconnected();

fetch('/players.json')
  .then(r => r.json())
  .then(data => disconnected.value = data)
  .catch(console.error)

const playerJoin = () => {
  if (!disconnected.value.length) return
  const [joinedPlayer, remainingPlayers] = spliceRandomItem(disconnected.value.filter(({ isBanned }) => !isBanned));
  disconnected.value = remainingPlayers;
  connected.value = [...connected.value, joinedPlayer];
}

const playerDisconnect = () => {
  if (!connected.value.length) return
  const [disconnectedPlayer, remainingPlayers] = spliceRandomItem(connected.value);
  connected.value = remainingPlayers;
  disconnected.value = [...disconnected.value, disconnectedPlayer];
}

const start = () => {
  setInterval(() => {
    setTimeout(() => !!random(0, 1) ? playerJoin() : playerDisconnect(), random(500, 5000))
  }, 1000)
}
start();

</script>

<template>
  <pre>
    {{ connected }}
  </pre>
</template>

<style>
body {
  color: white
}
</style>
