<template>
  <div>
    <!-- 在子组件上绑定自定义事件监听器，并在父组件中执行对应的方法 -->
    <ChildComponent
      @call-parent-method="handleChildEvent"
      :childValue="parentValue"
    />
    <p>父组件得到的值：{{ parentValue }}</p>
  </div>
</template>

<style setup></style>

<script>
//import Child from "../assets";
import ChildComponent from "../assets/components/Child.vue";

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      parentValue: "", // 存储处理后的结果，会在子组件中显示
    };
  },
  methods: {
    handleChildEvent() {
      // 在父组件中执行一些操作，并将结果赋值给 parentValue
      this.parentValue = "Hello from ParentComponent!";

      // 这里也可以从异步操作中获取数据并将结果赋值给 parentValue
      // 例如，从API请求数据后更新 parentValue
      // fetch('https://example.com/api/data')
      //   .then(response => response.json())
      //   .then(data => this.parentValue = data.someValue);
    },
  },
};
</script>
