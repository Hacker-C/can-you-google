import { reactive } from 'vue'
import baiduImg from '@/assets/img/baidu.png'
import googleImg from '@/assets/img/google.png'
import mdnImg from '@/assets/img/mdn.png'

export const state = reactive<Props>({
  se: 'google',
  logo: googleImg,
  seLink: 'https://google.com/search?q=',
  themeColor: '#4285f4'
})

export enum SE {
  google = 'google',
  mdn = 'mdn',
  BAIDU = 'baidu'
}

interface Props {
  se: string
  logo: string
  seLink: string
  themeColor: string
}

const table: Record<SE, Props> = {
  google: {
    se: 'google',
    logo: googleImg,
    seLink: 'https://google.com/search?q=',
    themeColor: '#4285f4'
  },
  mdn: {
    se: 'mdn',
    logo: mdnImg,
    seLink: 'https://developer.mozilla.org/en-US/search?q=',
    themeColor: '#1a1a1a'
  },
  baidu: {
    se: 'baidu',
    logo: baiduImg,
    seLink: 'https://baidu.com/s?wd=',
    themeColor: '#2319dc'
  }
}

export const setState = (se: SE) => {
  let item = table[se]
  for (let key in item) {
    state[key as keyof typeof state] = item[key as keyof typeof item]
  }
}
