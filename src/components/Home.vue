<template>
  <div class="home">
    <h1>神秘寻宝冒险</h1>
    <p>欢迎来到寻宝游戏！登录后即可开始你的冒险之旅</p>
    <router-link to="/login" v-if="!userStore.user">
      <button>开始游戏</button>
    </router-link>
    <router-link to="/game" v-else>
      <button>继续冒险</button>
    </router-link>
    <router-link to="/ranking">
      <button>查看排行榜</button>
    </router-link>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
</script>

<style>
.home {
  text-align: center;
  padding: 50px 20px;
}

.home h1 {
  color: #2e7d32; /* 草绿色调 */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); /* 增加文字阴影提高可读性 */
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.home p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.home button {
  margin: 0 10px 20px;
  padding: 10px 20px;
  font-size: 1rem;
}
</style>