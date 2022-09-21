import { ref, onMounted, onUnmounted, Ref } from 'vue'

export default function useClickOutside(elmentRef: Ref<null | HTMLElement>): Ref {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elmentRef.value) {
      if (!elmentRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = true
      } else {
        isClickOutside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
