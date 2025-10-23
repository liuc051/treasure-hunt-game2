import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    scores: []
  }),
  actions: {
    login(username) {
      this.user = { username }
      localStorage.setItem('user', JSON.stringify(this.user))
      this.loadScores()
    },
    
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    
    loadScores() {
      const savedScores = localStorage.getItem('treasureHuntScores')
      this.scores = savedScores ? JSON.parse(savedScores) : []
    },
    
    saveScore(score, time) {
      if (!this.user) return
      
      const newScore = {
        username: this.user.username,
        score,
        time,
        date: new Date().toISOString()
      }
      
      this.scores.push(newScore)
      
      // 只保留前100条高分记录
      this.scores.sort((a, b) => b.score - a.score || a.time - b.time)
      if (this.scores.length > 100) {
        this.scores = this.scores.slice(0, 100)
      }
      
      localStorage.setItem('treasureHuntScores', JSON.stringify(this.scores))
    },
    
    getRanking() {
      // 返回排序后的排行榜
      return [...this.scores].sort((a, b) => b.score - a.score || a.time - b.time)
    }
  }
})