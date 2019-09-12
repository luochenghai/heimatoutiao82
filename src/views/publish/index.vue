<template>
  <el-card>
      <bread-crumb slot = "header">
       <template slot= "title"> 发布文章 </template>
      </bread-crumb>
       <!-- 表格  el-form=> el-form-item => el-input/el-select/el-radio-group -->
       <!-- el-form  model (表单数据对象) rules(校验规则) -->
       <!-- ref="publishForm"  获取这个 是为了 给  发布按钮 -->
       <el-form ref="publishForm"  :model="formData"  :rules ='publishRules' style='margin-left:100px' label-width ="100px">

           <!-- 标题 -->
          <el-form-item prop = "title" label ="标题">
            <el-input  v-model= "formData.title" style="width:400px"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item  prop = "content" label ="内容">
             <!-- <el-input v-model = "formData.content" type='textarea' :row="4"></el-input>  -->
             <!-- 富文本编辑器 -->
             <quill-editor v-model = "formData.content" style='height:400px;width:800px'></quill-editor>
          </el-form-item>
           <!-- 分面 -->
          <el-form-item label ="封面" style = "margin-top:120px"  prop = "cover">
             <!-- 监听radio的改变事件 -->
             <el-radio-group @change = "changeCoverType" v-model= "formData.cover.type" >
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 另起一行 用来放 cover-images 组件 -->
          <el-form-item>
            <!-- @onClickImg= "receiveImg" 自定事件，接受 cover-image 传来的 url  和索引 -->
              <cover-image @onClickImg= "receiveImg" :images = "formData.cover.images">  </cover-image>
          </el-form-item>
          <!-- 频道 -->
          <el-form-item prop='channel_id' label ="频道" style="padding-top:20px">
             <el-select v-model = "formData.channel_id">
               <!-- 循环遍历channels 中存入的查询频道数据 -->
                <el-option v-for = "item in channels" :key = "item.id" :label="item.name"  :value="item.id"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 传入参数为true 是草稿  false 不是草稿 -->
             <el-button @click = "publish(false)" type ="primary">发表文章</el-button>
             <el-button @click = "publish(true)">存入草稿</el-button>
          </el-form-item>
       </el-form>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      channels: [], // 保存查询出来的频道数据
      //  body  参数 是一个表单数据，用一个对象传  里面的参数根据接口文档 都是必须传的
      formData: {
        title: '',
        content: '',
        // 封面类型 -1:自动，0-无图，1-1张，3-3张
        cover: {
          type: 0, //  默认无图
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{
          required: true,
          message: '标题不能为空'
        },
        {
          min: 5,
          max: 30,
          message: '标题的长度必须为5-30个字符之间'
        }],
        content: [{
          required: true,
          message: '内容不能能为空'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空'
        }]
        // cover: [{
        //   validator: // 自定义校验函数
        // }]

      }
    }
  },
  methods: {
    receiveImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 发布文章的封面 cover 改变函数     // 切换封面类型  根据当前类型决定 images结构  images 里面存的是 图片的地址
    changeCoverType () {
      // 封面类型 -1:自动，0-无图，1-1张，3-3张
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = [] // 自动或者无图 没有内容
      }
    },

    // 发布文章  首先要通过 ref 获取 el-from 元素
    // publish () {
    //   this.$refs.publishForm.validate((isOK) => {
    //     if (isOK) {
    //       this.$axios({
    //         method: 'post',
    //         url: '/articles',
    //         params: { draft: false }, // query  型参数为params
    //         data: this.formData // body 型参数  表单数据
    //       }).then(() => {
    //         this.$router.push('/home/articles')
    //       })
    //     }
    //   })
    // },

    // 发布文章  首先要通过 ref 获取 el-from 元素  以下是对发布函数的改进，因为修改和发布的函数提大体相同，只是修改需要的 url和method不同 三元判断
    publish (draft) { //  draft 在这里只是个形参，传递他是为了简写  es6 属性和值 的名字相同可以简写
      this.$refs.publishForm.validate((isOK) => {
      // 只有校验成功之后，采取管是 发布还是修改
        if (isOK) {
          // 获取文章的id 是通过路由路径参数 动态获取
          let { articleId } = this.$route.params
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft }, // query  型参数为params    draft 为 true 是 草稿
            data: this.formData // body 型参数  表单数据
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },

    // 获取修改文章,记得调用
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        // 查询文章接口，的返回参数 和  formData 中定义的一样，直接将返回值赋值给他 而 formData 又绑定了 el-form  数据变化，视图变化
        this.formData = res.data
      })
    },
    // 查询频道数据
    getChannels () {
      this.$axios({
        method: 'get',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels // 获取频道数据之后 循环遍历 显示在<el-option></el-option> 中
      })
    }

  },
  created () {
    // 查询的文章ID 来自路由，在created 中获取 传递给 getArticleById (articleId) 函数
    let { articleId } = this.$route.params
    this.getChannels()
    if (articleId) { // id 如果存在就是在修改文章
      this.getArticleById(articleId)
    }
  }

}
</script>

<style>

</style>
