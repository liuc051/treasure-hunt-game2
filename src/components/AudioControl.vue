<template>
  <div class="audio-controls">
    <button class="audio-btn" @click="toggleMute">
      {{ isMuted ? '🔇' : '🔊' }}
    </button>
    <audio ref="bgmGame" src="/audio/game-bgm.mp3" loop />
    <audio ref="bgmSuccess" src="/audio/success-bgm.mp3" loop />
    <audio ref="bgmFailure" src="/audio/failure-bgm.mp3" loop />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const bgmGame = ref(null)
const bgmSuccess = ref(null)
const bgmFailure = ref(null)
const isMuted = ref(false)
const route = useRoute()
const gameStore = useGameStore()

// 初始化音频设置
onMounted(() => {
  const savedMuteState = localStorage.getItem('audioMuted')
  isMuted.value = savedMuteState === 'true'
  updateMuteState()
  
  // 监听路由变化控制音乐
  watchRouteAndScene()
})

// 监听路由和游戏场景变化
watch([() => route.path, () => gameStore.currentScene], () => {
  watchRouteAndScene()
})

const watchRouteAndScene = () => {
  if (route.path === '/game') {
    if (gameStore.currentScene === 'success') {
      playSuccessBgm()
    } else if (gameStore.currentScene === 'failure') {
      playFailureBgm()
    } else {
      playGameBgm()
    }
  } else {
    stopAll()
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  updateMuteState()
  localStorage.setItem('audioMuted', isMuted.value)
}

const updateMuteState = () => {
  if (bgmGame.value) bgmGame.value.muted = isMuted.value
  if (bgmSuccess.value) bgmSuccess.value.muted = isMuted.value
  if (bgmFailure.value) bgmFailure.value.muted = isMuted.value
}

const playGameBgm = () => {
  stopOtherBgm('game')
  if (!isMuted.value && bgmGame.value) {
    bgmGame.value.play().catch(e => console.log('游戏背景音乐播放失败:', e))
  }
}

const playSuccessBgm = () => {
  stopAll()
  if (!isMuted.value && bgmSuccess.value) {
    bgmSuccess.value.play().catch(e => console.log('胜利音乐播放失败:', e))
  }
}

const playFailureBgm = () => {
  stopAll()
  if (!isMuted.value && bgmFailure.value) {
    bgmFailure.value.play().catch(e => console.log('失败音乐播放失败:', e))
  }
}

const stopOtherBgm = (keepType) => {
  if (keepType !== 'game' && bgmGame.value) {
    bgmGame.value.pause()
    bgmGame.value.currentTime = 0
  }
  if (keepType !== 'success' && bgmSuccess.value) {
    bgmSuccess.value.pause()
    bgmSuccess.value.currentTime = 0
  }
  if (keepType !== 'failure' && bgmFailure.value) {
    bgmFailure.value.pause()
    bgmFailure.value.currentTime = 0
  }
}

const stopAll = () => {
  if (bgmGame.value) {
    bgmGame.value.pause()
    bgmGame.value.currentTime = 0
  }
  if (bgmSuccess.value) {
    bgmSuccess.value.pause()
    bgmSuccess.value.currentTime = 0
  }
  if (bgmFailure.value) {
    bgmFailure.value.pause()
    bgmFailure.value.currentTime = 0
  }
}
</script>

<style>
.audio-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}

.audio-btn {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>