

Vue.component('inventory_modal',{
    props: ['selected_product'],
    data () {
          return {
          }
    },
    mounted(){
    },
    methods:{
        
        showInventory:function(event){
  
            if(event.target.id != 'inventorymodal' && inventorymodal.showInventory){
                return
            }
  
            inventorymodal.showInventory = !inventorymodal.showInventory
            
        }
    },
  
    template: '<div class="modalglobal"  id="inventorymodal" ref="inventorymodal" v-on:click="showInventory"><div class="modalcontent  tcenter" id="modalproduct_intern" ref="modalproduct_intern"><div class="col-sm-12 allheight"> <inventory_list :selected_product = "selected_product" /></div></div></div>'
                  //
  })