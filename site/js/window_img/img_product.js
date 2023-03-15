

Vue.component('img_product',{
  props: ['selected_product','img_index'],

  data () {
	    return {
        path:properties.protocol+properties.pathimg+"/"+this.selected_product.ref+"/"+this.img_index+".JPG"
	    }
  },

  mounted(){
  

  },

  watch:{

  	selected_product(){

  	}

  },
  methods:{

    removeImg:function(path,selected_product){

      console.log("in removeImg   "+path)

      console.log("parameters to deleteimg   "+JSON.stringify({
          img_name:path,
          selected_product:selected_product

      }))

      this.$root.$emit("img_updated")

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/deleteIamge',{
          img_name:path,
          selected_product:selected_product

        })
        .then(response => {

          console("response ok removeImg   "+JSON.stringify(response))


      })
      .catch(error => {
          console.log("ERROR   "+JSON.stringify(error))
          this.errored=true
        })
        .finally(() => {
          this.ready = true

          window.location.reload()

        })

    },
    seeImg:function(image){
      this.$root.$emit('show_img',image)
    }

  	
  },
  template: '<div class=" col-sm-2 img_div" ><img :src = "path" v-on:click="seeImg(path)"/><div class="col-sm-12 delete_img" v-on:click="removeImg(path,selected_product)"><i class="fas fa-trash-alt" ></i></div></div>'
				//
})