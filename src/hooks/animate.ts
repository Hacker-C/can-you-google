import { Ref } from 'vue'

// mouse move animation
export function translate(
  obj: Ref<HTMLElement | null>,
  pos: { x: number; y?: number },
  time: number = 1.5
) {
  if (pos.y === undefined) pos.y = 0
  obj.value!.style.transition = `translate ${time}s`
  obj.value!.style.transform = 'translateZ(0)'
  obj.value!.style.translate = `${pos.x}px ${pos.y}px`
}

// the click circle animation
export function circle(x: number, y: number) {
  let pre = document.querySelector('.circle-animate')
  pre && document.body.removeChild(pre)
  const element = document.createElement('div')
  element.style.position = 'fixed'
  element.style.left = `${x - 45}px`
  element.style.top = `${y - 55}px`
  element.classList.add('circle-animate')
  document.body.appendChild(element)
}
