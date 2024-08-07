/**
 * @Desc 输入框自定聚焦
 * @Author hjp
 */

import Vue, { nextTick } from 'vue'

Vue.directive('focus', {
  inserted (el, { col=4 }) {
    nextTick(() => {
      if (el.nodeName == 'INPUT' || el.nodeName === 'TEXTAREA') {
        el.focus()
        el.setAttribute('rows', col)
      } else {
        el.querySelector('input').focus()
      }
      const handleFlow = (e) => {
        el.style.height= 'auto'
        el.style.height = el.scrollHeight+10 + 'px'
      }
      const height = el.offsetHeight;
      const handleBlur = (e) => {
        el.style.height = height + 'px'
      }
      el.addEventListener('blur', handleBlur)
      el.addEventListener('input', handleFlow)
    })
  },
  update(el) {
    // console.log(el, 'update')
    if (el.nodeName == 'INPUT' || el.nodeName === 'TEXTAREA') {
      el.focus()
    } else {
      el.querySelector('input').focus()
    }
  }
})
