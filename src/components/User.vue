<template>
  <div class="user">
    <h2>个人中心</h2>
    <div v-if="userStore.user">
      <p>用户名: {{ userStore.user.username }}</p>
      <p>最佳得分: {{ userStore.user.bestScore }}</p>
      <p>游戏次数: {{ userStore.user.gamesPlayed }}</p>
      <button @click="userStore.logout()">退出登录</button>
      <router-link to="/game">
        <button>继续游戏</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
</script>