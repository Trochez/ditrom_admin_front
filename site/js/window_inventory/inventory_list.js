

Vue.component('inventory_list',{
    props: ['selected_product'],
    data () {
          return {
              search_feature:"",
              inventories:{}
          }
    },
    mounted(){
        this.loadInventory()
    },
    methods:{
  
      loadInventory:function(){
  
            axios
            .post(properties.protocol+properties.baseurl+properties.port+'/getProductInventory',{
                data:{
            	    product:this.selected_product
                }
            })
            .then(response => {

                var result_inventory = response.data;

                var inventories = {}
  
                for(k in result_inventory){

                    if(!(result_inventory[k].inventory_id in inventories)){
                        inventories[result_inventory[k].inventory_id] = {id:result_inventory[k].inventory_id,features:[],product_ref:result_inventory[k].product_ref,quantity:result_inventory[k].quantity}
                    }

                    inventories[result_inventory[k].inventory_id].features.push({feature_id:result_inventory[k].feature_id,feature_name:result_inventory[k].feature_name,feature_option_id:result_inventory[k].feature_option_id,feature_option_name:result_inventory[k].feature_option_name})

                }

                this.inventories = inventories

                })
              .catch(error => {
                  console.log("ERROR !! "+JSON.stringify(error))
                  this.errored=true
              })
              .finally(() => {
                    this.ready = true
              })
  
        }
    },
    template: '<div class="col-sm-12 fleft allheight"><div class="col-sm-12 fleft tags_title"><label class="col-sm-6">{{selected_product.ref}} inventory</label><i class="fas fa-search delete_img"></i><input type="text" v-model="search_feature" name="search_feature" id="search_feature" ref="search_feature" class="search_feature_option col-sm-4" placeholder="search feature or feature value"></div><div id="inventory_list" class="tag_list tcenter" ref = "inventory_list"><template v-for="inventory in inventories"><inventory_product_item :selected_product="selected_product"  :inventory="inventory" :search_feature="search_feature" /></template></div></div>'
                  //
  })