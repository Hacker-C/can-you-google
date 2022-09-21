<script lang="ts" setup>
import styles from '@/assets/scss/components/header.module.scss'
import { setState, SE, state } from '@/stores/state'
import { CSSProperties, ref, toRefs, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

const { logo } = toRefs(state)
const objStyle = {
  position: 'relative',
  bottom: '1.05rem'
} as CSSProperties

const showRef = ref<HTMLElement | null>(null)
const isShow = ref(false)
const isClickOutside = useClickOutside(showRef)
watch(isClickOutside, () => {
  if (isClickOutside.value) {
    isShow.value = false
  }
})
const toggleShow = (se?: SE) => {
  isShow.value = !isShow.value
  se && setState(se)
}
const clear = () => {
  history.replaceState(null, 'do you know how to search?', '/')
}
</script>

<template>
  <span :class="styles.clear" @click="clear">clear</span>
  <div :class="styles.drag">
    <div class="clickShow" @click="toggleShow()" ref="showRef">{{ state.se }}</div>
    <div class="show" v-show="isShow">
      <span v-for="se of SE" @click="toggleShow(se)">{{ se }}</span>
    </div>
  </div>
  <div :class="styles.description" :style="{ color: state.themeColor }">
    <span>Do you know</span>
    <div>
      <img :src="logo" alt="logo" :style="state.se === 'baidu' ? objStyle : ''" />
    </div>
    <span>???</span>
  </div>
</template>
