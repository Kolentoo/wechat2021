// components/bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0
  },

onChange(event) {
  console.log('event')
  this.setData({ active: event.detail });
},

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
