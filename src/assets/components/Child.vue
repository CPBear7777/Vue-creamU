<template>
  <div>
    <button @click="callParentMethod">点击触发父组件方法并接收返回值</button>
    <p>子组件得到的值：{{ childValue }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childValue: "", // 存储父组件返回的值
    };
  },
  methods: {
    callParentMethod() {
      // 触发自定义事件，并传递数据给父组件
      this.$emit("call-parent-method");
    },
  },
  // 接收父组件传递回来的值
  // 这里的 `value` 就是父组件传递过来的数据
  props: ["childValue"],
};
</script>
