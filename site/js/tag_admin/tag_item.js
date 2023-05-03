

Vue.component('tag_item',{
  props: ['tag','search_tag'],
  data () {
	    return {
	    }
  },
  mounted(){

    //console.log("tag_item tag "+JSON.stringify(this.tag))

  },
  updated(){

  },
  methods:{

    removeTag:function(event,tag){

  		if(!confirm("remove this tag of the list?")){
  			return
  		}

  		axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/removeTag',{
	            data:tag
	          })
		      .then(response => {

		      	console.log("tag removed successfully")

		      	this.$root.$emit("change_tag")


			  	})
			  .catch(error => {
			  	alert("Error removing tag")
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true
		      })

  	},
    showProducts:function(event,tag){

      this.$root.$emit("show_products",tag)
      
    }

  },
  template: '<div><label class="tag_item" v-if="tag.tag.toLowerCase().trim().includes(search_tag.toLowerCase().trim())" v-on:click="">{{tag.tag}}<i class="fas fa-trash icon_tag" title = "remove tag" v-on:click="removeTag($event,tag)"></i><i class="fas fa-ellipsis-v icon_tag" title = "edit product with tag" v-on:click="showProducts($event,tag)"></i></label></div>'
				//
})	