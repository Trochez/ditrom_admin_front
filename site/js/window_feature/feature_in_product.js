

Vue.component('feature_in_product',{

  props: ['selected_product','feature','product_features'],

  data(){
  	return{
  		showOptions:false
  	}
  },

  mounted(){

	let ths = this

	this.$root.$on("feature_options_removed",()=>{
		ths.showOptions = false
	})

	

  },

  methods:{

  	removeFeature:function(event,feature){

  		if(!confirm("Do you want to remove this product's feature? If you remove the feature you must set inventories")){
  			return
  		}

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/removeProductFeature',{
            data:{
            	product:this.selected_product,
            	feature:feature
            }
          })
	      .then(response => {

			//this.$emit("feature_product_removed",feature)

			console.log("feature removed successfully")

	      	alert(response.data)

			this.$emit('update', this.product_features)
			this.$root.$emit("feature_options_removed")

		  	})
		  .catch(error => {
		  	alert("Error removed feature")
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
			this.$delete(this.product_features,this.product_features.indexOf(feature))
			this.$emit('update', this.product_features)
	      })

  	},
  	showOptionsMethod:function(){

  		console.log("showOptions")

  		this.showOptions = !this.showOptions
  	

  	}
  },
  template: '<div class="feature_item"><div class = "feature_product_options"><label class="tag_item" v-on:click="removeFeature($event,feature)">{{feature.name}}</label><i v-if="showOptions" class="fas fa-caret-up icon_feature" v-on:click = "showOptionsMethod()"></i><i v-else class="fas fa-caret-down icon_feature" v-on:click = "showOptionsMethod()"></i></div><option_list v-if="showOptions" :selected_product = "selected_product" :feature = "feature"/></div>'
				//
})