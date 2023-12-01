/**
 * 返回一个setValue函数，通过函数赋值，数组的更新会分片进行
 */
export function useTimeSharingRef<T>(arrRef: Ref<Array<T>>, getKey: (item: T) => any = (item: T) => item) {
  const ADD_COUNT = 100
  const DEL_COUNT = 200
  /** 简单的时序🔒 */
  let invokeNum = 0
  /** 需要被新增的值 */
  const needAddMap: Map<any, T> = new Map()
  /** 需要被删除的key值 */
  const needDeleteSet = new Set()

  /**
   * 覆盖原有的值，但是会逐步替换
   */
  function setValue(newArr: Array<T>) {
    const currentNum = ++invokeNum

    // 1 .原先的值如果不在新的数组中，就加入删除map中
    needDeleteSet.clear()
    const newKeySet = new Set(newArr.map(getKey))
    arrRef.value.forEach((item) => {
      if (newKeySet.has(item))
        return
      needDeleteSet.add(getKey(item))
    })

    // 2. 新加的值如果原先没有，加入添加map中
    const currentKeySet = new Set(arrRef.value.map(getKey))
    needAddMap.clear()
    newArr.forEach((item) => {
      const newKey = getKey(item)
      if (currentKeySet.has(newKey))
        return
      needAddMap.set(getKey(item), item)
    })

    _loadNext()

    function _loadNext() {
      if ((needAddMap.size || needDeleteSet.size) && currentNum === invokeNum) {
        if (needDeleteSet.size) {
          const currentDeleteArr = Array.from(needDeleteSet).slice(0, DEL_COUNT)
          const currentDeleteSet = new Set(currentDeleteArr)
          arrRef.value = arrRef.value
            .filter(item => !currentDeleteSet.has(getKey(item)))
          currentDeleteArr.forEach(delKey => needDeleteSet.delete(delKey))
        }

        if (needAddMap.size) {
          const currentAddEntries = Array.from(needAddMap.entries()).slice(0, ADD_COUNT)
          currentAddEntries.forEach((addEntry) => {
            needAddMap.delete(addEntry[0])
            arrRef.value.push(addEntry[1])
          })
        }

        requestAnimationFrame(_loadNext)
      }
    }
  }

  return {
    setValue,
  }
}
