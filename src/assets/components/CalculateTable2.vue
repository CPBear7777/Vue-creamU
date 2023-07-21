<template>
  <h2>Selected Component & Price</h2>
  <v-table class="text-center">
    <thead>
      <tr>
        <th class="text-left">Body Part</th>
        <th class="text-center">ModelId</th>
        <th class="text-center">Model</th>
        <th class="text-center">Model-Price</th>
        <th class="text-center">+</th>
        <th class="text-center">MaterialId</th>
        <th class="text-center">Material</th>
        <th class="text-center">Material-Price</th>
        <th class="text-center">=</th>
        <th class="text-center">SubTotal</th>
        <th class="text-center">ComponentId</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <td class="text-left">Head:</td>
        <td id="">{{ headId }}</td>
        <td id="head"></td>
        <td id="">{{ head_mo_price }}</td>
        <td id="">+</td>
        <td id="">{{ head_m_Id }}</td>
        <td id="head_M"></td>
        <td id="">{{ head_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ head_mo_price + head_m_price }}</td>
        <td id="">{{ cId }}</td>
      </tr>
      <tr>
        <td class="text-left">Body:</td>
        <td id="body"></td>
        <td id="">{{ body_mo_price }}</td>
        <td id="">+</td>
        <td id="body_M"></td>
        <td id="">{{ body_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ body_mo_price + body_m_price }}</td>
      </tr>
      <tr>
        <td class="text-left">Right Hand:</td>
        <td id="rhand"></td>
        <td id="">{{ rhand_mo_price }}</td>
        <td id="">+</td>
        <td id="rhand_M"></td>
        <td id="">{{ rhand_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ rhand_mo_price + rhand_m_price }}</td>
      </tr>
      <tr>
        <td class="text-left">Left Hand:</td>
        <td id="lhand"></td>
        <td id="">{{ lhand_mo_price }}</td>
        <td id="">+</td>
        <td id="lhand_M"></td>
        <td id="">{{ lhand_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ lhand_mo_price + lhand_m_price }}</td>
      </tr>
      <tr>
        <td class="text-left">Right Foot:</td>
        <td id="rfoot"></td>
        <td id="">{{ rfoot_mo_price }}</td>
        <td id="">+</td>
        <td id="rfoot_M"></td>
        <td id="">{{ rfoot_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ rfoot_mo_price + rfoot_m_price }}</td>
      </tr>
      <tr>
        <td class="text-left">Left Foot:</td>
        <td id="lfoot"></td>
        <td id="">{{ lfoot_mo_price }}</td>
        <td id="">+</td>
        <td id="lfoot_M"></td>
        <td id="">{{ lfoot_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ lfoot_mo_price + lfoot_m_price }}</td>
      </tr>
    </tbody>
  </v-table>
  <p id="total">Total:{{ calculateSum() }}</p>
  <br />
  <v-row justify="end">
    <v-btn id="btn" size="x-large" color="#e5d2ab" @click="AddToCart"
      >Buy Now</v-btn
    >
    <v-btn id="btn" size="x-large" color="#e5d2ab" @click="Cclean"
      >Delete</v-btn
    >
  </v-row>
</template>

<script>
//有setup就可以省掉return
import { ref } from "vue";

const components = [];

