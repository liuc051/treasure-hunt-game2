<template>
  <div class="app">
    <AudioControl />
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/game">游戏</router-link> |
      <router-link to="/ranking">排行榜</router-link> |
      <template v-if="userStore.user">
        <router-link to="/user">个人中心</router-link> |
        <button @click="userStore.logout()">退出</button>
      </template>
      <template v-else>
        <router-link to="/login">登录</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useUserStore } from './stores/userStore'
import AudioControl from './components/AudioControl.vue'

const userStore = useUserStore()
</script>

<style>
nav {
  padding: 20px;
  text-align: center;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2e7d32; /* 更鲜艳的草绿色 */
  font-weight: bold;
  font-size: 1.1rem;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
}

nav a.active {
  color: #1b5e20; /* 更深的绿色作为活跃状态 */
  text-decoration: underline;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>