<template>
  <div class="home">
    <!-- <form-libs></form-libs> -->
    <shuttleTable
      :originShuttleDate="shuttleTableList"
      :ifNeedClear="ifNeedClearFlag"
      :keyValue="keyName"
      :tableHeight="tbHeight"
      :rtWidth="rWidth"
      :ltWidth="lWidth"
      :lTableHeader="lTableHeaderList"
      :rTableHeader="rTableHeaderList"
      :tableShowName="tableShow"
      @change="checkedShuttleDates"
    ></shuttleTable>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import shuttleDate from '../mock/shuttleData.json'
export default {
  name: 'Home',
  data() {
    return {
      shuttleTableList: shuttleDate.data, // 表格原始数据
      ifNeedClearFlag: true, // 是否需要清除按钮
      keyName: 'labtestIndexCode', // 唯一关键字标志
      tbHeight: '520', // 表格高度
      rWidth: '400px', // 右侧穿梭框宽度
      lWidth: '400px', // 左侧穿梭框宽度
      lTableHeaderList: [ // 穿梭框左侧表头信息
        {
          label: '服务代码',
          width: '120',
          key: 'labtestIndexCode'
        }, {
          label: '服务名称',
          width: '210',
          key: 'labtestIndexName'
        }
      ], // 左侧穿梭框表头显示
      rTableHeaderList: [ // 穿梭框右侧表头信息
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
      tableShow: { // 表格标题显示内容参数替换
        label: 'label'
      }
    }
  },
  created() {
    this.test()
    this.testSome()
    this.testEvery()
  },
  methods:{
    // 获取到的选中项
    checkedShuttleDates(arr) {
      console.log(arr, '选中项传出')
    },
    // 对象数组取并集
    test() {
      const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }]
      const arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }]
      let arr3 = arr1.concat(arr2)
      let result = []
      let obj = []
      result = arr3.reduce(function (prev, cur) {
        // console.log(prev, cur, index, arr, obj) // index-索引，arr-索引
        obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur)
        return prev
      }, [])
      console.log(result) //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
    },
    // 对象数组取交集
    testSome() {
      const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name5', id: 5 }]
      const arr2 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }]
      const result = arr2.filter(function (v) {
        return arr1.some(n => JSON.stringify(n) === JSON.stringify(v))
      })
      console.log(result) // [{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name5', id: 5 }]
    },
    // 对象数组取差集
    testEvery() {
      let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }]
      let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }]
      let result = arr1.filter(function (v) {
        return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
      })
      console.log(result)// [ { name: 'name2', id: 2 }, { name: 'name3', id: 3 } ]
    }
  }
}
</script>

<style lang="scss" scoped>
html,body,p{
  margin:0;
  padding:0;
}
</style>
