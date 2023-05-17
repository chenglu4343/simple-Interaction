<script setup lang='ts'>
import { orange } from '@ant-design/colors'
</script>

<template>
  <div class="card-container">
    <div v-for="(color, index) of orange" :key="index" class="card">
      <div class="card-img-container">
        <div
          class="card-img" :style="{
            '--start-color': color,
          }"
        />
      </div>
      <div>{{ color }}</div>
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
  border-radius: 5%;
  overflow: hidden;
}

.card-img{
  width: 100%;
  height: 100%;
  background: radial-gradient(closest-side, var(--start-color), #ebf8e1, #706e6a);
  transition-duration: .3s;
  transition-timing-function: ease-out;
}

.card-img:hover{
  transform: scale(1.2);
}
</style>
