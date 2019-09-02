<template>
  <el-row class="layout-header row-bg" type="flex" justify="space-between">
    <el-col :span="10">
      <i class="el-icon-s-unfold icon"></i>
      <span class="grid-content left">江苏传智播客教育科技集团有限公司</span>
    </el-col>

    <el-col :span="3" class="right">
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : this.defaultImg" />
      <el-dropdown trigger="click" @command="handleMenuItem">
        <!-- 具名插槽 -->
        <span class="el-dropdown-link">
          <span style="font-size:17px ">{{userInfo.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="font-size:15px" command="account">个人信息</el-dropdown-item>
          <el-dropdown-item style="font-size:15px" command="git">git地址</el-dropdown-item>
          <el-dropdown-item style="font-size:15px" command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
// 7黑马头条PC-主页模块-头部信息查询
export default {
  data () {
    return {
      userInfo: {}, // 用户信息是个对象
      defaultImg: require('../../assets/img/avatar.jpg') // 自动转成base64
    }
  },

  methods: {
    // 获取用户信息
    getUserInfo () {
      // 用信息都在缓存中
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: { Authorization: `Bearer ${token}` }  //用axios 拦截器处理了
      }).then(res => {
        console.log(res)
        // this.userInfo = res.data.data//做了拦截响应处理
        this.userInfo = res.data
      })
    },
    // 钩子函数,以进入用户界面之前就获取用户信息
    created () {
      this.getUserInfo()
    },
    handleMenuItem (command) {
      if (command === 'account') {
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao'
      } else {
        // 先清除toekn,调用window的clear 方法清空缓存
        window.localStorage.clear()
        // 然后 跳转到登录页，编程式导航
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.layout-header {
  display: flex;
  align-items: center;
  .icon,
  .left {
    color: darkgrey;
    font-size: 18px;
  }

  .right {
    display: flex;
    align-items: center;
    .head-img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
      border-radius: 50%;
    }
  }
}
</style>
