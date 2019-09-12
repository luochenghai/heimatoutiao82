<template>
  <div class="layout-aside">
      <!-- 插入图片 -->
      <div class="logadmi">
        <!-- <img src="../../assets/img/logo_admin.png" > -->
        <img :src= "collapse ? smallImg : bigImg " >
      </div>
    <!-- :collapse="isCollapse" 该属性决定是否收起 -->
    <el-menu

          background-color="#353b4e"
          text-color="#adafb5"
          :style="{ width:collapse ? '61px' : '201px'}"
          active-text-color="#ffd04b"
          :collapse="collapse" router >
      <!-- 首页不需要折叠 -->
      <el-menu-item index= "/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <!-- 折叠菜单 -->
      <el-submenu index="conent">
        <!-- 具名插槽 传入内容 -->
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>

        <!-- 匿名插槽 -->
        <!-- 注意home前的/ ！！！！！！！！ -->
        <el-menu-item index='/home/publish'>发表文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论管理</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>

      <!-- 折叠菜单 -->
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>

        <!-- 匿名插槽 -->
        <el-menu-item index='/fansdata'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansimg'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// 引入eventBus  完成侧栏的收缩和伸张
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      collapse: false,
      // 侧栏的logo  要转成base64
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  },
  created () {
    // 在创建之前就监听变化
    eventBus.$on('openOrClose', (status) => {
      this.collapse = status
    })
  }
}
</script>

<style lang = 'less' scoped>
.layout-aside {
  /* width: 200px; */
  height: 100vh;
  background-color: #323745;
  .logadmi {
    margin-top: 0px;
    text-align: center;
    background-color: #2e2f32;
    img {
      height: 35px;
    }
  }
  span {
    font-size: 17px;
  }
  .el-menu-item {
    font-size: 16px;
  }
}
</style>
