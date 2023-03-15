

Vue.component('feature_product',{
  props: ['selected_product'],

  data () {
	    return {
	    	 product_features:[]
	    }
  },

  mounted(){

  	this.laodProductFeatures()

  	var ths = this

  	this.$root.$on("feature_removed",function(){
  		ths.laodProductFeatures()
  	})



  },

  watch:{

  	selected_product(){

  		this.laodProductFeatures()


  	}

  },
  methods:{

  	laodProductFeatures:function(){

  		//console.log("in laodProductFeatures")

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/getProductFeatures',{
	      	data:{
            product_ref:this.selected_product.ref
          }
	      })
	      .then(response => {

	      	//console.log("response laodProductFeatures   "+JSON.stringify(response))

	      	this.product_features = response.data;

          //console.log("product_features  "+JSON.stringify(this.product_features))

	      	this.$emit('update', this.product_features)

		  })
		  .catch(error => {
	      	console.log("ERROR   "+JSON.stringify(error.message))
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	},
  
  	removeFeature:function(event,feature){

  		if(!confirm("Remove this feature?")){
  			return
  		}

  		this.$delete(this.product_features,this.product_features.indexOf(feature))
  		this.$emit('update', this.product_features)

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/removeProductFeature',{
            data:{
            	product:this.selected_product,
            	feature:feature
            }
          })
	      .then(response => {

	      	console.log("caracteristica eliminado correctamente")


		  	})
		  .catch(error => {
		  	alert("Error eliminando caracteristica")
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	}
  },
  template: '<div class="col-sm-8 product_tags fleft"><div class="col-sm-12 fleft"><label class="tags_title">{{selected_product.ref}}</label></div><template v-if="product_features.length>0"><template v-for="feature in product_features"><feature_in_product :selected_product="selected_product" :feature="feature" :product_features="product_features"/></template></template></div>'
				//
})