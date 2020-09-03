/*
 * @Date: 2020-07-02 16:44:46
 * @LastEditors: lingyang
 * @LastEditTime: 2020-07-03 10:04:07
 */ 
// packages/textarea/index.js

// 导入组件，组件必须声明 name
import formList from './main.vue'

// 为组件添加 install 方法，用于按需引入
formList.install = function (Vue) {
    Vue.component(formList.name, formList)
}

export default formList