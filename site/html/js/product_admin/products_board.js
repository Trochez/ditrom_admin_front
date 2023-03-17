

Vue.component('products_board',{
  props: ['search_product'],
  data () {
	    return {
	    	products:[],
	    	new_product:null,
	    }
  },
  mounted(){

  	this.getProducts()

  	var ths = this

	this.$root.$on("product_created",function(product_ref){

		var data={
			inventory_id:0,
			feature_id:0,
			feature_option_id:0,
			product_ref:product_ref
		}

		axios
		.post(properties.protocol+properties.baseurl+properties.port+'/setInventoryNew',{data:data})
		.then(response => {
			
			console.log(response.data)

		})
		.catch(error => {
			console.log(error)
			this.errored=true
			return false
		})
		.finally(() => {
			this.ready = true
			return true
		})

	})

  	this.$root.$on("create_product",function(){

  		var product_ref = window.prompt("Set unique product reference","ref")

  		var data={
  			ref:product_ref
  		}

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/setProduct',{data:data})
	      .then(response => {

	      	ths.new_product = product_ref

	      	alert(response.data)

	      	ths.getProducts()

			this.$root.$emit("product_created",product_ref)

		  	})
		  .catch(error => {
	      	console.log(error)
	      	this.errored=true
	      	return false
	      })
	      .finally(() => {
	      	this.ready = true
	      	return true
	      })



  	})

  },
  updated(){

  	if(this.new_product){

  		document.getElementById(this.new_product).className="hover_new"

  	}

  },
  methods:{
  	getProducts: function(){

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

  	},
  	delete_product:function(event,product,index){

  		if(!confirm("Delete this product permanently?")){
  			return
  		}

  		axios
          .post(properties.protocol+properties.baseurl+properties.port+'/deleteProduct',{
            data:product
          })
          .then(response => {

          	this.$delete(this.products,index)



          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error actualizando producto")
          })
          .finally(() => {
            this.ready = true
          })

  	}
  },
  template: '<div class="div_table_products"><table class="table_products">	<thead class="thead_products"><tr class="tr_head_products"><th class="th_products">Ref</th><th class="th_products">Name</th><th class="th_products">Price COP</th><th class="th_products">Price USD</th><th class="th_products"># pics</th><th class="th_products">Description</th><th class="th_products">Available</th><th class="th_products">Features</th><th class="th_products">Inventory</th><th class="th_products">Tags</th><th class="th_products">Show pics</th><th class="th_products">Delete</th></tr></thead><tbody class="tbody_products"><template v-for="(product,index) in products"><product_item :id="product.ref" :product = "product" :search_product = "search_product" v-on:delete_product="delete_product($event,product,index)" /></template></tbody></table></div>'
				//
})	