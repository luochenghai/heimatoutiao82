<template>
  <el-card class="material">
     <bread-crumb slot="header">
       <template slot="title"> 素材管理 </template>
     </bread-crumb>
     <!-- 上传图片 -->
     <el-upload  :show-file-list ='false' :http-request = 'uploadImg' action='' class="upload">
        <el-button size='small' type="primary">上传图片</el-button>

     </el-upload>
       <!-- Tabs 标签页 -->
       <el-tabs v-model = "activeName" @tab-click = "changeTab" >
           <el-tab-pane label="全部图片" name="all">
            <!-- 全部收藏显示 -->
            <div class="card-list">
               <el-card  class= 'img-card' v-for = 'item in list ' :key = 'item.id'>
                 <img :src="item.url" >
                 <!-- 删除和收藏图片 -->
                <el-row class= 'operate' type='flex' align='middle' justify = "space-around" >
                   <i @click ='collectOrCancel(item)' :style=" { color:item.is_collected ? 'red':''}" class="el-icon-star-on"></i>
                   <i @click='deleImg(item)' class="el-icon-delete-solid"></i>
                 </el-row>
             </el-card>
            </div>
            <el-row type='flex' justify='center'>
                <el-pagination @current-change = 'changePage' :current-page = "page.page" :page-size = "page.pageSize"   :total = "page.total" background layout="prev, pager, next" ></el-pagination>
              </el-row>
           </el-tab-pane>

           <el-tab-pane label="收藏素材" name="collect">
           <!-- 全部收藏素材显示 -->
            <div class="card-list">
               <el-card  class= 'img-card' v-for = 'item in list ' :key = 'item.id'>
                 <img :src = "item.url" >
             </el-card>
            </div>
             <el-row type='flex' justify='center'>
                <el-pagination @current-change = 'changePage' :current-page= "page.page" :page-size = "page.pageSize"   :total = "page.total" background layout="prev, pager, next" ></el-pagination>
              </el-row>
           </el-tab-pane>

       </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部  点击Tab 切换时 all 和collect 之间切换
      // 定义一个数组用来接受返回的数据
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }

    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      // console.log(params)
      let obj = new FormData()
      obj.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        // data: { image: params.file } /这样上传时不对的，上传文件时 formdata 是一个对象
        data: obj
      }).then(() => {
        this.getMaterial()
      })
    },
    // 删除接口没有返回值，注意大数据处理哪 的json-bigint
    deleImg (item) {
      this.$confirm(`您确定要删除这张图片吗？`, '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(() => {
          //  // 重新加载
          this.getMaterial()
        })
      })
    },
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏这张图片吗？`, '提示').then(() => {
        // 确定收藏或者取消收藏
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`, // 插值表达式 拿到 图片id
          data: { collect: !item.is_collected } // 取反
        }).then(() => {
          // 重新加载
          this.getMaterial()
        })
      })
    },
    changePage (newPage) {
      // current-change 事件被触发时会返回当前页
      this.page.page = newPage
      this.getMaterial()
    },
    changeTab () {
      // this.activeName 是最新页的标签
      // 加载不同类型数据  all 所有数据 collect 去加载收藏数据

      // 当店家tab 切换页时，要默认跳到第一页
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        method: 'get',
        url: '/user/images',
        params: {
          page: this.page.page, // 默认的时第一页
          per_page: this.page.pageSize,
          // collec: false // 不是收藏图片，就是全部
          collect: this.activeName === 'collect' // collect 为false 就是全部数据 collect 为ture 就是查询收藏数据
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 一定要记得调用
    created () {
      this.getMaterial()
    }
  }

}
</script>

<style lang='less' scoped>
   .material{
     .upload{
       position: absolute;
       right: 20px;
       margin-top: -10px;
     }
      .card-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .img-card{
          width: 180px;
          height: 180px;
          margin:10px;
          position: relative;
          // 图片偏了，100% 盛满
          img {
             width: 100%;
             height: 100%;

          }
          .operate{
            position: absolute;
            width: 100%;// 撑满
            height: 30px;
            bottom: 0;
            left:0px;
            font-size: 20px;
            background-color:#f4f5f6;
          }
        }
      }
   }
</style>
