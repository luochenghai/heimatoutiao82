<template>
  <el-card>
    <!--bread-crumb  面包屑组件时全局注册的，在这里不需要引入，可以直接使用 -->
    <!-- 在面包屑里定义了具名插槽，在这里传入要显示的 “评论列表” 四字，指定插槽名即可 -->
    <!-- slot="header" 这个具名插槽时 elmeen-ui 自己分装定义的具名插槽，作用是： 首页 》评论列表 下加了一条横线-->
    <bread-crumb slot="header">
      <!-- 面包屑 具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>

    <!-- 表格 需要数据 ：data -->
    <el-table  v-loading="loading" :data="list">
      <!-- label 绑定表头 -->
      <!-- formatter 时 el-table-column的属性  label(表头名称)  prop(字段名)-->
      <!-- formatter 时el-table-colunm 的属性 用来格式化内容 Function(row, column, cellValue, index) 该函数返回括号内的容 -->
      <el-table-column width="700" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>

      <el-table-column label="操作">
        <!-- 作用域插槽  slot-scope 是row column index 的属性集合 element-ui 已经将 子组件 的的数据row 绑定到 :row = row (父子组件通信，在父组件
        中通过 slot-scope 属性设置一个对象obj 就可以拿到row 里的内容)-->
        <template slot-scope="obj">
          <el-button  size="small" type="text">修改评论</el-button>
          <!-- <el-button type='text' size='small'>打开/关闭{{}}</el-button> -->
          <el-button
            @click="openOrClose(obj.row)"

            size="small"
            :style="{ color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
             type="text"
          >{{ obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 在table 下设置分页 -->
     <!-- 剧中 采用flex布局 -->
     <el-row type="flex" justify='center' style='margin:10px 0' >
         <!-- 直接从elment-ui拷贝过来的 -->
         <!-- 分页组件 current-page 当前页 page-size 每页显示条目个数 total总页数  current-change 点击事件，返回值是当前页-->
         <el-pagination @current-change='changePage' :current-page='page.curPage' :page-size='page.pageSize' :total="page.total" background layout="prev, pager, next" ></el-pagination>
     </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分开写不好，用对象包裹
      page: {
        curPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 页面改变时 获取数据
    changePage (newPage) {
      // 给当前页码最新值
      this.page.curPage = newPage
      this.getComments() // 获取最新页数据
    },
    openOrClose (row) {
      // 要有这种思想: 用三元表达式来获取两种可能的状态
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论?`, '提示').then(() => {
        // 调用接口实现打开和关闭评论
        this.$axios({
          method: 'put',
          url: '/comments/status', //
          params: { article_id: row.id.toString }, // 传递articleId参数
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getComments()// 成功之后，重新拉取数据 前后台实现同步
        })
      })
    },
    // formatter(row, column, cellValue, index) 可以直接拿到 行数据的属性 评论状态
    // 里面可以 return 出要显示的内容
    // el-table-column =>formatter(row) => 自定义显示内容 => 根据数据状态来确定返回内容
    formatter (row) {
      // console.log(row) 查看row 行 上数据的
      return row.comment_status ? '正常' : '关闭'
    },

    getComments () {
      this.loading = true // 请求之前为ture
      // query 参数 相当于get 参数 路径参数， url 参数 params
      // body 路劲参数 data

      this.$axios({
        method: 'get',
        url: '/articles',
        // response_type 响应数据类型   返回数据的字段，不传返回用于内容管理的字段，
        // 传 comment 返回用于评论管理的字段，传statistic 返回用于图文数据的字段
        params: { response_type: 'comment', page: this.page.curPage, per_page: this.page.pageSize }
      }).then(res => {
        this.loading = false // 响应之后为false
        console.log(res.data)
        // results 注意后面的s ，少s 拿到数据
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  // 钩子函数，调用getCommets函数 获取数据
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
