<template>
  <div class="login">
      <!-- <div> Login </div> -->
    <el-card class="box-card">
       <div  class='logo'>
        <img src="../../assets/img/logo_index.png" alt="黑马头条"/>
       </div>
        <!-- 数据校验，先要给el-form 一个model 属性，表示需要绑定的数据对象  rule属性绑定的是校验规则  ref 获取表单DOM元素-->
        <el-form ref='loginForm' :model='loginForm' :rules='loginRules' >
            <!-- porp属性设置需要校验的字段名即可 -->
            <el-form-item prop='mobile'>
                <el-input v-model="loginForm.mobile" placeHolder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item prop='code'>
                <el-input  v-model="loginForm.code" placeHolder="请输入验证码" style='width:280px'></el-input>
                <el-button style="float:right">发送验证码</el-button>
            </el-form-item>

            <el-form-item>
                <el-checkbox  v-model="loginForm.check" :checked="true" >我已经阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>

            <el-form-item>
              <el-button @click="login" type='primary' style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // validate 任一表单项被校验后触发
    let validate = function (rule, value, callBack) {
      if (value) {
        callBack() // 为true直接通过
      } else {
        callBack(new Error('您必须无条件的同意该条款！'))
      }
    }
    return {
      // 需要绑定在验证的表单数据对象，在el-from中的model 属性绑定表单数据对象
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      // 定义校验规则 表单时根据规则去校验的，由要有规则
      // key(字段名):value (数组对象，有多个，就是校验规则)
      // el-form 中的 rules属性绑定数据的校验规则
      loginRules: {
        mobile: [{
          required: true, // 必填项
          message: '手机号不能为空'
        }, {
          // 正则表达式
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不正确'
        }],
        code: [{
          required: true, // 必填项
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码必须为6位'
        }],
        check: [{
          validate
        }]
      }
    }
  },
  methods: {
    login () {
      // 通过el-form组件的valiate方法 校验整个表单数据
      // 传入一个回调函数 isOK为true， 说明所有的检验规则成功了
      // 为false 说明有误
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          // $axios 中data中的放置body 参数，params 是放置地址参数
          this.$axios({
            url: '/authorizations',
            method: 'post',

            data: this.loginForm
          }).then(res => {
            // console.log(res.data.data.token)
            console.log(res.data.token)
            // 放到前端的缓存中
            // window.localStorage.setItem('user-token', res.data.data.token)
            window.localStorage.setItem('user-token', res.data.token)
            // 编程时导航
            this.$router.push('/') // 另一种写法
            // this.$router.push('/')
          })
          // 如果出错了，给出提示信息
          // .catch(() => {
          //   this.$message({
          //     message: '手机号或者验证码错误',
          //     type: 'warning'
          //   })
          // })  // 在axios.config 中 统一处理了错误
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>// 在单文件组件中，如果要在style 标签中使用诸如less sass 需要在style 标签上给lang属性赋值
//默认的vue单文件组件的style样式时全局的，需要设置scoped 属性，只对当前自己的html起作用
 .login{
     background-image: url('../../assets/img/login_bg.jpg');
    //占据当前可视区域全部
    height: 100vh;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    .box-card {
        width:440px;
        height: 350px;
    .logo {
      text-align:center;
        img {
            display: block;
            width: 200px;
            margin: 10px auto;
        }
    }
  }
}
</style>
