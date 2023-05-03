

Vue.component('product_tag_item',{

  props: ['selected_tag','tag_products','product','search_product'],

  mounted(){
	//console.log("product_tag_item search_produt ...... "+JSON.stringify(this.search_product))
  },

  methods:{

	//

  	addProduct:function(event,product){

  		if(!JSON.stringify(this.tag_products).includes(JSON.stringify(product))){

  			this.tag_products.push(product)

			axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/setProductTag',{
	            data:{
	            	product:product,
	            	tag:this.selected_tag
	            }
	          })
		      .then(response => {

		      	console.log("Tag asigned successfully")


			  	})
			  .catch(error => {
			  	alert("Error asigning tag")
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true
		      })

  		}

  	}
  	
  },
  template: '<div class="" v-if="product.ref.toLowerCase().trim().includes(search_product.toLowerCase().trim())"><label class="tag_item" v-on:click="addProduct($event,product)" >{{product.ref}}</label></div>'
				//
})