<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)
const dataArr = ref(Array.from({ length: 5 }).map((_, index) => ({
  id: index,
  title: `item ${index}`,
})))

// 记录拖拽的元素和索引
let currentDragEl: HTMLElement | null = null
let currentDragIndex = -1

// PC端拖拽实现

function handleDragStart(ev: DragEvent) {
  const { dragEl, dragIndex } = getExactDragData(ev.target as any)
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
  dealEnter(ev.target as any)
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

// 移动端拖拽实现
let dragCloneEl: HTMLElement | null = null
let startLeft = 0
let startTop = 0
let startClientX = 0
let startClientY = 0

function handleTouchStart(ev: TouchEvent) {
  const { dragEl, dragIndex } = getExactDragData(ev.target as any)

  if (!dragEl)
    return

  currentDragEl = dragEl
  currentDragIndex = dragIndex
  const rect = dragEl.getBoundingClientRect()
  dragCloneEl = dragEl.cloneNode(true) as HTMLElement
  dragCloneEl.style.position = 'fixed'
  dragCloneEl.style.top = `${rect.top}px`
  dragCloneEl.style.left = `${rect.left}px`
  dragCloneEl.style.width = `${rect.width}px`
  dragCloneEl.style.height = `${rect.height}px`
  dragCloneEl.style.zIndex = '999'
  dragCloneEl.style.opacity = '0.7'
  dragCloneEl.style.transition = 'none'
  dragCloneEl.style.pointerEvents = 'none'

  startTop = rect.top
  startLeft = rect.left
  startClientX = ev.touches[0].clientX
  startClientY = ev.touches[0].clientY

  containerRef.value?.appendChild(dragCloneEl)
}

function handleTouchMove(ev: TouchEvent) {
  if (!dragCloneEl)
    return

  const { clientX, clientY } = ev.touches[0]
  const moveX = startClientX - clientX
  const moveY = startClientY - clientY

  dragCloneEl.style.left = `${startLeft - moveX}px`
  dragCloneEl.style.top = `${startTop - moveY}px`

  // 计算dragEnter进入的元素
  const el = document.elementFromPoint(clientX, clientY)
  dealEnter(el)
}

function handleTouchEnd() {
  currentDragEl = null
  currentDragIndex = -1
  dragCloneEl?.remove()
  dragCloneEl = null
}

/**
 * 工具函数，获取元素对应的drag元素和索引
 *  */
function getExactDragData(el: Element | null) {
  const dragEl = el?.closest<HTMLDivElement>('.drag-item')
  const dragIndex = Array.from(containerRef.value?.children ?? []).findIndex(item => item === dragEl)

  return {
    dragEl,
    dragIndex,
  }
}

/**
 * 工具函数，处理拖拽过程移入事件，交换对应元素的位置
 */
function dealEnter(enterElement: Element | null) {
  const { dragEl, dragIndex: targetIndex } = getExactDragData(enterElement)

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
</script>

<template>
  <ul
    ref="containerRef"
    class="drag-list"
    @dragstart="handleDragStart"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
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
