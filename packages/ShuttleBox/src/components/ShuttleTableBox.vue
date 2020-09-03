<template>
  <div class="shuttle-column">
    <h1>表格式穿梭框</h1>
    <p class="btns" v-if="ifUseClearBtn"><el-button @click="handlerClearClick">清除</el-button></p>
    <div class="transfer-colomn">
      <div class="transfer-colomn-left" :style="{'width': ltWidth}">
        <el-table
          :data="originDate"
          border
          v-loading="dateLoading"
          :height="tableHeight"
          ref="listTable"
          highlight-current-row
          :row-class-name="tableRowClassName"
          :row-style="changeTrStyle"
          @row-dblclick="handleDbRowClick"
          @row-click="handleCurrentRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :selectable="ifCheckboxCanUse"
            width="40">
          </el-table-column>
          <el-table-column
            v-for="(info, index) in leftListHeader" :key="index"  :prop="info.key"
            :label="info[tableShowName.label]"
            :min-width="info.width"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <p>{{scope.row[info.key]}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="transfer-icons">
        <p @click="handleTransferRightClick"><i class="el-icon-arrow-right"></i></p>
        <p class="to-left"  @click="handleTransferLeftClick"><i class="el-icon-arrow-left"></i></p>
      </div>
      <div class="transfer-colomn-right" :style="{'width': rtWidth}">
        <el-table
          :data="shuttledDate"
          border
          :height="tableHeight"
          highlight-current-row
          @row-dblclick="handleDbRebackRowClick"
          @row-click="handleCurrentRowRebackClick"
          @selection-change="handleSelectionRebackChange"
          class="quota-checked-table"
        >
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            v-for="(info, index) in rightListHeader" :key="index"  :prop="info.key"
            :label="info[tableShowName.label]"
            :min-width="info.width"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <p>{{scope.row[info.key]}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import shuttleDate from '../../../../examples/mock/shuttleData.json'
export default {
  data () {
    return {
      tableHeight: '520', // 表格高度
      rtWidth: '400px', // 右侧表格宽度
      ltWidth: '400px', // 左侧表格宽度
      tableShowName: {  // 表格标题显示内容参数替换
        label: 'label'
      },
      rowKeyName: 'labtestIndexCode', // 穿梭列表的关键字
      rightListHeader: [
        {
          label: '服务代码',
          width: '120',
          key: 'labtestIndexCode'
        }, {
          label: '服务名称',
          width: '180',
          key: 'labtestIndexName'
        },
      ],
      leftListHeader: [
        {
          label: '服务代码',
          width: '120',
          key: 'labtestIndexCode'
        }, {
          label: '服务名称',
          width: '210',
          key: 'labtestIndexName'
        }
      ],
      dateLoading: false,
      originDate: [],
      shuttledDate: [],
      checkedQuotaList: [],
      hasTransferedList: [],
      rebackQuotaList: [],
      pageSize: 100,
      pageNo: 0,
      totleSize: '',
      getIndex: '',
      ifClearCheckedItem: false,
      clearedNums: 0,
      ifUseClearBtn: false
    }
  },
  props: {
    quotaListGet: {
      type: Array,
      default: () => {
        return []
      }
    },
    addClickFlag: {  
      type: Boolean,
      default: false
    },
    ifUseScroll: {  // 是否启用列表滚动加载
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 编辑时穿梭框初始化
    quotaListGet: {
      handler (val) {
        this.shuttledDate = val
        this.checkedQuotaList = val
        this.hasTransferedList = val
        setTimeout(() => {
          if (this.originDate.length) {
            this.originDate.map(item => {
              this.shuttledDate.map(info => {
                if (item[this.rowKeyName] === info[this.rowKeyName]) {
                  info.hasCheck = true
                  info.hasTranfered = true
                  item.hasCheck = true
                  item.hasTranfered = true
                  this.getIndex = item.index
                }
              })
            })
          }
        }, 500)
        if (!this.shuttledDate.length) {
          if (this.originDate.length) { // 切换服务类型时置空检验指标列表
            this.originDate.map(item => {
              item.hasCheck = false
              item.hasTranfered = false
            })
          }
        }
        console.log(val, this.shuttledDate, '编辑回显一下')
      },
      immediate: true
    },
    // 监听addClickFlag变化=>显示之前的选中项（打开穿梭框初始化）
    addClickFlag: {
      async handler (val) {
        this.searchDate = {}
        this.originDate = []
        this.pageNo = 0
        this.originDate = shuttleDate.data// 获取检验字典列表
        // 高亮显示已选择的检验指标
        this.shuttledDate = this.quotaListGet
        this.checkedQuotaList = this.quotaListGet
        this.hasTransferedList = this.quotaListGet
        setTimeout(() => {
          if (this.originDate.length) {
            this.originDate.map(item => {
              this.shuttledDate.map(info => {
                if (item[this.rowKeyName] === info[this.rowKeyName]) {
                  info.hasCheck = true
                  info.hasTranfered = true
                  item.hasCheck = true
                  item.hasTranfered = true
                  this.getIndex = item.index
                }
              })
            })
          }
        }, 500)
        // 清除表格单击之后的高亮效果
        let tableRef = document.getElementsByClassName('current-row')[0]
        let arr = []
        if (tableRef) {
          arr = tableRef.className.split(' ')
          arr.map((item, index) => {
            if (item === 'current-row') arr.splice(index, 1)
          })
          document.getElementsByClassName('current-row')[0].className = arr.join(' ')
        }
        console.log(tableRef, val)
      },
      immediate: true
    },
    // 监听到的shuttledDate传出
    shuttledDate:{
      handler(arr) {
        console.log(arr)
        this.$emit('curCheckedShuttleDates', arr)
      },
      immediate:true,
      deep:true
    },
    // 是否需要清除所有选中结果
    clearedNums: {
      handler(val) {
        if(val && this.ifClearCheckedItem) { this.ClearHasCheckedItems() }
      },
      immediate: true
    }
  },
  created () {
    this.originDate = shuttleDate.data
    setTimeout(()=>{ if(this.ifUseScroll) this.tableListScroll() })
  },
  methods: {
    // 表格启用滚动加载
    tableListScroll() {
      if(!this.$refs.listTable) return
      this.$refs.listTable.bodyWrapper.addEventListener('scroll', (res) => {
        let height = res.target
        let clientHeight = height.clientHeight
        let scrollTop = height.scrollTop
        let scrollHeight = height.scrollHeight
        let num = 0
        if (clientHeight + scrollTop >= scrollHeight) {
          num ++
          this.$emit('useScrollLoadList', num)
          console.log('需滚动加载并传递出num',num)
        }
      }, true)
    },
    handlerClearClick() {
      this.ifClearCheckedItem = true
      this.clearedNums ++
    },
    // 清除选中项
    ClearHasCheckedItems() {
      this.$set(this, 'shuttledDate', []) // 清空选中的列表
      this.$set(this, 'checkedQuotaList', []) // 清空存放选中项的列表
      this.$set(this, 'hasTransferedList', []) // 清空存放选中项的列表
      let arr = JSON.parse(JSON.stringify(this.originDate))
      arr.map(item=>{
        item.hasCheck = false
        item.hasTranfered = false
      })
      this.originDate = arr
    },
    // 取消弹框
    handleAddQuotaCancelClick () {
      this.$emit('cancelAddDone', false)
    },
    // 确认新增的指标
    handeleAddQuotaClick () {
      this.$emit('comfirmAddQuota', this.shuttledDate)
    },
    // 穿梭至右侧
    handleTransferRightClick () {
      let arr = JSON.parse(JSON.stringify(this.originDate))
      if (this.checkedQuotaList.length) {
        if (arr.length) {
          arr.map(info => {
            this.checkedQuotaList.map(item => {
              if (info[this.rowKeyName] === item[this.rowKeyName]) info.hasTranfered = true
            })
          })
        }
      }
      this.originDate = arr
      this.hasTransferedList = this.hasTransferedList.concat(this.checkedQuotaList)
      this.shuttledDate = Array.from(new Set(this.hasTransferedList))
      // console.log(this.shuttledDate, this.hasTransferedList, 'dddddd')
    },
    // 穿梭返回
    handleTransferLeftClick () {
      // console.log(this.rebackQuotaList, this.shuttledDate)
      let arr = JSON.parse(JSON.stringify(this.originDate))
      if (this.rebackQuotaList.length) {
        if (arr.length) {
          arr.map(info => {
            this.rebackQuotaList.map(item => {
              if (info[this.rowKeyName] === item[this.rowKeyName]) info.hasTranfered = false
            })
          })
        }
      }
      this.originDate = arr
      let rebackArr = JSON.parse(JSON.stringify(this.rebackQuotaList))
      let rebackArrId = []
      rebackArr.map(item => {
        rebackArrId.push(item[this.rowKeyName])
      })
      this.shuttledDate = this.shuttledDate.filter(item => {
        return !new Set(rebackArrId).has(item[this.rowKeyName])
      })
      // 撤回同时撤回进入的数组值
      this.hasTransferedList = this.shuttledDate
      console.log(this.hasTransferedList, this.checkedQuotaList)
      // this.shuttledDate.splice(this.shuttledDate.findIndex(item => item.labtestIndexCode === rebackArr[0].id))
    },
    // 选择行发生变化
    handleCurrentRowClick (row, column) {
     // this.checkedQuotaList = []
      let checkedArr = []
      let curCheckedList = this.shuttledDate.filter(item=>item[this.rowKeyName] === row[this.rowKeyName])
      if(curCheckedList.length > 0) {
        row.hasCheck = true
      } else {
        row.hasCheck = false
      }
      if (!row.hasCheck) {
        row.hasCheck = true
        checkedArr.push(row)
      }
      this.checkedQuotaList = this.checkedQuotaList.concat(checkedArr)
      console.log(column, row)
    },
    // 批量选择指标
    handleSelectionChange (arr) {
      this.checkedQuotaList = []
      this.checkedQuotaList = arr
    },
    // 批量撤回
    handleSelectionRebackChange (arr) {
      this.rebackQuotaList = []
      this.rebackQuotaList = arr
    },
    // 双击穿梭右侧
    handleDbRowClick (row, column) {
      console.log(column)
      this.getIndex = row.index
      row.hasTranfered = true
      row.hasCheck = true
      let arr = []
      arr.push(row)
      this.hasTransferedList = this.hasTransferedList.concat(arr)
      this.shuttledDate = Array.from(new Set(this.hasTransferedList))
    },
    // 双击穿梭返回
    handleDbRebackRowClick (row) {
      // console.log(row, this.shuttledDate, 'ddddd')
      let rowCurIndex = null
      if (this.shuttledDate.length) {
        this.shuttledDate.map((item, index) => {
          if (item[this.rowKeyName] === row[this.rowKeyName]) rowCurIndex = index
        })
        this.shuttledDate.splice(rowCurIndex, 1)
      }

      let arr = JSON.parse(JSON.stringify(this.originDate))
      if (arr.length) {
        arr.map(info => {
          if (info[this.rowKeyName] === row[this.rowKeyName]) info.hasTranfered = false
        })
      }
      this.originDate = arr
      // 撤回同时撤回进入的数组值
      this.hasTransferedList = this.shuttledDate
    },
    // 单条选择指标撤回
    handleCurrentRowRebackClick (row) {
      // console.log(row)
      this.rebackQuotaList = []
      this.rebackQuotaList.push(row)
    },
    // 表格行特殊处理=>选中之后显示的表格行背景色
    tableRowClassName ({ row, rowIndex }) {
      row.index = rowIndex
      if (row.hasTranfered) {
        return 'checked-row'
      } else {
        return 'checked-reback'
      }
    },
    // 特殊处理=>双击行，切换到其他行时，前面选中行背景色的变换
    changeTrStyle ({ rowIndex }) {
      if ((this.getIndex) === rowIndex) {
        // return {
        //   'background-color': '#EEF2FD' // EEF2FD
        // }
      }
    },
    // 双击穿梭之后-checkbox置灰
    ifCheckboxCanUse (row) {
      // console.log(index)
      return !row.hasTranfered
    }
  }
}
</script>

<style lang="scss" scoped>
$primaryBlue:#2D5AFA;

.shuttle-column{
  h1{
    font-size: 16px;
    font-style: normal;
  }
  .btns{
    text-align: left;
    padding: 10px 0;
  }
  .el-button{
    width: 88px;
  }
  .transfer-colomn{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .transfer-icons{
    width:30px;
    height: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      background-color: rgba(0,0,0,0.04);
      color: rgba(0,0,0,0.25);
      border:1px solid rgba(0,0,0,0.15);
      box-sizing: border-box;
      &:hover{
        background-color:$primaryBlue;
        color:#fff;
        border:1px solid $primaryBlue;
      }
    }
    .to-left{
      margin-top: 10px;
    }
  }
  .add-btns{
    background-color: transparent;
    text-align: right;
    padding-right: 0;
    padding-top: 10px;
  }
}
</style>
<style lang="scss">
p{
  margin:0;
  padding: 0;
}
.shuttle-column{
  .el-table th, .el-table td{
    text-align: left !important;
  }
  .el-table .checked-row {
    background-color:#EEF2FD;
    color:#999;
  }
  .el-table .checked-reback {
    background-color:#ffffff;
  }
  .el-table thead{
    background-color:#666666;
  }
  .el-table thead tr th{
    background-color:#eeeeee;
  }
}
</style>