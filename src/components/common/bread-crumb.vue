<template>
<!-- 面包屑组件 => 首页后的内容时活动的=> 定义了一个具名插槽(title) -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 具名插槽  接受 的是测栏的子菜单的名字 -->
         <slot name='title'></slot>
      </el-breadcrumb-item>

    </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
