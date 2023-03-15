

Vue.component('category_board',{
  props: ['search_category'],
  data () {
	    return {
	    	categories:[],
	    	new_category:null,
			pathcategory:properties.pathcategory,
			date:null,
			categories_length:0
	    }
  },
  mounted(){

	console.log("search_category  "+this.search_category)

  	this.getCategories()

  	var ths = this

  	this.$root.$on("set_category",function(){

		modal.showTag = !modal.showTag

  	})

	this.$root.$on("change_categories",function(){

		console.log("in change_categories ++++")

		ths.getCategories()

  	})

  },
  updated(){

  	if(this.new_category){

  		document.getElementById(this.new_category).className="hover_new"

  	}

  },
  methods:{
  	getCategories: function(){

  		axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/getCategories')
		      .then(response => {

		      	this.categories = response.data
				this.date = new Date()
				this.categories_length = this.categories.length

			  	})
			  .catch(error => {
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true

		      })

  	},
  	deleteCategory:function(event,category,index){

  		if(!confirm("Remove this category?")){
  			return
  		}

  		axios
          .post(properties.protocol+properties.baseurl+properties.port+'/deleteCategory',{
            data:category
          })
          .then(response => {

          	this.$delete(this.category,index)



          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting category")
          })
          .finally(() => {
            this.ready = true
          })

  	}
  },
  template: '<div id = "paterncategory" class="div_table_products category_patern" ><template v-for="category in categories"><category :category="category" :search_category="search_category" :categories_length="categories_length"/></template></div>'
				//
})	