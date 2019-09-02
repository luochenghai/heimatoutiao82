<template>
  <div class="layout-aside">
    <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" router>
      <!-- 插入图片 -->
      <div class="logadmi">
        <img src="../../assets/img/logo_admin.png" >
      </div>
      <!-- 首页不需要折叠 -->
      <el-menu-item index='firstpage'>
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
        <el-menu-item index='home/publish'>发表文章</el-menu-item>
        <el-menu-item index='home/articsles'>内容列表</el-menu-item>
        <el-menu-item index='home/comment'>素材管理</el-menu-item>
        <el-menu-item index='home/material'>评论列表</el-menu-item>
      </el-submenu>

      <!-- 折叠菜单 -->
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>

        <!-- 匿名插槽 -->
        <el-menu-item index='fansdata'>图文数据</el-menu-item>
        <el-menu-item index='home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='home/fansimg'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="home/account">
        <i class="el-icon-s-tools"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang = 'less' scoped>
.layout-aside {
  width: 198.5px;
  height: 108.5vh;
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
