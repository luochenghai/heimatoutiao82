<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态 :">
        <!-- <el-radio-group v-model="searchForm.status" @change = "changeRadio"> -->
          <!-- <el-radio-group @change = "changeCondition" v-model="searchForm.status" >  -->
            <el-radio-group @change = "getConditionArticle" v-model="searchForm.status" >
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
       <!-- el-select 有个change 事件 -->
      <el-form-item label="频道列表 :">
        <!-- <el-select @change = "changeSelect" v-model = "searchForm.channel_id"> -->
        <!-- <el-select @change = "changeCondition" v-model = "searchForm.channel_id">  二次改进前的-->
        <el-select @change = "getConditionArticle" v-model = "searchForm.channel_id">
           <el-option v-for = " item in channels" :key = "item.id" :label = "item.name" :value = 'item.id'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择 :">
          <!-- {{searchForm.dateRange}} -->
          <!-- 时间也有有事件  change  绑定的也是 @change = "changeCondition" 事件，三者的查询事件是同一个函数-->
        <!-- <el-date-picker @change = "changeCondition" value-format = "yyyy-MM-dd" 二次改进前的 -->
         <el-date-picker @change = "getConditionArticle" value-format = "yyyy-MM-dd"
            v-model = "searchForm.dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 内容页面结构 -->
    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div class="article-item" v-for = "(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <!-- 有的数组为空，要设置默认的图片 length > 0 为true -->
          <img :src="item.cover.images.length ?  item.cover.images[0] : 'defaultImg'" />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <!-- 过滤器 过滤状态 -->
            <el-tag style="width:60px">{{item.status | statusText }}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span @click='modifyItem(item)'>
            <i class="el-icon-edit" style="color:green"></i> 修改
          </span>
          <span @click = "deleImg(item)">
            <i class="el-icon-delete" style="color:red"></i>删除
          </span>
        </div>
      </div>
    </div>
  <!-- 在这里插入分页 -->
    <el-row type ='flex' justify = 'center' style = " margin-top:10px">
        <el-pagination @current-change = 'changePage' :current-page = 'page.page' :page-size = "page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/defaultImg.jpg'),
      searchForm: {
        // 定义一个表单数据对象
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      page: {
        pageSize: 10,
        page: 1,
        total: 0
      }
    }
  },
  methods: {
    //   changeRadio () {
    //     this.$axios({
    //       url: '/articles',
    //       params: {
    //         status: this.searchForm.status === 5 ? null : this.searchForm.status,
    //         channel_id: this.searchForm.channel_id,
    //         begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
    //         end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
    //       }
    //     }).then(res => {
    //       this.list = res.data.results
    //     })
    //   },
    //   // 这个是改变频道时查询的，和 changeRadio 的函数体一样 ，所以二者可以共用一个函数，改下名字即可
    //  changeSelect () {
    //     this.$axios({
    //       url: '/articles',
    //       params: {
    //         status: this.searchForm.status === 5 ? null : this.searchForm.status,
    //         channel_id: this.searchForm.channel_id,
    //         begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
    //         end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
    //       }
    //     }).then(res => {
    //       this.list = res.data.results
    //     })
    //   },

    // changeCondition 和  getArticles 的区别在于有无 params  参数   继续进行封装简化
    // changeCondition () {
    //   this.$axios({
    //     url: '/articles',
    //     params: {
    //       status: this.searchForm.status === 5 ? null : this.searchForm.status,
    //       channel_id: this.searchForm.channel_id,
    //       begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
    //       end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
    //     }
    //   }).then(res => {
    //     this.list = res.data.results
    //   })
    // },
    modifyItem (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    deleImg (item) {
      this.$confirm('您确定要删除这篇文章吗？', '温馨提示').then(() => {
        // item.id 长度超过安全限制 bigNumber 类型   toString() 形成真确结构
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          this.getConditionArticle() // 删除之后，重新拉去
        })
      })
    },
    // 获取 频道信息
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    changePage (newPage) {
      this.page.page = newPage // 把最新页给赋值给当前页
      this.getConditionArticle() // 重新拉去信息
    },

    getConditionArticle () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        // 继续改进后添加  的参数  以下参数是为了满足 分页查询
        page: this.page.page,
        per_page: this.page.pageSize
      }

      // 继续改进
      //  changeCondition () {
      // let params = {
      //   status: this.searchForm.status === 5 ? null : this.searchForm.status,
      //   channel_id: this.searchForm.channel_id,
      //   begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
      //   end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      // }
      // this.$axios({
      //   url: '/articles',
      //   params
      // }).then(res => {
      //   this.list = res.data.results
      // })
      this.getArticles(params)
    },
    // 改进之后的 getArticles 函数就时传入了参数  params
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 所有的页数
      })
    }

    // 原来的getArticles 函数
    // getArticles () {
    //   this.$axios({
    //     url: '/articles'
    //   }).then(res => {
    //     this.list = res.data.results
    //   })
    // }
  },

  // 注意啊
  created () {
    this.getArticles() // 第一次请求文章时，不穿参数 也是可以的
    this.getChannels()
    // this.changeRadio()
  },
  // 定义过滤器 判断 已发表  的 状态    文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'

        case 1:
          return '待审核'

        case 2:
          return '审核通过'

        case 3:
          return '审核失败'
        default :
          break
      }
    }
  }
}
</script>

<style lang='less' scoped>
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100px;
        margin-left: 10px;
        justify-content: space-around;
        .title {
          color: #333;
          font-size: 14px;
        }
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 13px;
      span {
        margin-right: 15px;
        cursor: pointer;
        color: #333;
      }
    }
  }
}
</style>
