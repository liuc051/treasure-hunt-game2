<template>
  <div class="ranking">
    <h2>寻宝排行榜</h2>
    <table>
      <tr>
        <th>排名</th>
        <th>玩家</th>
        <th>分数</th>
        <th>用时</th>
      </tr>
      <tr v-for="(item, i) in userStore.rankings" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.score }}</td>
        <td>{{ formatTime(item.time) }}</td>
      </tr>
    </table>
    <router-link to="/">
      <button>返回首页</button>
    </router-link>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style>
table { width: 100%; border-collapse: collapse; margin: 20px 0; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #4CAF50; color: white; }
</style>