

Vue.component('inventory_product_item',{

    props: ['selected_product','inventory','search_feature'],
  
    mounted(){
      //console.log("inventory_product_item inventory ...... "+JSON.stringify(this.inventory))
    },
  
    methods:{
  
      //
  
        updateInventory:function(event,inventory){
  
          axios
            .post(properties.protocol+properties.baseurl+properties.port+'/setProductInventoryQuantity',{
              data:{
                id:inventory.id,
                quantity:inventory.quantity
              }
            })
            .then(response => {

                console.log("Inventory asigned successfully")


                })
            .catch(error => {
                alert("Error asigning tag")
                console.log(error)
                this.errored=true
            })
            .finally(() => {
                this.ready = true
                console.log("-- "+this.inventory.quantity)
            })
  
        }
        
    },
    template: '<div class="inventory_item_parent" ><div class="fleft inventory_item"><ul class = "tleft"><li v-for = "feature in inventory.features">{{feature.feature_name}} : {{feature.feature_option_name}}</li></ul></div><div class="fleft product_td inventory_item_quantity col-sm-3"><div class = "ghost"><ul><li v-for = "feature in inventory.features">{{feature.feature_name}} : {{feature.feature_option_name}}</li></ul></div><div class = "ghost_buster"><input class = "col-sm-12" type="text" v-model="inventory.quantity" v-on:change = "updateInventory($event,inventory)"/></div></div></div>'
                  //
  })