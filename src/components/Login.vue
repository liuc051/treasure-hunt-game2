<template>
  <div class="login">
    <h2>登录</h2>
    <div class="form-group">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="username" required>
    </div>
    <button @click="handleLogin">登录</button>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const username = ref('')
const error = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  if (!username.value.trim()) {
    error.value = '请输入用户名'
    return
  }
  
  userStore.login(username.value.trim())
  router.push('/game')
}
</script>

<style>
.login {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  text-align: center;
}
</style>