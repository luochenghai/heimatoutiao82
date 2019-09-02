<template>
  <div id="app">
    <div id="nav">
      <!-- 根组件中放入了导航和路由的承载容器 -->
      <router-link to="/"></router-link>
      <router-link to="/login"></router-link>
      <router-link to="/home"></router-link>
        <router-link to="/home/main-bgc"></router-link>
    </div>
   <router-view> </router-view>
  </div>
</template>

<style lang="less">

</style>
