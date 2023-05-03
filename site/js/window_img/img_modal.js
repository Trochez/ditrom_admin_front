

Vue.component('img_modal',{
  props: ['selected_product'],
  data () {
	    return {
	    	 product_tags:[]
	    }
  },
  methods:{
  	
  	showImg:function(event){

  		if(event.target.id != 'modalimg' && imgmodal.showImg){
  			return
  		}

  		imgmodal.showImg = !imgmodal.showImg
  		
  	},
  	updateProductTags:function(value){

		this.product_tags = value
	}
  },

  template: '<div class="modalglobal"  id="modalimg" ref="modalimg" v-on:click="showImg"><div class="modalcontent  tcenter" id="modalimg_intern" ref="modalimg_intern"><div class="col-sm-12 allheight"><div class = "col-sm-12"><label class="tags_title">{{selected_product.ref}}</label></div> <img_list :selected_product = "selected_product" /></div></div></div>'
				//
})