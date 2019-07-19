import myBreadCrumb from '../components/myBreadCrump.vue'
import myChannel from '../components/myChannel.vue'
import myImage from '../components/myImage.vue'

export default {
  install (Vue) {
    Vue.component(myBreadCrumb.name, myBreadCrumb)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
