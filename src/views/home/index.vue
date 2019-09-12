<template>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 左侧导航 -->
      <!-- 完善收缩功能'width:200px  改成60px -->
     <el-aside :style="{ width:collapse ? '61px' : '201px'}" style=' background-color:#323745;overflow: hidden;'>
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部内容 -->
        <el-header style="padding:0">
          <layout-header></layout-header>
        </el-header>
        <!-- 中间区域 -->
        <el-main style="padding:0">
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

// 导出去
// import layoutAside from '../../components/home/layout-aside.vue'
// import layoutHeader from '../../components/home/layout-header.vue'

// 引入eventBus  完成侧栏的收缩和伸张
import eventBus from '../../utils/events'
export default { data () {
  return {
    collapse: false
  }
},
created () {
  // 在创建之前就监听变化
  eventBus.$on('openOrClose', (status) => {
    this.collapse = status
  })
},

components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
}
}
</script>

<style>

</style>
