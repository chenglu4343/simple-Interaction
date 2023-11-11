interface Navigation {
  name: string
  path: string
}

export const navigation: readonly Navigation[] = [
  { name: 'Slide color', path: '/slideColor' },
  { name: 'Hover card', path: '/hoverCard' },
  { name: 'Rotate img', path: '/rotateImg' },
  { name: 'Hover Preview Image', path: '/hoverPreviewImage' },
  { name: 'Drag effect', path: '/dragEffect' },
]
