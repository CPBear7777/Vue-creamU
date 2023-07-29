<template>
  <div>
    <button @click="callParentMethod">觸發父組件的方法並接收回傳值</button>
    <p>子組件得到的值：{{ childValue }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childValue: "", // 儲存父組件的回傳值
    };
  },
  methods: {
    callParentMethod() {
      // 觸發自訂義的事件，並把數據傳到父組件
      this.$emit("call-parent-method");
    },
  },
  // 接收父組件傳來的值
  props: ["childValue"],
};
</script>