export default {
  data() {
    //初始值
    return {
      datas: {},
      head_mo_price: 0,
      head_m_price: 0,
      body_mo_price: 0,
      body_m_price: 0,
      rhand_mo_price: 0,
      rhand_m_price: 0,

      lhand_mo_price: 0,
      lhand_m_price: 0,
      rfoot_mo_price: 0,
      rfoot_m_price: 0,
      lfoot_mo_price: 0,
      lfoot_m_price: 0,

      
      headId: 300006,
      head_m_Id: 200001,

      cId: 0,

      items: [
        {
          name: 'Head',
          m_id: 'head',
          m_price: 0,
          mo_id: '',
          mo_price: 0,
          M: 0,
        },
        {
          name: 'Body',
          m_id: 'body',
          m_price: 0,
          mo_price: 0,
          M: 0,
        },
        // Add more items for other body parts as needed
      ],
    };
  },

  mounted() {
    //model+material=component的價格
    const sigh = async () => {
      try {
        //Model

        //找到標籤
        const headField = document.getElementById("head");
        if (!headField) return;
        //變數=標籤的內容的price
        //   console.log(`head_mo_price: ${this.head_mo_price}`);
        const bodyField = document.getElementById("body");
        const rhField = document.getElementById("rhand");
        const lhField = document.getElementById("lhand");
        const rfField = document.getElementById("rfoot");
        const lfField = document.getElementById("lfoot");

        this.head_mo_price = this.datas[headField.innerText].price;
        this.body_mo_price = this.datas[bodyField.innerText].price;
        this.rhand_mo_price = this.datas[rhField.innerText].price;
        this.lhand_mo_price = this.datas[lhField.innerText].price;
        this.rfoot_mo_price = this.datas[rfField.innerText].price;
        this.lfoot_mo_price = this.datas[lfField.innerText].price;

        this.headId = this.datas[headField.innerText].modelId;
        this.bodyId = this.datas[bodyField.innerText].modelId;
        this.rhandId = this.datas[rhField.innerText].modelId;
        this.lhandId = this.datas[lhField.innerText].modelId;
        this.rfootId = this.datas[rfField.innerText].modelId;
        this.lfootId = this.datas[lfField.innerText].modelId;

        //Material
        const headMtrl = document.getElementById("head_M");
        const bodyMtrl = document.getElementById("body_M");
        const rhMtrl = document.getElementById("rhand_M");
        const lhMtrl = document.getElementById("lhand_M");
        const rfMtrl = document.getElementById("rfoot_M");
        const lfMtrl = document.getElementById("lfoot_M");

        this.head_m_price = this.datas[headMtrl.innerText].price;
        this.body_m_price = this.datas[bodyMtrl.innerText].price;
        this.rhand_m_price = this.datas[rhMtrl.innerText].price;
        this.lhand_m_price = this.datas[lhMtrl.innerText].price;
        this.rfoot_m_price = this.datas[rfMtrl.innerText].price;
        this.lfoot_m_price = this.datas[lfMtrl.innerText].price;

        this.head_m_Id = this.datas[headMtrl.innerText].materialId;
        this.body_m_Id = this.datas[bodyMtrl.innerText].materialId;
        this.rhand_m_Id = this.datas[rhMtrl.innerText].materialId;
        this.lhand_m_Id = this.datas[lhMtrl.innerText].materialId;
        this.rfoot_m_Id = this.datas[rfMtrl.innerText].materialId;
        this.lfoot_m_Id = this.datas[lfMtrl.innerText].materialId;
      } catch (error) {}
    };
    const loadDB = async () => {
      const res = await fetch(`https://localhost:7011/api/Models`);
      (await res.json()).forEach((element) => {
        this.datas[element.modelName] = element;
      });
      const res2 = await fetch(`https://localhost:7011/api/Materials`);
      (await res2.json()).forEach((element) => {
        this.datas[element.materialName] = element;
      });
      /*const res3 = await fetch(`https://localhost:7011/api/Component`);
      (await res3.json()).forEach((element) => {
        this.datas[element.componentName] = element;
      });*/

      //   (v) => {};
      //this.datas["Wood034"] = { price: 87 };
      //this.datas["Wood018"] = { price: 78 };
      const intervalId = setInterval(() => {
        //目前只能用這個笨方法QQ

        const headField = document.getElementById("head");

        if (!headField) return;
        sigh();
        // clearInterval(intervalId);
      }, 100);
    };
    const getComponent = async () => {
      try {
        const res4 = await fetch(
          `https://localhost:7011/api/Components/model/${this.headId}/material/${this.head_m_Id}`
        );
        const datas = await res4.json();
        console.log(datas);
        components.value = datas;

        console.log(components.value[0].componentId);
        this.cId = components.value[0].componentId;
        // 回傳 API 回應的資料
        return components;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    loadDB();
    getComponent();
  },
  methods: {
    //算總數
    calculateSum() {
      let sum = 0;
      const variables = Object.keys(this.$data);
      for (let i = 0; i < 12; i++) {
        const variable = variables[i];
        if (typeof this.$data[variable] === "number") {
          sum += this.$data[variable];
        }
      }
      return sum;
    },
    AddToCart() {
      const data = this.headId;
      //localStorage.setItem('data2',data);

      alert("已存" + data);
    },
    Cclean() {
      localStorage.removeItem("data2");
      this.head_m_price = "";
      alert("已清除");
    },
  },
  created() {
    const sum = this.calculateSum();
    console.log(sum);
  },
};
</script>

<style csope>
#total {
  font-size: 30px;
  text-align: right;
}
</style>
