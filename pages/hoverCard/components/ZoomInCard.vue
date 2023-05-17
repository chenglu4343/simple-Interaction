<script setup lang='ts'>
const arr = Array.from({ length: 10 }).map((item, index) => (`item${index + 1}`))
</script>

<template>
  <div class="card-container">
    <div v-for="(title, index) of arr" :key="index" class="card">
      <div class="card-img-container">
        <div class="card-img" />
      </div>
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<style scoped>
.card-container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
}

.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.card-img-container{
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.card-img{
  width: 100%;
  height: 100%;
  background: radial-gradient(closest-side, #23b11e, #ebf8e1, #706e6a);
  transition-duration: .3s;
  transition-timing-function: ease-out;
}

.card-img:hover{
  transform: scale(1.2);
}
</style>
