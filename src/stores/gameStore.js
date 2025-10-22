// src/stores/gameStore.js
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentScene: 'start',
    message: '',
    image: '',
    options: [],
    score: 0,
    time: 0,
    timer: null,
    failureMessage: '',
    failureImage: '', // 添加失败图片路径状态
    exploredScenes: new Set(),
    progress: 0,
    totalScenes: 13 // 总场景数量
  }),
  actions: {
    startTimer() {
      this.stopTimer()
      this.timer = setInterval(() => {
        this.time++
      }, 1000)
    },
    
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    
    goToScene(scene) {
      this.currentScene = scene
      if (scene === 'game' || scene === 'panorama') {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    },
    
    async handleLocation(location) {
      this.options = [{ text: '加载中...', nextStep: '' }]
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 记录已探索场景并更新进度
        this.exploredScenes.add(location)
        this.progress = Math.round((this.exploredScenes.size / this.totalScenes) * 100)
        
        const scenes = {
          // 基础场景
          forest: {
            message: "你在森林深处发现了一个古老的石碑，上面刻着奇怪的符号...",
            image: "stone-tablet.jpg",
            options: [
              { text: "尝试破译符号", nextStep: "decipher" },
              { text: "忽略符号继续前进", nextStep: "forest-path" }
            ]
          },
          cave: {
            message: "洞穴深处有一个地下湖，湖中有一艘小船...",
            image: "underground-lake.jpg",
            options: [
              { text: "乘船探索湖中心", nextStep: "boat-ride" },
              { text: "沿湖岸寻找线索", nextStep: "lake-shore" }
            ]
          },
          mountain: {
            message: "山顶有一座废弃的天文台，里面似乎有什么东西...",
            image: "observatory.jpg",
            options: [
              { text: "检查望远镜", nextStep: "telescope" },
              { text: "搜索房间角落", nextStep: "observatory-search" }
            ]
          },
          
          // 森林子场景
          'forest-path': {
            message: "你沿着小路来到一个瀑布前，发现瀑布后面有个洞口！",
            image: "waterfall-cave.jpg",
            options: [
              { text: "进入瀑布后的洞穴", nextStep: "treasure-cave" }
            ]
          },
          'decipher': {
            message: "符号指引你找到了一个隐藏的通道！",
            image: "hidden-passage.jpg",
            options: [
              { text: "进入通道", nextStep: "treasure-passage" }
            ]
          },
          
          // 洞穴子场景
          'boat-ride': {
            message: "湖中心有个小岛，岛上有个宝箱！",
            image: "island-treasure.jpg",
            options: [
              { text: "打开宝箱", nextStep: "open-treasure" }
            ]
          },
          'lake-shore': {
            message: "你在湖岸岩石下发现了一把钥匙，似乎能打开某个门...",
            image: "lake-key.jpg",
            options: [
              { text: "返回乘船探索湖中心", nextStep: "boat-ride" }
            ]
          },
          
          // 高山子场景
          'telescope': {
            message: "望远镜指向山谷中的一块巨石，看起来很不寻常...",
            image: "telescope-view.jpg",
            options: [
              { text: "前往山谷查看巨石", nextStep: "mountain-valley" }
            ]
          },
          'observatory-search': {
            message: "你在角落找到一张日记，记录着巨石的秘密...",
            image: "observatory-diary.jpg",
            options: [
              { text: "前往山谷查看巨石", nextStep: "mountain-valley" }
            ]
          },
          
          // 宝藏场景
          'treasure-cave': { isTreasure: true },
          'treasure-passage': { isTreasure: true },
          'open-treasure': { isTreasure: true },
          'mountain-valley': { isTreasure: true }
        }
        
        // 随机失败概率
        if (Math.random() < 0.3 && !scenes[location]?.isTreasure) {
          const failures = {
            forest: {
              message: "你在森林中迷失了方向，被野兽包围了！",
              image: "forest-failure.jpg"
            },
            cave: {
              message: "洞穴突然塌方，你被困住了！",
              image: "cave-failure.jpg"
            },
            mountain: {
              message: "山上发生雪崩，你没能躲过...",
              image: "mountain-failure.jpg"
            },
            "forest-path": {
              message: "你忽略符号后走错方向，陷入满是荆棘的灌木丛！",
              image: "bush-failure.jpg"
            },
            "decipher": {
              message: "你误解了符号的意思，闯入了毒蛇的巢穴！",
              image: "snake-failure.jpg"
            },
            "boat-ride": {
              message: "船漏水了，你掉进了冰冷的湖水中！",
              image: "boat-failure.jpg"
            },
            "lake-shore": {
              message: "你在湖岸踩到湿滑的青苔，摔入深水区！",
              image: "lake-failure.jpg"
            },
            "telescope": {
              message: "望远镜镜片模糊，你看错了山谷方向，走到了悬崖边缘！",
              image: "cliff-failure.jpg"
            },
            "observatory-search": {
              message: "你碰倒了生锈的仪器，被掉落的零件砸伤！",
              image: "instrument-failure.jpg"
            }
          };
          
          const failure = failures[location] || {
            message: `在${location}探险失败了！`,
            image: "default-failure.jpg"
          };
          
          throw {
            message: failure.message,
            image: failure.image
          };
        }
        
        if (scenes[location]?.isTreasure) {
          // 计算最终得分
          const baseScore = 100
          const progressScore = this.progress
          const timeBonus = Math.max(0, 50 - Math.min(50, Math.floor(this.time / 10)))
          this.score += baseScore + progressScore + timeBonus
          this.goToScene('success')
        } else {
          // 探索得分
          const sceneDepth = location.split('-').length
          const sceneScore = 10 * sceneDepth
          this.score += sceneScore
          
          this.message = scenes[location].message
          this.image = scenes[location].image
          this.options = scenes[location].options
          this.currentScene = 'game'
        }
      } catch (error) {
        // 失败时保留70%分数
        this.score = Math.round(this.score * 0.7)
        this.failureMessage = error.message
        this.failureImage = error.image || "default-failure.jpg" // 保存失败图片路径
        this.goToScene('failure')
      }
    },
    
    restart() {
      this.stopTimer()
      this.currentScene = 'start'
      this.score = 0
      this.time = 0
      this.message = ''
      this.image = ''
      this.options = []
      this.failureMessage = ''
      this.failureImage = '' // 重置失败图片
      this.exploredScenes.clear()
      this.progress = 0
    }
  }
})