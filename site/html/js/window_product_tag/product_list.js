

Vue.component('product_list',{
  props: ['selected_tag','tag_products'],
  data () {
	    return {
	    	search_product:"",
	    	products:[]
	    }
  },
  mounted(){
  	this.loadProducts()
  },
  methods:{

	loadProducts:function(){

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/getProducts')
	      .then(response => {

	      	this.products = response.data;

		  	})
			.catch(error => {
				console.log(error)
				this.errored=true
			})
			.finally(() => {
				this.ready = true
			})

  	}
  },
  template: '<div class="col-sm-4 fleft allheight"><div class="col-sm-12 fleft tags_title"><label class="">Products</label></div><i class="fas fa-search search_tag_icon"></i><input type="text" v-model="search_product" name="search_product" id="search_product" ref="search_product" class="search_product"><div id="product_list" class="tag_list" ref = "product_list"><template v-for="product in products"><product_tag_item :selected_tag="selected_tag"  :tag_products="tag_products" :product="product" :search_product="search_product" v-on:product_removed="loadProducts"/></template></div></div>'
				//
})