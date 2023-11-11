<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)
const dataArr = ref(Array.from({ length: 5 }).map((_, index) => ({
  id: index,
  title: `item ${index}`,
})))

let currentDragEl: HTMLElement | null = null
let currentDragIndex = -1

function handleDragStart(ev: DragEvent) {
  const { dragEl, dragIndex } = getExactDragData(ev)
  const dragIcon = dragEl?.querySelector('.move-item') as HTMLElement
  const dragIconRect = dragIcon?.getBoundingClientRect()

  // 判断鼠标是否在拖拽图标上
  if (
    dragEl
    && ev.clientX > dragIconRect!.left
    && ev.clientX < dragIconRect!.right
    && ev.clientY > dragIconRect!.top
    && ev.clientY < dragIconRect!.bottom
  ) {
    currentDragEl = dragEl
    currentDragIndex = dragIndex
    dragEl.classList.add('dragging')
    return
  }

  ev.preventDefault()
}

function handleDragEnter(ev: DragEvent) {
  const { dragEl, dragIndex: targetIndex } = getExactDragData(ev)

  if (!dragEl || !currentDragEl || dragEl === currentDragEl)
    return

  const currentDragData = dataArr.value[currentDragIndex]
  dataArr.value = dataArr.value.map((item, index) => {
    if (index === currentDragIndex)
      return null!
    else if (index === targetIndex)
      return targetIndex > currentDragIndex ? [item, currentDragData] : [currentDragData, item]
    else return item
  })
    .filter(Boolean)
    .flat()
  currentDragIndex = targetIndex

  // 如果不是使用响应式框架
  // if (targetIndex > currentDragIndex) {
  //   dragEl.insertAdjacentElement('afterend', currentDragEl)
  //   currentDragIndex = targetIndex
  // }
  // else {
  //   dragEl.insertAdjacentElement('beforebegin', currentDragEl)
  //   currentDragIndex = targetIndex
  // }
}

function handleDragOver(ev: DragEvent) {
  if (currentDragEl)
    ev.preventDefault ()
}

function handleDrop() {
  if (currentDragEl) {
    currentDragEl.classList.remove('dragging')
    currentDragEl = null
    currentDragIndex = -1
  }
}

function getExactDragData(ev: DragEvent) {
  const dragEl = (ev.target as HTMLElement | null)?.closest<HTMLDivElement>('.drag-item')
  const dragIndex = Array.from(containerRef.value?.children ?? []).findIndex(item => item === dragEl)

  return {
    dragEl,
    dragIndex,
  }
}
</script>

<template>
  <ul
    ref="containerRef"
    class="drag-list"
    @dragstart="handleDragStart"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <li v-for="item of dataArr" :key="item.id" draggable="true" class="drag-item">
      <span class="i-ant-design:menu-outlined move-item" />
      <span>
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.drag-list {
  user-select: none;
  list-style: none;
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 0;

  .drag-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &.dragging {
      background-color: #eee;
    }
  }

  .move-item {
    cursor: move;
  }
}
</style>
