<script setup lang="ts">
import styles from '@/assets/scss/components/main.module.scss'
import { computed, onMounted, ref, toRefs } from 'vue'
import { translate, circle } from '@/hooks/animate'
import { state, setState, SE } from '@/stores/state'
import Footer from '@/components/Footer.vue'

const { se, seLink, themeColor } = toRefs(state)

// the elements
const mouseRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const buttonRef = ref<HTMLInputElement | null>(null)
const linkRef = ref<HTMLInputElement | null>(null)

const keyword = ref('')
let timer: NodeJS.Timer
let openTimer: NodeJS.Timer
let inputTimer: NodeJS.Timer
const searchKW = ref('')
const openFlag = ref(true)
const showLink = ref(false)

// record the latest palce of the mouse img
const leftRecord = ref(0)
const topRecord = ref(0)

const autoInputWords = () => {
  let i = 0
  timer = setInterval(() => {
    keyword.value += searchKW.value[i++] ?? ''
    if (i >= searchKW.value.length) {
      clearInterval(timer)
      const buttonLeft = buttonRef.value!.offsetLeft + buttonRef.value!.offsetWidth / 2
      leftRecord.value = buttonLeft
      translate(mouseRef, { x: buttonLeft, y: topRecord.value })
    }
  }, 150)
}

// start to do the actions
const startup = () => {
  const params = new URLSearchParams(location.search)
  const wd = params.get('wd')
  const se = params.get('se')
  searchKW.value = wd!
  if (!wd && !se) return
  const left = formRef.value!.offsetLeft
  const top = formRef.value!.offsetTop + formRef.value!.offsetHeight / 2
  translate(mouseRef, { x: left, y: top })
  leftRecord.value = left
  topRecord.value = top
}

// the actions after the transition end
const cbs = [
  () => {
    circle(leftRecord.value, topRecord.value)
    inputTimer = setTimeout(() => {
      inputRef.value?.focus()
      autoInputWords()
      clearTimeout(inputTimer)
    }, 1000)
  },
  () => {
    circle(leftRecord.value, topRecord.value)
    openTimer = setTimeout(() => {
      location.href = seLink.value + keyword.value
      clearTimeout(openTimer)
    }, 1000)
  }
]

// control the step of the callback
let k = 0
// after the transiton end, do the action
const onTransitionEnd = () => {
  if (!openFlag.value) {
    return
  }
  cbs[k++]()
  textIndex.value++
}

// stop the actions to search
const stop = () => {
  textIndex.value = 0
  showLink.value = !showLink.value
  openFlag.value = false
  clearInterval(timer)
  clearInterval(openTimer)
  clearInterval(inputTimer)
  mouseRef.value!.style.translate = `10px 10px`
}

// if the url includes kw and se params, do it
onMounted(() => {
  let se = new URLSearchParams(location.search).get('se')
  setState(se as SE)
  const timer = setTimeout(() => {
    startup()
    clearTimeout(timer)
  }, 1500)
})

// click to search
const handleSubmit = () => {
  if (!keyword.value) return
  k = 0
  textIndex.value = 0
  showLink.value = false
  openFlag.value = true
  history.pushState(null, 'can you google?', `/?wd=${keyword.value}&se=${se.value}`)
  keyword.value = ''
  startup()
}

// get the url link
const link = () => {
  return location.href
}

// the steps to serach
const steps = [
  '1. move your mouse to inputbox',
  '2. input the keyword',
  '3. click the button to google'
]
const textIndex = ref(0)
const step = computed(() => steps[textIndex.value])
</script>

<template>
  <main class="container">
    <img
      ref="mouseRef"
      :class="styles.mouse"
      src="@/assets/img/mouse.svg"
      alt="mouse"
      @transitionend="onTransitionEnd" />
    <div :class="styles['form-wrapper']">
      <form ref="formRef" :class="styles['form-submit']" :style="{ backgroundColor: themeColor }">
        <input
          ref="inputRef"
          type="text"
          placeholder="input something to search"
          v-model="keyword" />
        <button ref="buttonRef" @click.prevent="handleSubmit">Let's go</button>
      </form>
    </div>
    <div :class="styles.step">{{ step }}</div>
    <div :class="styles.info">
      <button @click="stop">Stop! I know how to do.</button>
    </div>
    <div :class="styles['link-area']" v-show="showLink">
      <div>
        <div :class="styles.tip">Here is the link, click and copy it to send to others:</div>
        <div ref="linkRef" :class="styles.link" target="_blank" :style="{ color: themeColor }">
          {{ link() }}
        </div>
        <Footer />
      </div>
    </div>
  </main>
</template>
