<template>
<!-- 在publish中使用 => publish就是cover-image的父组件   父组件=>子组件 props -->
<!-- 在comments 中的index.js 中全局注册 -->
   <div class="cover-image">
       <!-- 遍历生成图片 -->
       <!-- 注册点击事件 弹出图层 -->
       <div @click= 'showDialog (index)' class= "item-image" v-for = "(item,index) in images" :key ='index'>
           <!-- 如果item 存在  就用item ,不存在就用  defaultImg-->
           <img :src=" item ? item : defaultImg" >
       </div>
       <!-- 图层  :visible  要绑定-->
       <!-- 关闭的属性  事件是close-->
       <el-dialog @close = "dialogVisbile = false" :visible = "dialogVisbile">
           <!-- 素材选择  图片上传   在这里在封装一个组件-->
             <!-- 在这里接受子组件传来的值 -->
           <select-image @onSelectImg = 'receiveImg'></select-image>
       </el-dialog>
   </div>
</template>

<script>
export default {
  // 子组件的props 属性用来接受 父组件的传值  通信
  props: ['images'], // 这里接受publish传来的图片
  data () {
    return {
      // 定义默认的图片
      defaultImg: require('../../assets/img/pic_bg.png'), // 转成base64
      dialogVisbile: false,
      // 选择图片的index
      selectIndex: -1
    }
  },
  methods: {
    // 接受子组件传过来的 图片 url  由于 props: ['images'], // 这里接受publish传来的图片 这个属性在这里只读不能修改
    receiveImg (url) {
      // 传过来的url 在这里不能修改 要传给 cover-image 的负=父组件间 publish 才能修改  上传的时候要待index 不然到了pbulshi 后不知道是数组中的第几个图片
      this.$emit('onClickImg', url, this.selectIndex)

      // 接受完成 关闭 dialog
      this.dialogVisbile = false
    },
    // 显示弹层
    showDialog (index) {
      this.dialogVisbile = true
      // 将当前点击图片 的索引 传递给 data 中的变量  selectIndex
      this.selectIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    .item-image {
       width: 200px;
       height: 200px;
        padding:10px;
         border :1px solid #CCC;
        img {
           width: 100%;
           height: 100%;

        }
    }
}

</style>
