<template>
  <h2>Selected Component & Price</h2>
  <v-table class="text-center">
    <thead>
      <tr>
        <th class="text-left">Body Part</th>
        <th class="text-center">Model</th>
        <th class="text-center">Model-Price</th>
        <th class="text-center">+</th>
        <th class="text-center">Material</th>
        <th class="text-center">Material-Price</th>
        <th class="text-center">=</th>
        <th class="text-center">SubTotal</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-left">Head:</td>
        <td id="head"></td>
        <td id="">{{ head_mo_price }}</td>
        <td id="">+</td>
        <td id="head_M"></td>
        <td id="">{{ head_m_price }}</td>
        <td id="">=</td>
        <td id="">{{ head_mo_price + head_m_price }}</td>
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
    <v-btn id="btn" size="x-large" color="#e5d2ab">Buy Now</v-btn>
  </v-row>
</template>

<script>
export default {
  data() {//初始值
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
    };
  },
  
  mounted() {//model+material=component的價格
    const sigh = async () => {
      try {
        //Model

        //找到標籤
        const headField = document.getElementById("head");
        if (!headField) return;
        //變數=標籤的內容的price
        this.head_mo_price = this.datas[headField.innerText].price;
        //   console.log(`head_mo_price: ${this.head_mo_price}`);
        const bodyField = document.getElementById("body");
        this.body_mo_price = this.datas[bodyField.innerText].price;
        const rhField = document.getElementById("rhand");
        this.rhand_mo_price = this.datas[rhField.innerText].price;
        const lhField = document.getElementById("lhand");
        this.lhand_mo_price = this.datas[lhField.innerText].price;
        const rfField = document.getElementById("rfoot");
        this.rfoot_mo_price = this.datas[rfField.innerText].price;
        const lfField = document.getElementById("lfoot");
        this.lfoot_mo_price = this.datas[lfField.innerText].price;

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
    loadDB();
  },
  methods: {//算總數
    calculateSum() {
      let sum = 0;
      const variables = Object.keys(this.$data);
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (typeof this.$data[variable] === 'number') {
          sum += this.$data[variable];
        }
      }
      return sum;
    },
    addToCart(){
      //console.log('按鈕被點擊了！');
      //let storage = localStorage
      //storage['addItemList'] = ''
    }
    
  },
  created() {
    const sum = this.calculateSum();
    console.log(sum);
  },
};
</script>

<style csope>
#total{
  font-size:30px;
  text-align: right;
};
</style>
