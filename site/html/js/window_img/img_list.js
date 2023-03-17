

Vue.component('img_list',{
  props: ['selected_product'],

  data () {
	    return {
        img_indexes:[]
	    }
  },

  mounted(){

    //console.log("imgqnt  "+this.selected_product.imgqnt)

  	//this.img_indexes = (1 to this.selected_product.imgqnt)

    //console.log("img_indexes  "+JSON.stringify(this.img_indexes))

  },

  watch:{

  	selected_product(){

  	}

  },
  methods:{

  	
  },
  template: '<div class="col-sm-12 product_tags fleft"><template v-if="selected_product.imgqnt>0"><template v-for="index in selected_product.imgqnt"><img_product :img_index="index" :selected_product="selected_product" /></template></template><img_new :selected_product="selected_product"/></div>'
				//
})