<script lang="ts" setup>
const connected = useConnected();
const disconnected = useDisconnected();
let showingPlayer = useState<Player>('player');

fetch('/players.json')
  .then(r => r.json())
  .then(data => disconnected.value = data)
  .catch(console.error)

const playerJoin = () => {
  if (!disconnected.value.length) return
  const [joinedPlayer, remainingPlayers] = spliceRandomItem(disconnected.value.filter(({ isBanned }) => !isBanned));
  disconnected.value = remainingPlayers;
  joinedPlayer.status = 'connected';
  connected.value = [...connected.value, joinedPlayer];
}

const playerDisconnect = () => {
  if (!connected.value.length) return
  const [disconnectedPlayer, remainingPlayers] = spliceRandomItem(connected.value);
  connected.value = remainingPlayers;
  disconnectedPlayer.status = 'disconnected';
  disconnected.value = [...disconnected.value, disconnectedPlayer];
}

const showPlayer = (id: number) => {
  showingPlayer.value = [...connected.value, ...disconnected.value].find(player => player.id === id)
}
const ban = (id: number) => {
  connected.value = connected.value.filter(player => player.id !== id);
  disconnected.value = disconnected.value.filter(player => player.id !== id);
  showingPlayer.value = null;
}

const start = () => {
  setInterval(() => {
    setTimeout(() => !!random(0, 1) ? playerJoin() : playerDisconnect(), random(500, 5000))
  }, 2000)
}
start();

</script>

<template>
  <div class="flex justify-between h-screen w-creen">

    <div class="flex flex-col items-center w-1/3 gap-2 mt-2">
      <h3 class="text-grey">Connected</h3>
      <section class="flex flex-col gap-2 p-2 w-full">
        <span class="border border-primary p-2 rounded cursor-pointer" v-for="player in connected" :key="player.id"
          @click="() => showPlayer(player.id)">
          {{ player.name }}
        </span>
      </section>
      <h3 class="text-grey">Disonnected</h3>
      <section class="flex flex-col gap-2 p-2 w-full">
        <span class="border border-grey p-2 rounded cursor-pointer text-grey" v-for="player in disconnected"
          :key="player.id" @click="() => showPlayer(player.id)">
          {{ player.name }}
        </span>
      </section>
    </div>


    <div class="flex flex-col gap-2 border border-grey bg-purple-light rounded p-2 w-full w-1/4" v-if="showingPlayer">
      <span :class="showingPlayer.status === 'connected' ? 'text-primary' : 'text-grey'">
        {{ showingPlayer.name }} <span class="w-10 h-10 bg-primary"></span>
      </span>
      <button class="bg-error rounded border border-grey" @click="() => ban(showingPlayer.id)">Ban</button>
    </div>

  </div>
</template>


<style>
body {
  background-color: #191825;
  color: #fff
}
</style>

