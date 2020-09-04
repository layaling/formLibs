<template>
  <div>
    <lShuttleBox v-bind="$attrs" v-on="$listeners"></lShuttleBox>
  </div>
</template>

<script>
import lShuttleBox from './components/ShuttleTableBox'
export default {
  components:{
    lShuttleBox
  }
}
</script>

<style lang="scss" scoped>

</style>