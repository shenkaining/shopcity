<template>
  <div class="pagination">

    <button :disabled="pageNo == 1" @click="currentPage(pageNo-1)">上一页</button>
    <button :class=" pageNo==1?'active':''"  v-if="start_endPage.start>1" @click="currentPage(1)">1</button>
    <button v-if="start_endPage.start>=3">···</button>
    <!-- v-for可以变量Number，从1开始 -->
    <i v-for="num in start_endPage.end" :key="num">
      <!-- 根据父组件传过来的pageNo 判断按钮是否被选中 加上背景色 -->
    <button :class="num == pageNo?'active':''"  v-if="num>=start_endPage.start" @click="currentPage(num)">{{num}}</button>
    </i>

    <button v-if="start_endPage.end<endPage-1">···</button>
    <button  v-if="start_endPage.end<endPage" @click="currentPage(endPage)">{{endPage}}</button>
    <button :disabled="pageNo == endPage" @click="currentPage(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{totalData}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 接收父组件传递过来的 ‘当前页’、‘所有数据数量’、‘每页的数量’、‘中间连续显示的页数’
  props: ['pageNo', 'totalData', 'pageSize', 'continue'],
  computed: {
    // 计算总的页数（向上取整）
    endPage () {
      return Math.ceil(this.totalData / this.pageSize)
    },
    // 计算连续分页器的 起始页、结束页
    start_endPage () {
      let start = this.pageNo - parseInt(this.continue / 2)
      let end = this.pageNo + parseInt(this.continue / 2)
      if (this.continue > this.endPage) {
        // 特殊情况：总页数小于连续页数5，最后的页数应该是 总页数
        start = 1
        end = this.endPage
      } else {
        // 正常情况，但起始页不能小于1，要出现... 那起始页就要 >=3
        if (start < 3) {
          // 连续分页的起始项小于1时，显示的应该是 1,2,3,4,5
          start = 1
          end = this.continue
        }
        // 正常情况，但结束页不能小于31，要出现... 那结束页就要 <=29
        if (end > this.endPage - 2) {
          // 连续分页的结束项大于31时，显示的应该是 27,28,29,30,31
          start = this.endPage - this.continue + 1
          end = this.endPage
        }
      }
      return { start, end }
    }
  },
  methods: {
    currentPage (num) {
      this.$emit('currentPage', num)
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

    }
     .active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
  }
</style>
