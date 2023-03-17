

Vue.component('img_new',{
  props: ['selected_product'],

  data () {
	    return {
        path:"./"+this.selected_product.ref+"/"
	    }
  },

  mounted(){
  

  },

  watch:{

  	selected_product(){

  	}

  },
  methods:{

    addImage:function(event){

      event.preventDefault();

      console.log("in addImage files0  "+JSON.stringify(event.dataTransfer.files[0]))

    },
    clickInput:function(event){

      //event.preventDefault();

      document.getElementById('file').click()

      console.log("in clickInput files0  ")



    },
    loadImg:function(event){

      //console.log(event.target.files)

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

      //console.log("image size   "+images.length)

      images.append( 'selected_product' , JSON.stringify(this.selected_product));

      this.$root.$emit("img_updated")

      //console.log("selected_product   "+images.get("selected_product"))

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/addImage',images,{headers:{'Content-Type': 'multipart/form-data'}})
        .then(response => {

          selected_product.imgqnt += files.length

          console("response ok addimg add imgqnt  "+JSON.stringify(response))


      })
      .catch(error => {
          console.log("ERROR   "+JSON.stringify(error))
          this.errored=true
        })
        .finally(() => {
          this.ready = true
          
          window.location.reload()
        })


    }

  	
  },
  template: '<div class=" col-sm-2 img_div img_new" v-on:drop="addImage" v-on:drag="addImage" v-on:click="clickInput"><i class="fas fa-plus-square " ></i><input type="file" name="file" id="file" ref="file" multiple v-on:change="loadImg"><label class="col-sm-12">Put image here...</label></div>'
				//
})