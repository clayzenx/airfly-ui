<script lang="ts" setup>

const players = useState('players');

fetch('/players.json')
  .then(r => r.json())
  .then(data => players.value = data);

</script>

<template>
  <pre>
  {{ players }}
  </pre>
</template>
