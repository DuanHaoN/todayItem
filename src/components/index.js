import myBreadCrumb from '../components/myBreadCrump.vue'
import myChannel from '../components/myChannel.vue'
import myImage from '../components/myImage.vue'
// import myDemo from '../components/demo.vue'

export default {
  install (Vue) {
    Vue.component(myBreadCrumb.name, myBreadCrumb)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
    // Vue.component(myDemo.name, myDemo)
  }
}
