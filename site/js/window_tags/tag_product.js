

Vue.component('tag_product',{
  props: ['selected_product'],

  data () {
	    return {
	    	 product_tags:[]
	    }
  },

  mounted(){

  	this.laodProductTags()

  	var ths = this

  	this.$root.$on("tag_removed",function(){
  		ths.laodProductTags()
  	})

  },

  watch:{

  	selected_product(){

  		this.laodProductTags()

  	}

  },
  methods:{

  	laodProductTags:function(){

  		//console.log("in loadProductTags")

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/getProductTags',{
	      	data:this.selected_product
	      })
	      .then(response => {

	      	//console("response loadProductTags   "+JSON.stringify(response))

	      	this.product_tags = response.data;

	      	this.$emit('update', this.product_tags)

		  })
		  .catch(error => {
	      	console.log("ERROR   "+JSON.stringify(error))
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	},
  
  	removeTag:function(event,tag){

  		if(!confirm("remove the tag from product?")){
  			return
  		}

  		this.$delete(this.product_tags,this.product_tags.indexOf(tag))
  		this.$emit('update', this.product_tags)

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/removeProductTag',{
            data:{
            	product:this.selected_product,
            	tag:tag
            }
          })
	      .then(response => {

	      	console.log("tag removed successfully")


		  	})
		  .catch(error => {
		  	alert("Error eliminando tag")
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	}
  },
  template: '<div class="col-sm-8 product_tags fleft"><div class="col-sm-12 fleft"><label class="tags_title">{{selected_product.ref}}</label></div><template v-if="product_tags.length>0"><template v-for="tag in product_tags"><label class="tag_item" v-on:click="removeTag($event,tag)">{{tag.tag}}</label></template></template></div>'
				//
})