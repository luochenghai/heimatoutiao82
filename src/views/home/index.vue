<template>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 左侧导航 -->
      <el-aside style="width:198px">
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
export default {
  components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
