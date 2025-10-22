<template>
  <div class="login">
    <h2>登录</h2>
    <input 
      v-model="username" 
      placeholder="请输入用户名"
      @keyup.enter="handleLogin"
    >
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const username = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  if (username.value.trim()) {
    userStore.login(username.value.trim())
    router.push('/game')
  }
}
</script>

<style>
.login {
  text-align: center;
  padding: 50px 20px;
}

.login h2 {
  margin-bottom: 30px;
  color: #2e7d32; /* 草绿色调 */
  font-size: 2rem;
}

.login input {
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 300px;
  font-size: 1rem;
}

.login button {
  padding: 10px 20px;
  font-size: 1rem;
}
</style>