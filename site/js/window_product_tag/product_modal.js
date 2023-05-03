

Vue.component('product_modal',{
  props: ['selected_tag'],
  data () {
	    return {
			tag_products:[]
	    }
  },
  methods:{
  	
  	showProduct:function(event){

  		if(event.target.id != 'modaltag' && modal.showProduct){
  			return
  		}

  		modal.showProduct = !modal.showProduct
  		
  	},
  	updateTagProducts:function(value){

		this.tag_products = value
	}
  },

  template: '<div class="modalglobal"  id="modaltag" ref="modaltag" v-on:click="showProduct"><div class="modalcontent  tcenter" id="modalproduct_intern" ref="modalproduct_intern"><div class="col-sm-12 allheight"> <product_list :selected_tag = "selected_tag" :tag_products="tag_products"/><product_tag :selected_tag="selected_tag" :tag_products="tag_products" v-on:update="updateTagProducts($event)"/> </div></div></div>'
				//
})