

Vue.component('product_tag',{
  props: ['selected_tag'],

  data () {
	    return {
	    	 tag_products:[]
	    }
  },

  mounted(){

  	this.laodTagProducts()

  	var ths = this

  	this.$root.$on("product_removed",function(){
  		ths.laodTagProducts()
  	})

  },

  watch:{

  	selected_tag(){

  		this.laodTagProducts()

  	}

  },
  methods:{

  	laodTagProducts:function(){

  		//console.log("in loadProductTags")

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/getTagProducts',{
	      	data:this.selected_tag
	      })
	      .then(response => {

	      	//console("response loadProductTags   "+JSON.stringify(response))

	      	this.tag_products = response.data;

	      	this.$emit('update', this.tag_products)

		  })
		  .catch(error => {
	      	console.log("ERROR   "+JSON.stringify(error))
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	},
  
  	removeTag:function(event,product){

  		if(!confirm("remove the product from tag?")){
  			return
  		}

  		this.$delete(this.tag_products,this.tag_products.indexOf(product))
  		this.$emit('update', this.tag_products)

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/removeProductTag',{
            data:{
            	product:product,
            	tag:this.selected_tag
            }
          })
	      .then(response => {

	      	console.log("product removed from tag successfully")


		  	})
		  .catch(error => {
		  	alert("Error removing product from tag")
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	}
  },
  template: '<div class="col-sm-8 tag_products fleft"><div class="col-sm-12 fleft"><label class="tags_title">{{selected_tag.tag}}</label></div><template v-if="tag_products.length>0"><template v-for="product in tag_products"><label class="tag_item" v-on:click="removeTag($event,product)">{{product.ref}}</label></template></template></div>'
				//
})