/*
 * @Date: 2020-07-02 16:48:14
 * @LastEditors: lingyang
 * @LastEditTime: 2020-08-06 16:12:07
 */ 
// packages / index.js

// 导入单个组件
import formlibs from './wForm/index'
import shuttleBox from './ShuttleBox/index'

// 以数组的结构保存组件，便于遍历
const components = [
  formlibs,
  shuttleBox
]

// 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components
}