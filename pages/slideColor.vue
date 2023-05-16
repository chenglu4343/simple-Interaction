<script setup lang="ts">
import { blue, cyan, geekblue, gold, green, lime, magenta, orange, purple, red, volcano, yellow } from '@ant-design/colors'

const colors = {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
}
</script>

<template>
  <div class="colors-container">
    <div v-for="[colorName, colorArr] of Object.entries(colors)" :key="colorName">
      <h5>{{ colorName }}</h5>
      <div class="color-item-container">
        <div
          v-for="(color, index) of colorArr"
          :key="color"
          class="color-item"
          :style="{
            '--text-color': index > 4 ? '#fff' : 'rgba(0, 0, 0, 0.85)',
            '--bg-color': color,
          }"
        >
          <span>
            {{ `${colorName}-${index + 1}` }}
          </span>
          <span class="text-color">
            {{ color }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.colors-container{
  --indent-width: 12px;
  --bd-radius: 5px;
  --duration: .3s;
  --transform-mode : ease-out;

  box-sizing: border-box;
  height: fit-content;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  cursor: pointer;
}
.color-item{
  transition-duration: var(--duration);
  transition-timing-function: var(--transform-mode);

  background-color: var(--bg-color);
  color: var(--text-color);
  margin-right: var(--indent-width);

  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-item:first-child{
  border-radius: var(--bd-radius) var(--bd-radius) 0 0;
}
.color-item:last-child{
  border-radius: 0 0 var(--bd-radius) var(--bd-radius);
}

.color-item:hover{
  --indent-width:0;
  border-radius: 0 var(--bd-radius) var(--bd-radius) 0;
}

.text-color{
  --left: 5px;
  position: relative;
  opacity: 0;
  left: var(--left);
  transition-duration: var(--duration);
  transition-timing-function: var(--transform-mode);
}

.color-item-container:hover .text-color{
  opacity: 1;
  left: 0;
}
</style>
