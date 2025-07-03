<script setup lang="ts">
import { useCounter } from '@vueuse/core'
import FakeBtn from './components/FakeBtn.vue'

const { count, inc, dec } = useCounter(0, {
  min: 1,
  max: 10,
})

const debug = ref(false)
</script>

<template>
  <main class="flex flex-col gap-10px">
    <header>
      <span>debug：</span>
      <input v-model="debug" type="checkbox">
    </header>
    <section class="flex gap-30px">
      <div>Count: {{ count }}</div>
      <FakeBtn :debug="debug" @click="inc()">
        <button>inc</button>
      </FakeBtn>
      <FakeBtn :debug="debug" @click="dec()">
        <button>dec</button>
      </FakeBtn>
    </section>
  </main>
</template>
