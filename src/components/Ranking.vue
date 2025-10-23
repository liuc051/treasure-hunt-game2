<template>
  <div class="ranking">
    <h2>寻宝排行榜</h2>
    <table>
      <thead>
        <tr>
          <th>排名</th>
          <th>用户名</th>
          <th>得分</th>
          <th>用时</th>
          <th>日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in ranking" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ score.username }}</td>
          <td>{{ score.score }}</td>
          <td>{{ formatTime(score.time) }}</td>
          <td>{{ formatDate(score.date) }}</td>
        </tr>
        <tr v-if="ranking.length === 0">
          <td colspan="5" class="no-data">暂无记录</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

// 加载排行榜数据
userStore.loadScores()

const ranking = computed(() => userStore.getRanking())

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
.ranking {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
</style>