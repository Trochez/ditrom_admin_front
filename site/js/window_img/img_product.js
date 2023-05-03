

Vue.component('img_product',{
  props: ['selected_product','img_index'],

  data () {
	    return {
        path:""
	    }
  },

  mounted(){

    this.getUrlImage()

  },

  watch:{

  	selected_product(){

  	}

  },
  methods:{

    getUrlImage:function(){

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/getUrlImage',{
          img_name:this.img_index+".JPG",
          selected_product:this.selected_product

        })
        .then(response => {

          this.path = response.data


        })
        .catch(error => {
          console.log("ERROR  axios getUrlImage "+error.message)
          this.errored=true
        })
        .finally(() => {
          this.ready = true

        })

    },

    removeImg:function(path,selected_product){

      console.log("in removeImg   "+path)

      console.log("parameters to deleteimg   "+JSON.stringify({
          img_name:this.img_index+".JPG",
          selected_product:selected_product

      }))

      this.$root.$emit("img_updated")

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/deleteImage',{
          img_name:this.img_index+".JPG",
          selected_product:selected_product

        })
        .then(response => {

          console("response ok removeImg   "+JSON.stringify(response))
          window.location.reload()


        })
        .catch(error => {
          console.log("ERROR   "+JSON.stringify(error))
          this.errored=true
        })
        .finally(() => {
          this.ready = true

          setTimeout(() => {window.location.reload()}
          ,5000)

        })

    },
    seeImg:function(image){
      this.$root.$emit('show_img',image)
    }

  	
  },
  template: '<div class=" col-sm-2 img_div" ><img :src = "path" v-on:click="seeImg(path)"/><div class="col-sm-12 delete_img" v-on:click="removeImg(path,selected_product)"><i class="fas fa-trash-alt" ></i></div></div>'
				//
})