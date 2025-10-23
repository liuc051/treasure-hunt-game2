<template>
  <div class="user">
    <h2>个人中心</h2>
    <div class="user-info">
      <h3>欢迎，{{ userStore.user?.username }}！</h3>
      <p>你的最佳记录：</p>
      <div v-if="bestScore">
        <p>最高得分：{{ bestScore.score }}</p>
        <p>用时：{{ formatTime(bestScore.time) }}</p>
        <p>日期：{{ formatDate(bestScore.date) }}</p>
      </div>
      <p v-else>暂无游戏记录</p>
    </div>
    <div class="user-scores">
      <h3>你的历史记录</h3>
      <table>
        <thead>
          <tr>
            <th>得分</th>
            <th>用时</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in userScores" :key="index">
            <td>{{ score.score }}</td>
            <td>{{ formatTime(score.time) }}</td>
            <td>{{ formatDate(score.date) }}</td>
          </tr>
          <tr v-if="userScores.length === 0">
            <td colspan="3" class="no-data">暂无记录</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="userStore.logout(); router.push('/')">退出登录</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

userStore.loadScores()

const userScores = computed(() => {
  if (!userStore.user) return []
  return userStore.scores.filter(score => score.username === userStore.user.username)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const bestScore = computed(() => {
  if (userScores.value.length === 0) return null
  return [...userScores.value].sort((a, b) => b.score - a.score || a.time - b.time)[0]
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<style>
.user {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.user-info {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.user-scores table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.no-data {
  text-align: center;
  padding: 20px;
}

.user button {
  margin-top: 20px;
}
</style>