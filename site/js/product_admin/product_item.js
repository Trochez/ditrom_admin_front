
Vue.component('product_item',{
  props: ['product','selected_product','search_product'],

  methods:{
  	update:function(event,product){

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setProduct',{
            data:product
          })
          .then(response => {


          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error actualizando producto")
          })
          .finally(() => {
            this.ready = true
          })



  		//console.log(JSON.stringify(product))
  	},
  	showTagModal:function(event,selected_product){

  		modal.showTag = !modal.showTag

      if(modal.showTag){
        modal.selected_product = selected_product
      }

  		//console.log("in showTagModal  product_item  "+JSON.stringify(modal.showTag))
  	},
    showImgModal:function(event,selected_product){

      imgmodal.showImg = !imgmodal.showImg

      if(imgmodal.showImg){
        imgmodal.selected_product = selected_product
      }

      //console.log("in showImgModal  product_item  "+JSON.stringify(imgmodal.showImg))
    },
    showFeatureModal:function(event,selected_product){

      featuremodal.showFeature = !featuremodal.showFeature

      if(featuremodal.showFeature){
        featuremodal.selected_product = selected_product
      }

      //console.log("in showImgModal  product_item  "+JSON.stringify(imgmodal.showImg))
    },
    showInventoryModal:function(event,selected_product){

      inventorymodal.showInventory = !inventorymodal.showInventory

      if(inventorymodal.showInventory){
        inventorymodal.selected_product = selected_product
      }

      //console.log("in showImgModal  product_item  "+JSON.stringify(imgmodal.showImg))
    },
    changeAvailable:function(event,product){

      if(event.target.checked){
        product.available = 1
      }
      else{
        product.available = 0
      }

       axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setProduct',{
            data:product
          })
          .then(response => {


          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error actualizando producto")
          })
          .finally(() => {
            this.ready = true
          })

    },
    deleteProduct:function(event,product){

      this.$emit("delete_product")

    }
  },
  template: '<tr class="product_tr" v-if="product.ref.includes(search_product) || product.name.includes(search_product)"><td class="product_td">{{product.ref}}</td><td class="product_td"><input type="text" name="product.ref+\'_name\'" :id ="product.ref+\'-name\'" :ref ="product.ref+\'-name\'" v-on:change="update($event,product)" v-model="product.name"/></td><td class="product_price"><input type="number" name="product.ref+\'-price\'" :id ="product.ref+\'-price\'" :ref ="product.ref+\'-price\'" step="0.01" v-on:change="update($event,product)" v-model="product.price"/></td><td class="product_price"><input type="number" name="product.ref+\'-price_usd\'" :id ="product.ref+\'-price_usd\'" :ref ="product.ref+\'-price_usd\'" step="0.01" v-on:change="update($event,product)" v-model="product.price_usd"/></td><td class="product_td">{{product.imgqnt}}</td><td class="product_td"><textarea :id ="product.ref+\'-description\'" :ref ="product.ref+\'-description\'" v-on:change="update($event,product)" v-model="product.description">{{product.description}}</textarea></td><td class="product_td"><input type="checkbox" checked :ref="product.ref+\'-check\'" :id="product.ref+\'-check\'" v-if="product.available == 1" v-on:click="changeAvailable($event,product)" v-model="product.available"><input type="checkbox" :ref="product.ref+\'-check\'" :id="product.ref+\'-check\'" v-else v-on:click="changeAvailable($event,product)" v-model="product.available"></td><td class = "product_td"><i class="fas fa-ruler-vertical icon_product" v-on:click="showFeatureModal($event,product)"></i></td><td class="product_td"><i class="fas fa-boxes icon_product" v-on:click="showInventoryModal($event,product)"></i></td><td class = "product_td"><i class="fas fa-tags icon_product" v-on:click="showTagModal($event,product)"></i></td><td class = "product_td"><i class="fas fa-images icon_product" v-on:click="showImgModal($event,product)"></i></td><td class = "product_td"><i class="fas fa-trash icon_product" v-on:click="deleteProduct($event,product)"></i></td></tr>'
				//
})