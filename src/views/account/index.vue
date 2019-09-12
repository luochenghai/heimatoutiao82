<template>
  <el-card v-loading = "loading">
      <bread-crumb slot='header'>
         <template slot='title'>
             账户信息
         </template>
      </bread-crumb>
      <!-- 上传头像 将头像包裹在upload 中-->
      <el-upload  action="" :show-file-list= "false" :http-request = "uploadImg">
        <img class="header" :src= "userInfo.photo ? userInfo.photo : defaultHeaderImg" alt="">
      </el-upload>
      <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
          <el-form-item label="用户名" prop="name">
              <el-input v-model="userInfo.name" style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input v-model="userInfo.intro" style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email" style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="userInfo.mobile" style='width:300px' disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="saveUserInfo" type='primary'>保存</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
// evenetbus 实质就是一个 共享的vue 实例  定义在utils 中 完成非纯父子关系的组件之间的通信
import eventBus from '../../utils/events.js'
export default {
  data () {
    return {
      defaultHeaderImg: require('../../assets/img/header.jpg'),
      loading: false,
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名长度必须为4-8位'
        }],
        email: [{
          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    uploadImg (params) {
      // 开始上传之前
      this.loading = true
      let formData = new FormData()
      formData.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: formData
      }).then(() => {
        // 上传之后
        this.loading = false
        eventBus.$emit('updateUserInfo') // 上传头像时也打电话触发事件在layout-header中将监听大
        this.getUserInfo()
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    saveUserInfo () {
      this.$refs.userForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({ type: 'success', message: '恭喜您保存用户信息成功' })
            // 当保存用户信息这个事件被触发后 执行eventBus
            eventBus.$emit('updateUserInfo') // 相当于打出去一个电话,接电话的一段在 header 部分
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
  .header{
    width: 200px;
    height: 200px;
    position: absolute;
    margin-left: 500px;
    border-radius: 50%;

  }
</style>
