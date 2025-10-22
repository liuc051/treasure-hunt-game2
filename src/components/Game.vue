<template>
  <div class="game">
    <SceneContainer 
      :current-scene="gameStore.currentScene"
      :message="gameStore.message"
      :image="gameStore.image"
      :options="gameStore.options"
      :failure-message="gameStore.failureMessage"
      :failure-image="gameStore.failureImage"  
      :score="gameStore.score"
      :time="gameStore.time"
      :progress="gameStore.progress"
      @start-adventure="gameStore.goToScene('panorama')"
      @enter-location="handleLocation"
      @handle-option="handleOption"
      @return-to-panorama="gameStore.goToScene('panorama')"
      @restart-game="handleRestart"
    />
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { useUserStore } from '../stores/userStore'
import SceneContainer from './SceneContainer.vue'

const gameStore = useGameStore()
const userStore = useUserStore()

const handleLocation = (location) => {
  gameStore.handleLocation(location)
}

const handleOption = (nextStep) => {
  gameStore.handleLocation(nextStep)
}

const handleRestart = () => {
  // 无论成功还是失败都保存分数
  if (gameStore.currentScene === 'success' || gameStore.currentScene === 'failure') {
    userStore.saveScore(gameStore.score, gameStore.time)
  }
  gameStore.restart()
}
</script>