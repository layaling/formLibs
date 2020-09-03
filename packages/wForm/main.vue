<!--
 * @Date: 2020-07-02 16:43:29
 * @LastEditors: lingyang
 * @LastEditTime: 2020-07-03 10:11:16
--> 
<template>
  <div>
    <el-form
     :model="form"
    >
      <formList></formList>
    </el-form>
    
  </div>
</template>

<script>
import formList from './src/index'
export default {
  name: 'formLibs',
  components:{
    formList
  },
  data(){
    return {
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>