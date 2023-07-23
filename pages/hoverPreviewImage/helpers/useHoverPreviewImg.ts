import { type MaybeRefOrGetter, toValue } from '@vueuse/core'
import type { CSSProperties } from 'nuxt/dist/app/compat/capi'

export interface OPTIONS {
  imgSrc: MaybeRefOrGetter<string>

  /**
   * container
   * There should be only one img and a hover box in the container
   *
   * and img style {
   *    width: 100%;
   *    height: 100%;
   * }
   */
  /** container element */
  containerRef: MaybeRefOrGetter<HTMLElement | undefined>
  /**
   * containerWidth
   * @default 200
   */
  containerWidth?: MaybeRefOrGetter<Number>
  /**
   * containerHeight
   * @default 200
   */
  containerHeight?: MaybeRefOrGetter<Number>

  // hover
  /**
   * hoverWidth
   * @default 100
   */
  hoverWidth?: MaybeRefOrGetter<Number>
  /**
   * hoverWidth
   * @default 100
   */
  hoverHeight?: MaybeRefOrGetter<Number>
  /**
   * hoverBg
   * @default "rgba(24, 144, 255,.6)"
   */
  hoverBg?: MaybeRefOrGetter<String>

  // preview
  /**
   * previewWidth
   * @default 300
   */
  previewWidth?: MaybeRefOrGetter<Number>
}

export function useHoverPreviewImg(options: OPTIONS) {
  const {
    imgSrc,
    containerRef,
    containerWidth = 200,
    containerHeight = 200,
    hoverWidth = 100,
    hoverHeight = 100,
    previewWidth = 300,
    hoverBg = 'rgba(24, 144, 255,.6)',
  } = options

  const { x, y } = useMouse({
    target: containerRef,
  })

  const mousePosition = computed(() => {
    let minusLeft = 0
    let minusTop = 0
    let containerWidth = Infinity
    let containerHeight = Infinity
    const containerElement = toValue(containerRef)

    if (containerElement) {
      const { pageLeft, pageTop } = getPageLeftAndTop(containerElement)
      minusLeft = pageLeft
      minusTop = pageTop
      containerWidth = containerElement.offsetWidth
      containerHeight = containerElement.offsetHeight
    }

    return {
      mouseX: Math.min(Math.max(toValue(hoverWidth as any) / 2, x.value - minusLeft), containerWidth - toValue(hoverWidth as any) / 2),
      mouseY: Math.min(Math.max(toValue(hoverHeight as any) / 2, y.value - minusTop), containerHeight - toValue(hoverHeight as any) / 2),
    }
  })

  const aspectRatio = computed(() => {
    return toValue(hoverWidth as any) / toValue(hoverHeight as any)
  })

  const containerStyle = computed<CSSProperties>(() => {
    return {
      width: `${toValue(containerWidth)}px`,
      height: `${toValue(containerHeight)}px`,
      cursor: 'move',
      position: 'relative',
    }
  })

  const hoverBoxStyle = computed<CSSProperties>(() => {
    return {
      width: `${toValue(hoverWidth)}px`,
      aspectRatio: aspectRatio.value,
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: toValue(hoverBg as any),
      transform: `translateX(-50%)
                    translateY(-50%)
                    translateX(${mousePosition.value.mouseX}px)
                    translateY(${mousePosition.value.mouseY}px)`,
    }
  })

  const previewBoxStyle = computed<CSSProperties>(() => {
    const previewHeight = toValue(previewWidth as any) / aspectRatio.value

    /** @default 3 */
    const xRatio = toValue(previewWidth as any) / toValue(hoverWidth as any)
    /** @default 3 */
    const yRatio = previewHeight / toValue(hoverHeight as any)

    /** @default 600 */
    const xBgSize = toValue(containerWidth as any) * xRatio
    /** @default 600 */
    const yBgSize = toValue(containerHeight as any) * yRatio

    const xPosition = (mousePosition.value.mouseX - toValue(hoverWidth as any) / 2) * -xRatio
    const yPosition = (mousePosition.value.mouseY - toValue(hoverHeight as any) / 2) * -yRatio

    return {
      width: `${toValue(previewWidth)}px`,
      aspectRatio: aspectRatio.value,
      backgroundImage: `url(${imgSrc})`,
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${xBgSize}px ${yBgSize}px`,
      backgroundPosition: `left ${xPosition}px top ${yPosition}px`,
    }
  })

  return {
    containerStyle,
    hoverBoxStyle,
    previewBoxStyle,
  }
}

/**
 * get offsetTop and offsetLeft to window
 */
function getPageLeftAndTop(element: HTMLElement) {
  let pageLeft = element.offsetLeft
  let pageTop = element.offsetTop
  let parent = element.offsetParent as HTMLElement

  while (parent) {
    pageLeft += parent.offsetLeft
    pageTop += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }

  return {
    pageLeft,
    pageTop,
  }
}
