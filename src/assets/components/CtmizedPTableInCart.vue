<template>
  <v-container>
    <div>
      <h3>Customized Product List</h3>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title v-slot="{ open }">
            <v-row no-gutters align="center">
              <v-col cols="1" class="d-flex justify-center"> #1 </v-col>
              <v-col cols="3" justify="center">
                <v-img
                  src="https://localhost:7098/imgs/messageImg/04.jpg"
                  width="100%"
                  class="bg-grey-lighten-2"
                ></v-img>
              </v-col>
              <v-col cols="3" class="d-flex justify-start justify-center">
                單價:1800元
              </v-col>
              <v-col cols="2" class="d-flex justify-start justify-center">
                數量:{{ value }}
              </v-col>
              <v-col cols="3" class="d-flex justify-start justify-center">
                小計:3600元
              </v-col>
              <!-- <v-col cols="2" class="text--secondary">
                123
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> Select trip destination </span>
                  <span v-else key="1">
                    {{ trip.location }}
                  </span>
                </v-fade-transition>
              </v-col> -->
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
                      <tr>
                        <td class="text-right">Head</td>
                        <td id="">{{}}</td>
                        <td id="">{{}}</td>
                        <td id="">=</td>
                        <td id="">{{}}</td>
                        <td id="head"></td>
                        <td id="">+</td>
                        <td id="">{{}}</td>
                        <td id="head_M"></td>
                        <td id="">{{}}</td>
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
                  <v-text-field v-model="value" :input-height="80">
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
              <v-btn variant="text" color="secondary"> Delete </v-btn>
              <v-btn variant="text" color="primary"> Edit </v-btn>
            </v-card-actions>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    increment() {
      this.value++;
    },
    decrement() {
      if (this.value > 0) {
        this.value--;
      }
    },
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
