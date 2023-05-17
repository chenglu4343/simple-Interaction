<script setup lang='ts'>
useHead({
  title: 'HoverCard',
})

const arr = new Array(10).fill(0)
</script>

<template>
  <h2>CSS tricker card</h2>
  <main class="card-container">
    <div v-for="(_, index) of arr" :key="index" class="card" />
  </main>
</template>

<style>
.card-container{
  display: flex;
  align-items: center;
  overflow-x: scroll;
  flex-wrap: nowrap;
  gap: .5rem;
  padding: 20px;
}

.card{
  position: relative;
  min-width: 200px;
  height: 250px;
  background: linear-gradient(85deg,#434343,#262626);;
  border-radius: 10px;
  transition-duration: .3s;
  transition-timing-function: ease-out;
}

.card:not(:first-child){
  margin-left: -50px;
}

.card:hover{
  transform: translate(-.5rem,-1rem) rotate(3deg);
}

.card:not(:last-child):hover + .card{
  margin-left: 0;
}
</style>
