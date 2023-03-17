

Vue.component('tag_pool',{
    data () {
          return {
              tags:[],
              search_tag:"",
              order_position:null,
              selected_tag:null
          }
    },
    mounted(){

        this.getCategoryOrder()

        this.loadTags()

    },
    methods:{

        getCategoryOrder:function(){

            axios
            .post(properties.protocol+properties.baseurl+properties.port+'/getCategoryOrder')
            .then(response => {

                console.log("getCategoryOrder   "+JSON.stringify(response))
  
                this.order_position = response.data[0].order_position+1;

                console.log("order_position   "+this.order_position)

  
            })
            .catch(error => {
                console.log(error)
                this.errored=true
            })
            .finally(() => {
                this.ready = true
            })

        },
      
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
        setCategory:function(event,tag){

            console.log("setCategory   "+this.order_position)

            this.selected_tag = tag

            document.getElementById('file').click()

        },
        uploadCategory:function(event){

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
            
            images.append( 'selected_category' , JSON.stringify({
                tag_id:this.selected_tag.id,
                order_position:this.order_position,
            }));

            images.append('tag',this.selected_tag.tag)
            
            this.$root.$emit("img_updated")
      
            axios
              .post(properties.protocol+properties.baseurl+properties.port+'/setCategory',images,{headers:{'Content-Type': 'multipart/form-data'}})
              .then(response => {

                //console.log("....... ssuccess setCategory")

                alert(response.data)
            
                vcategory_board.$emit("change_categories")
      
      
            })
            .catch(error => {
                console.log("ERROR   "+JSON.stringify(error))
                this.errored=true
              })
              .finally(() => {
                this.ready = true
                
                //window.location.reload()
                window.location.href = window.location.href


              })
      
      
          }

      
    },
  
    template: '<div class = "tag_pool"><i class="fas fa-search search_tag_icon"></i><input type="text" v-model="search_tag" name="search_tag" id="search_tag" ref="search_tag" class="search_tag"><div class="tag_pool_intern"><template v-for="tag in tags"><label class="tag_item" v-on:click="setCategory($event,tag)">{{tag.tag}}</label></template></div></i><input type="file" name="file" id="file" ref="file" multiple v-on:change="uploadCategory"></div>'
                  //
  })