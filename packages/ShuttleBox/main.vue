<template>
  <div>
    <shuttleBox 
    :isShowDateList="isShowDateList"
    :needClear="ifNeedClear"
    :only="keyValue"
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
    }
  },
  data () {
    return {
      isShowDateList :[]
    }
  },
  created() {
    this.isShowDateList = this.originShuttleDate
    console.log(this.keyValue, 'sksk')
  },
  components:{
    shuttleBox
  }
}
</script>

<style lang="scss" scoped>

</style>