<template>
  <div class="audio-control">
    <button @click="toggleAudio">
      {{ isPlaying ? '暂停背景音乐' : '播放背景音乐' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audio = ref(null)

onMounted(() => {
  audio.value = new Audio('/audio/background.mp3')
  audio.value.loop = true
  // 尝试自动播放，但浏览器通常会阻止
  audio.value.play().catch(() => {
    console.log('自动播放被浏览器阻止，请手动点击播放')
  })
})

const toggleAudio = () => {
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlaying.value = !isPlaying.value
}
</script>

<style>
.audio-control {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.audio-control button {
  background-color: rgba(76, 175, 80, 0.8);
  padding: 8px 12px;
  font-size: 0.9rem;
}
</style>