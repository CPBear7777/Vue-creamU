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
        <v-btn
          id="screenshot"
          type="button"
          size="x-large"
          color="#e5d2ab"
          @click="captureScreenshot"
          >Save</v-btn
        >
        <img id="capturedImage" src="" alt="Captured Screenshot" />
        <br />
        <CalculateTable></CalculateTable>

        <CalculateTable2></CalculateTable2>

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
        { onProgress: UnityProgress,
          Module: {
          webglContextAttributes: {"preserveDrawingBuffer": true},//用於截圖的設定
        } }
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
    /*//https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-tips.html
    //截圖功能
    //找報button並賦予監聽事件
    //監聽事件：把<canvas>元素的內容轉化為Blob對象(二進制數據，用於保存截圖)
    const elem = document.querySelector("#screenshot");
    //let needCapture = false;
    elem.addEventListener("click", () => {
      //needCapture = true;
      drawScene();
      canvas.toBlob((blob) => {//回調函數中的 blob 參數即为截图的 Blob 对象。
        //指定要存的檔案名稱
        //會在<body>內先創建一個隱藏的<a>標籤，href內設置為截圖的BlobL
        saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
      });
    });

    const saveBlob = (function () {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      return function saveData(blob, fileName) {
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
      };
    })();

    const drawScene = (function (item){
      if (needCapture) {
        needCapture = false;
        canvas.toBlob((blob) => {
          saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
        });
      }
    })();*/    
  },
  
  methods: {
    //截圖功能
    captureScreenshot() {
      //找到button
      const elem = document.querySelector('#screenshot');
      // 获取 WebGL 渲染的 <canvas> 元素
      const canvas = document.getElementById("canvas"); 
      const capturedImage = document.querySelector('#capturedImage');
      let capturedBlob = null; // 变量用於儲存截圖的 Blob 对象
      elem.addEventListener('click', () => {
        canvas.toBlob((blob) => {
          capturedBlob = blob; // 將截圖的 Blob 儲存到 capturedBlob 中

          // 將 Blob 轉換成臨時的 URL 並顯示
          const blobUrl = URL.createObjectURL(capturedBlob);
          capturedImage.src = blobUrl;
        });
      });
    },
  },
};
</script>

<script setup>
import CalculateTable from "../assets/components/CalculateTable.vue";
import CalculateTable2 from "../assets/components/CalculateTable2.vue";
import Info from "../assets/components/Info.vue";
</script>

<style></style>
