

Vue.component('tags_modal',{
  props: ['selected_product'],
  data () {
	    return {
	    	 product_tags:[]
	    }
  },
  methods:{
  	
  	showTag:function(event){

  		if(event.target.id != 'modaltags' && modal.showTag){
  			return
  		}

  		modal.showTag = !modal.showTag
  		
  	},
  	updateProductTags:function(value){

		this.product_tags = value
	}
  },

  template: '<div class="modalglobal"  id="modaltags" ref="modaltags" v-on:click="showTag"><div class="modalcontent  tcenter" id="modaltags_intern" ref="modaltags_intern"><div class="col-sm-12 allheight"> <tag_list :selected_product = "selected_product" :product_tags="product_tags"/><tag_product :selected_product="selected_product" v-on:update="updateProductTags($event)"  :product_tags="product_tags"/> </div></div></div>'
				//
})