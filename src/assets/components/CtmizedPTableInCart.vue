<template>
  <v-container>
    <div>
      <h3>Customized Product List</h3>
      <hr />
      <v-row justify="center">
        <v-col cols="auto">
          <div v-if="products.length == 0">
            <br />
            <br />
            <br />
            <v-btn prepend-icon="mdi-cart-arrow-down">Buy Now</v-btn>
            <h3>Opps! No Product In Shopping Cart!</h3>
          </div>
        </v-col>
      </v-row>

      <v-expansion-panels>
        <!-- 動態新增-起始 -->
        <v-expansion-panel v-for="(product, index) in products" :key="index">
          <v-expansion-panel-title v-slot="{ open }">
            <v-row no-gutters align="center">
              <v-col cols="1" class="d-flex justify-center">
                #{{ index + 1 }}
              </v-col>
              <v-col cols="3" justify="center">
                <v-img
                  :src= "product.Img"
                  width="100%"
                  class="bg-grey-lighten-2"
                ></v-img>
              </v-col>
              <v-col cols="3" class="d-flex justify-start justify-center">
                單價:{{ product.Info.unitprice }}元
              </v-col>
              <v-col cols="2" class="d-flex justify-start justify-center">
                數量:{{ foramount[index].Info.amount }}
              </v-col>
              <v-col cols="3" class="d-flex justify-start justify-center">
                小計:{{ product.Info.unitprice * product.Info.amount }}元
              </v-col>
            </v-row>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-container>
              <v-row no-gutters align="auto">
                <v-col>
                  <v-table class="text-center">
                    <thead>
                      <tr>
                        <th class="text-right padding-right">Body Part</th>
                        <th class="text-center">ComponentId</th>
                        <th class="text-center">SubTotal</th>
                        <th class="text-center">=</th>
                        <th class="text-center">Model</th>
                        <th class="text-center">Model-Price</th>
                        <th class="text-center">+</th>
                        <th class="text-center">Material</th>
                        <th class="text-center">Material-Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="index in 6" :key="index">
                        <td class="text-right">
                          {{ product.ComDetail[index - 1].type }}
                        </td><!--部位名稱-->
                        <td>{{ product.ComDetail[index - 1].comId }}</td><!--該部位的componentId-->
                        <td>{{ product.ComDetail[index - 1].comPrice }}</td><!--該部位的component的價格-->
                        <td>=</td>
                        <td>{{ product.ComDetail[index - 1].moId }}</td><!--該部位的modelId-->
                        <td>{{ product.ComDetail[index - 1].moPrice }}</td><!--該部位的model的價格-->
                        <td>+</td>
                        <td>{{ product.ComDetail[index - 1].maId }}</td><!--該部位的materilaId-->
                        <td>{{ product.ComDetail[index - 1].maPrice }}</td><!--該部位的materila的價格-->
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
              <v-row no-gutters align="center">
                <v-spacer></v-spacer>

                <v-col cols="3"> </v-col>

                <v-divider vertical class="mx-4"></v-divider>

                <v-col cols="1">
                  <p class="text-field-custom">數量：</p>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="foramount[index].Info.amount" readonly>
                    <template v-slot:append>
                      <v-btn @click="increment" variant="text" icon>
                        <v-icon size="small">mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:prepend>
                      <v-btn @click="decrement" variant="text" icon>
                        <v-icon size="small">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :id="index"
                variant="text"
                color="secondary"
                @click="deleteItem(index)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- 動態新增-結束 -->
    <hr>
    <h2>Total:{{ TotalPrice() }}</h2>
    <v-row justify="right">
      <v-col >
        <v-btn size="x-large"  color="#e5d2ab" @click="CustomizedPcheckout">Check out</v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      //先在此宣告要存放的變數位置
      products: JSON.parse(localStorage.getItem("addItemList")) || [],//此用來取整個localStorate
      foramount: JSON.parse(localStorage.getItem("addItemList")) || 1,//此用來取購買數量用，會另外取是因為想要在購物車裡可以動態更改數量
      value: 1,
      //products: ProdList,
    };
  },
  methods: {
    increment() {
      this.value++;
      //foramount[index].Info.amount++;
    },
    decrement() {
      if (this.value /*foramount[index].Info.amount*/ > 1) {
        this.value--;
        //foramount[index].Info.amount--;
      }
    },
    deleteItem(e) {
      console.log("刪掉了" + e);
      //從list刪掉該項目
      this.products.splice(e, 1);
      //更新localStorage
      localStorage.setItem("addItemList", JSON.stringify(this.products));
    },
    TotalPrice() {
      let sum = 0;
      console.log(this.products.length);

      for(let i = 0; i < this.products.length ;i++){
        let unitP = this.products[i].Info.unitprice;
        let amount = this.products[i].Info.amount;
        sum += (unitP * amount);
      }
      return sum;
    },
    async SaveToCombineDetail(){
      const data = this.products.map(product => {
        return{
          CHead: this.product.CHead,
          CBody:this.product.CBody,
          CLHand:this.product.CLHand,
          CRHand:this.product.CRHand,
          CLFoot:this.product.CLFoot,
          CRFoot:this.product.CRFoot,
          SubTotal:this.product.Info.unitprice,
          Type:this.product.Info.type,
        }
      });
      try{
        fetch(`/api/CombineDetails`,{
        method: POST,
        //Content-Type為application/json，表示以JSON回傳給API
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if(!reaponse.ok){
        throw new Error(`Network response was not ok`);
      }
      const result = await Response.json();
      }
      catch(error){
        console.error(`Fetch Error`,error);
      }

    }
  },
  mounted() {
    this.products = JSON.parse(localStorage.getItem("addItemList")) || [];
  },

};
</script>

<style scoped>
/* 添加自定義的class來改變文本的大小和粗細 */
.text-field-custom {
  font-size: 20px; /* 更改文本大小 */
  font-weight: bold; /* 更改文本粗細 */
}
</style>
