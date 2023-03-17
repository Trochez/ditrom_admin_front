

Vue.component('tag_pool',{
    props: ['flag_tag_update','selected_promotion'],
    data () {
          return {
              tags:[],
              search_tag:"",
              order_position:null,
              selected_tag:null,
              promotion_create:null
          }
    },
    mounted(){

        this.getPromotionOrder()

        this.loadTags()

        console.log("tag _ pool flag_tag_update  "+JSON.stringify(this.flag_tag_update))

    },
    methods:{

        getPromotionOrder:function(){

            axios
            .post(properties.protocol+properties.baseurl+properties.port+'/getPromotionOrder')
            .then(response => {

                console.log("getPromotionOrder   "+JSON.stringify(response))
  
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
        setPromotion:function(event,tag){

            console.log("setPromotion  "+this.order_position)
            console.log("setPromotion tag  "+JSON.stringify(tag))

            this.promotion_create = {
                tag_id:tag.id
            }

            document.getElementById('file').click()

        },
        uploadPromotion:function(event){

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

            var promotion_name = window.prompt("set new promotions name")

            /*******!!!!!!!!!!!!!!! WARNING, GET OUT THIS PART IN PRODUCTION */
            var img_promotion = "/ditrom/img/banner2.JPG";

            this.$set(this.promotion_create,'name',promotion_name)
            this.$set(this.promotion_create,'img',img_promotion)
            this.$set(this.promotion_create,'order_position',this.order_position)

            var selected_promotion = this.promotion_create

            console.log("........ promotion_create "+JSON.stringify(selected_promotion))
            
            images.append( 'selected_promotion' , JSON.stringify(selected_promotion));
           
            this.$root.$emit("img_updated")
      
            axios
              .post(properties.protocol+properties.baseurl+properties.port+'/setPromotion',images,{headers:{'Content-Type': 'multipart/form-data'}})
              .then(response => {

                //console.log("....... ssuccess setCategory")

                alert(response.data)
            
                vpromotion_board.$emit("change_promotion")
      
      
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
      
      
          },
          UpdatePromotionTag:function(event,tag){

            this.$set(this.selected_promotion,'tag_id',tag.id)
            this.$delete(this.selected_promotion,'datetime')
            this.$delete(this.selected_promotion,'tag')

            console.log("*******     select_promotion to update tag    "+JSON.stringify(this.selected_promotion))

            axios
            .post(properties.protocol+properties.baseurl+properties.port+'/setPromotionSingle',{
	            promotion:this.selected_promotion
	          })
            .then(response => {
                this.$root.$emit("change_promotions")
  
            })
            .catch(error => {
                console.log(error)
                this.errored=true
            })
            .finally(() => {
                this.ready = true
            })
  
        }

      
    },
  
    template: '<div class = "tag_pool"><i class="fas fa-search search_tag_icon"></i><input type="text" v-model="search_tag" name="search_tag" id="search_tag" ref="search_tag" class="search_tag"><div class="tag_pool_intern"><template v-for="tag in tags"><label class="tag_item" v-if="flag_tag_update==true" v-on:click="UpdatePromotionTag($event,tag)">{{tag.tag}}</label><label class="tag_item" v-else v-on:click="setPromotion($event,tag)">{{tag.tag}}</label></template></div></i><input type="file" name="file" id="file" ref="file" multiple v-on:change="uploadPromotion"></div>'
                  //
  })