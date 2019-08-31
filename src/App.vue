<template>
  <div id="app">
    <div id="nav">
      <!-- 根组件中放入了导航和路由的承载容器 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
     <router-view> </router-view>
  </div>
</template>

<style lang="less">

</style>
