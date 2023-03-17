

Vue.component('feature',{

  props: ['selected_product','product_features','feature','search_feature'],


  mounted(){

	/*this.$on("product_feature_option_setted",function(data){

		//console.log("----probando  product_feature_option_setted "+JSON.stringify(data))

		axios
			.post(properties.protocol+properties.baseurl+properties.port+'/setInventoryNewOption',{
			data:data
			})
			.then(response => {

			console.log("Inventory created successfully")


			})
			.catch(error => {
				alert("Error setting inventory")
				console.log(error)
				this.errored=true
			})
			.finally(() => {
				this.ready = true
			})

	})*/

  },

  methods:{

  	async addFeature(event,feature){

  		//console.log("............feature   "+JSON.stringify(this.product_features.some(item => item.name === feature.name)))

  		if(!this.product_features.some(item => item.name === feature.name)) {

	  		var options_name = prompt("Please enter options with ',' as separator. If just there is one option, dont write ','", "option name");

	  		if(options_name == null){
	  			return
	  		}

	  		var names = options_name.trim().split(",")

  			this.product_features.push(feature)

  			for(k in names){

				console.log("----- features   names "+k+" -- "+names[k])


  				await axios
			      .post(properties.protocol+properties.baseurl+properties.port+'/setProductFeature',{
		            data:{
		            	product:this.selected_product,
		            	feature:feature,
		            	name:names[k]
		            }
		          })
			      .then(response => {

			      	console.log("Option created successfully")
					/*console.log(JSON.stringify({
		            	product:this.selected_product,
		            	feature:feature,
		            	name:names[k]
		            }))*/

					/*this.$emit("product_feature_option_setted",{
						product:this.selected_product,
		            	feature:feature,
		            	name:names[k]
					})*/


				  	})
				  .catch(error => {
				  	alert("Error setting feature value")
			      	console.log(error)
			      	this.errored=true
			      })
			      .finally(() => {
			      	this.ready = true
			      })

  			}

			

  		}

  	},
  	removeFeature:function(feature){

  		if(!confirm("Remove this feature?")){
  			return
  		}

  		axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/removeFeature',{
	            data:feature
	          })
		      .then(response => {

		      	console.log("Feature removed successfully")

				alert(response.data)

		      	this.$emit("feature_removed")
		      	this.$root.$emit("feature_removed")


			  	})
			  .catch(error => {
			  	alert("Error aeliminando opción")
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true
		      })

  	}
  },
  template: '<div class="col-sm-12" v-if="feature.name.toLowerCase().trim().includes(search_feature.toLowerCase().trim())"><label class="tag_item" v-on:click="addFeature($event,feature)" >{{feature.name}}</label><i class="fas fa-trash-alt icon_product" v-on:click = "removeFeature(feature)"></i></div>'
				//
})