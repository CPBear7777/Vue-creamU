<template>
  <v-container>
    <h1>Customized Your Model</h1>
    <p class="text-center">
      You have the power to customize your model right here in the canvas.
      Simply click on the combobox and choose the model for each body part. Take
      full control of the look and feel of your model.
      <br />
      Not only that, but you can also select the material that you absolutely
      adore. Let your creativity shine as you explore different materials to
      give your model that perfect touch.
      <br />
      Unleash your imagination and create a truly unique and personalized model.
      The possibilities are endless, so go ahead and make your masterpiece come
      to life.
    </p>
    <br />
    <v-row justify="center">
      <v-col cols="auto">
        <div style="display: grid; place-items: center">
          <!--class="webgl-content"-->
          <div id="unityContainer" style="width: 960px; height: 540px"></div>
        </div>
        <br />
        <CalculateTable></CalculateTable>
        
        <br />
        <Info></Info>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// 用於啟動Unity
export default {
  beforeCreate() {
    let script1 = document.createElement("script");
    script1.setAttribute("src", "Build/UnityLoader.js");
    document.head.appendChild(script1);
    let script2 = document.createElement("script");
    script2.setAttribute("src", "TemplateData/UnityProgress.js");
    document.head.appendChild(script2);
  },
  mounted() {
    const loadUnity = () => {
      const unityInstance = UnityLoader.instantiate(
        "unityContainer",
        "Build/WebGL0619.json", //Unity有換檔案要改這裡，還有public裡的檔案
        { onProgress: UnityProgress }
      );
      const recaptureInputAndFocus = () => {
        var canvas = document.getElementById("canvas");
        if (canvas) {
          canvas.setAttribute("tabindex", "1");
          canvas.focus();
        } else {
          setTimeout(this.recaptureInputAndFocus, 100);
        }
      };
      recaptureInputAndFocus();
    };
    const checkIntervalId = setInterval(() => {
      if (UnityLoader) {
        loadUnity();
        clearInterval(checkIntervalId);
      }
    }, 500);
  },
};
</script>

<script setup>
import CalculateTable from "../assets/components/CalculateTable.vue";
import Info from "../assets/components/Info.vue";
</script>

<style></style>
