<template>
  <div>
    <shuttleBox 
    :isShowDateList="isShowDateList"
    :needClear="ifNeedClear"
    :only="keyValue"
    :tHeight="tableHeight"
    :rWidth="rtWidth"
    :lWidth="ltWidth"
    :lTableHeaderList="lTableHeader"
    :rTableHeaderList="rTableHeader"
    :conTableShow="tableShowName"
    @curCheckedShuttleDates="checkedShuttleDates"
    />
  </div>
</template>

<script>
import shuttleBox from './src/index'
export default {
  name: 'shuttleTable',
  props: {
    originShuttleDate: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    ifNeedClear: {
      type: Boolean,
      default: false
    },
    keyValue: {
      type: String,
      default: ()=>{
        return ''
      }
    },
    tableHeight: {
      type: String,
      default: ()=>{
        return ''
      }
    },
    rtWidth: {
      type: String,
      default: ()=>{
        return ''
      }
    },
    ltWidth: {
      type: String,
      default: ()=>{
        return ''
      }
    },
    lTableHeader: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    rTableHeader: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    tableShowName: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  data () {
    return {
      isShowDateList :[]
    }
  },
  created() {
    this.isShowDateList = this.originShuttleDate
    console.log(this.tableHeight, this.rtWidth, 'sksk')
  },
  components:{
    shuttleBox
  },
  methods: {
    // 穿梭框选中的数组
    checkedShuttleDates(arr) {
      this.$emit('change', arr)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>