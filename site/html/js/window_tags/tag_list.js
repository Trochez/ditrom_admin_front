

Vue.component('tag_list',{
  props: ['selected_product','product_tags'],
  data () {
	    return {
	    	search_tag:"",
	    	tags:[]
	    }
  },
  mounted(){
  	this.loadTags()
  },
  methods:{

  	loadTags:function(){

  		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/getTags')
	      .then(response => {

	      	this.tags = response.data;

		  	})
				.catch(error => {
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })

  	},
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
  	addTagPool:function(){

  		//console.log("tag  "+JSON.stringify(tag))

  		var tag = window.prompt("write the new tag name","tag");


		axios
	      .post(properties.protocol+properties.baseurl+properties.port+'/addTag',{
            data:{
            	tag:tag
            }
          })
	      .then(response => {

	      	this.loadTags()
	      	console.log("tag asign successfully")


		  	})
		  .catch(error => {
		  	alert("error asigning tag")
	      	console.log(error)
	      	this.errored=true
	      })
	      .finally(() => {
	      	this.ready = true
	      })


  	}
  },
  template: '<div class="col-sm-4 fleft allheight"><div class="col-sm-12 fleft tags_title"><label class="">Tags</label><i class="fas fa-plus-square plus_tag" v-on:click="addTagPool" title="Create tag"></i></div><i class="fas fa-search search_tag_icon"></i><input type="text" v-model="search_tag" name="search_tag" id="search_tag" ref="search_tag" class="search_tag"><div id="tag_list" class="tag_list" ref = "tag_list"><template v-for="tag in tags"><tag :selected_product="selected_product"  :product_tags="product_tags" :tag="tag" :search_tag="search_tag" v-on:tag_removed="loadTags"/></template></div></div>'
				//
})