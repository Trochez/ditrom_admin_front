

Vue.component('category',{
  props: ['search_category','category','categories_length'],
  data () {
	    return {
	    	categories:[],
	    	new_category:null,
			  pathcategory:properties.pathcategory,
        selected_category:null,
        path_img:properties.protocol_img+properties.pathimg+this.pathcategory+properties.pathseparator+'img'+properties.pathseparator+tags+properties.pathseparator+category.tag+'.JPG'+properties.rest_img
	    }
  },
  mounted(){

    //console.log("category   "+JSON.stringify(this.category))


  },
  updated(){

  },
  methods:{

    showTagModal:function(event,selected_category){

  		modal.showTag = !modal.showTag

      if(modal.showTag){
        modal.selected_category = selected_category
      }

  		//console.log("in showTagModal  product_item  "+JSON.stringify(modal.showTag))
  	},
    deactivateCategory:function(event,category){
      
      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setSimpleCategory',{
            data:{
              id:category.category_id,
              active:0,
              tag_id:category.id,
              order_position:category.order_position
            }
          })
          .then(response => {

            this.$root.$emit("change_categories")

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting category")
          })
          .finally(() => {
            this.ready = true
          })
    },
    activateCategory:function(event,category){
      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setSimpleCategory',{
            data:{
              id:category.category_id,
              active:1,
              tag_id:category.id,
              order_position:category.order_position
            }
          })
          .then(response => {

            this.$root.$emit("change_categories")

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting category")
          })
          .finally(() => {
            this.ready = true
          })
    },
    clickFileCategory:function(event,category){



      document.getElementById("file_category_"+category.tag).click()


    },
    uploadImage:function(event,category){

      var files = event.target.files
      
      var images = new FormData()

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for( var i = 1; i <= files.length; i++ ){

        let file = files[i-1]

        //console.log(file)

        images.append( i , file);
      }

      images.append('tag',category.tag)
      
      this.$root.$emit("img_updated")

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/addImageCategory',images,{headers:{'Content-Type': 'multipart/form-data'}})
        .then(response => {

          console.log("....... ssuccess addImageCategory")

          alert(response.data)

      })
      .catch(error => {
          console.log("ERROR   "+JSON.stringify(error))
          this.errored=true
      })
      .finally(() => {
        this.ready = true
        
        window.location.href = window.location.href


      })

    },
    removeCategory:function(event,category){

      if(!confirm("Remove this category?")){
        return
      }

      this.$root.$emit("img_updated")

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/deleteCategory',{
            data:{
              category_id:category.category_id,
              tag:category.tag
            }
          })
          .then(response => {

            this.$root.$emit("change_categories")

            alert(response.data)

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting category")
          })
          .finally(() => {
            this.ready = true
            window.location.href = window.location.href
          })
    },
    displaceCategory:function(category,order_position_displace){

      var old_position = category.order_position
      var new_position = category.order_position+order_position_displace

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/displaceCategory',{
            data:{
              old_position:old_position,
              new_position:new_position
            }
          })
          .then(response => {

            this.$root.$emit("change_categories")

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
  template: '<div  class="category" v-if="category.tag.toLowerCase().includes(search_category)"  :id="category.id" ><img :src="properties.protocol_img+properties.pathimg+pathcategory+properties.pathseparator+img+properties.pathseparator+tags+properties.pathseparator+\'+category.tag+\'.JPG\'+properties.rest_img" class="imghome" loading="lazy"><div class = "option_category "><div class="title_category">{{category.tag}}</div><div><i v-if="category.order_position>1" class="fas fa-caret-left icon_category" v-on:click="displaceCategory(category,-1)"></i><i v-if="category.active == 1" class="fas fa-toggle-on icon_category" title="deactivate" v-on:click="deactivateCategory($event,category)"></i><i v-else class="fas fa-toggle-off icon_category" title="activate" v-on:click="activateCategory($event,category)"></i><i class="fas fa-image icon_category" title = "change picture" v-on:click="clickFileCategory($event,category)"></i><i class="fas fa-trash icon_category" title = "remove category" v-on:click="removeCategory($event,category)"></i><i v-if="categories_length>category.order_position" class="fas fa-caret-right icon_category" v-on:click="displaceCategory(category,1)"></i></div></div><input type="file" :name="\'file_category_\'+category.tag" :id="\'file_category_\'+category.tag" :ref="\'file_category_\'+category.tag" multiple v-on:change="uploadImage($event,category)"></div>'
				//
})	