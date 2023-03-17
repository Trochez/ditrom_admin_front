

Vue.component('tag',{

  props: ['selected_product','product_tags','tag','search_tag'],

  methods:{

  	addTag:function(event,tag){

  		//console.log("tag  "+JSON.stringify(tag))

  		if(!this.product_tags.includes(tag)){

  			this.product_tags.push(tag)

			axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/setProductTag',{
	            data:{
	            	product:this.selected_product,
	            	tag:tag
	            }
	          })
		      .then(response => {

		      	console.log("Tag asignado correctamente")


			  	})
			  .catch(error => {
			  	alert("Error asignando tag")
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true
		      })

  		}

  	},
  	removeTag:function(tag){

  		if(!confirm("remove this tag of the list?")){
  			return
  		}

  		axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/removeTag',{
	            data:tag
	          })
		      .then(response => {

		      	console.log("tag removed successfully")

		      	this.$emit("tag_removed")
		      	this.$root.$emit("tag_removed")


			  	})
			  .catch(error => {
			  	alert("Error removing tag")
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true
		      })

  	}
  },
  template: '<div class="" v-if="tag.tag.toLowerCase().trim().includes(search_tag.toLowerCase().trim())"><label class="tag_item" v-on:click="addTag($event,tag)" >{{tag.tag}}</label><i class="fas fa-trash-alt icon_product" v-on:click = "removeTag(tag)"></i></div>'
				//
})