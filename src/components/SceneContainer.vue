<template>
  <div class="scene-container">
    <!-- 开始场景 -->
    <div v-if="currentScene === 'start'" class="scene active">
      <div class="message">你收到一封神秘信件，邀请你参加一场寻宝冒险。准备好开始你的旅程了吗？</div>
      <div class="image-container">
        <img src="/images/letter.jpg" alt="神秘信件" class="image-placeholder">
      </div>
      <button class="start-btn" @click="$emit('start-adventure')">开始冒险</button>
    </div>

    <!-- 全景地图场景 -->
    <div v-if="currentScene === 'panorama'" class="scene active">
      <div class="message">这是寻宝世界的全景地图，点击标记的地点开始探索：</div>
      <div class="image-container panorama-container">
        <img src="/images/panorama-map.jpg" alt="寻宝全景地图" class="image-placeholder">
        <div class="location-marker" style="top: 30%; left: 20%;" @click="$emit('enter-location', 'forest')">东边森林</div>
        <div class="location-marker" style="top: 65%; left: 50%;" @click="$emit('enter-location', 'cave')">南边洞穴</div>
        <div class="location-marker" style="top: 15%; left: 65%;" @click="$emit('enter-location', 'mountain')">西边高山</div>
      </div>
      <button @click="$emit('restart-game')">返回开始</button>
    </div>

    <!-- 游戏场景 -->
    <div v-if="currentScene === 'game'" class="scene active">
      <div class="message">{{ message }}</div>
      <div class="image-container">
        <img :src="`/images/${image}`" :alt="message" class="image-placeholder">
      </div>
      <div class="options">
        <button 
          v-for="opt in options" 
          :key="opt.nextStep"
          @click="$emit('handle-option', opt.nextStep)"
        >
          {{ opt.text }}
        </button>
      </div>
      <button @click="$emit('return-to-panorama')" style="margin-top: 10px;">返回地图</button>
    </div>

    <!-- 成功场景 -->
    <div v-if="currentScene === 'success'" class="scene active">
      <div class="message">恭喜你！你成功找到了传说中的宝藏！</div>
      <div class="image-container">
        <img src="/images/treasure.jpg" alt="宝藏" class="image-placeholder">
      </div>
      <p>你的得分: {{ score }}</p>
      <p>用时: {{ formatTime(time) }}</p>
      <button @click="$emit('restart-game')">再来一次</button>
    </div>

    <!-- 失败场景显示分数 -->
    <div v-if="currentScene === 'failure'" class="scene active">
      <div class="message">{{ failureMessage }}</div>
      <div class="image-container">
        <img :src="`/images/${failureImage}`" :alt="failureMessage" class="image-placeholder">
      </div>
      <p>最终得分: {{ score }}</p>
      <button @click="$emit('restart-game')">重新尝试</button>
    </div>

    <!-- 游戏信息 -->
    <div class="info" v-if="currentScene !== 'start' && currentScene !== 'success' && currentScene !== 'failure'">
      <p>分数: {{ score }}</p>
      <p>用时: {{ formatTime(time) }}</p>
      <p>进度: {{ progress }}%</p> 
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  currentScene: {
    type: String,
    required: true
  },
  message: String,
  image: String,
  options: Array,
  failureMessage: String,
  failureImage: String,
  score: Number,
  time: Number,
  progress: Number
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style>
.scene {
  display: none;
  animation: fadeIn 1s ease-in-out;
}

.scene.active {
  display: block;
}

.image-container {
  width: 100%;
  height: 300px;
  background-color: #eee;
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panorama-container {
  height: 400px;
  position: relative;
}

.image-placeholder {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.location-marker {
  position: absolute;
  width: auto;
  min-width: 80px;
  padding: 5px 10px;
  height: auto;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  z-index: 10;
  font-size: 14px;
}

.options {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.info {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>