<!--
 * @Date: 2020-07-02 17:26:38
 * @LastEditors: lingyang
 * @LastEditTime: 2020-07-24 11:08:32
--> 
<template>
  <div>
    <el-form-item :label="labelText">
      <el-checkbox>复选框</el-checkbox>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelText: '复选框'
    }
  },
  created () {
    console.log('复选框按钮显示')
  }
}
</script>

<style lang="scss" scoped>

</style>