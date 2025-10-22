import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    rankings: JSON.parse(localStorage.getItem('rankings')) || []
  }),
  actions: {
    login(username) {
      // 检查是否已有该用户数据
      const existingUser = JSON.parse(localStorage.getItem('user'))
      if (existingUser && existingUser.username === username) {
        this.user = existingUser
      } else {
        this.user = { username, bestScore: 0, gamesPlayed: 0 }
      }
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    saveScore(score, time) {
      if (!this.user) return
      
      this.user.gamesPlayed++
      if (score > this.user.bestScore) {
        this.user.bestScore = score
      }
      
      // 更新排行榜
      this.rankings.push({
        username: this.user.username,
        score,
        time,
        date: new Date().toISOString()
      })
      
      // 排序并保留前10名
      this.rankings.sort((a, b) => b.score - a.score || a.time - b.time)
      if (this.rankings.length > 10) this.rankings = this.rankings.slice(0, 10)
      
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('rankings', JSON.stringify(this.rankings))
    }
  }
})