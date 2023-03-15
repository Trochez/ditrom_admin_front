Vue.component('promotion',{
 props: ['search_promotion','promotion','promotions_length'],
 data () {
	 return {
	 	promotions:[],
	 	new_promotion:null,
    pathpromotion:properties.pathpromotion,
    selected_promotion:null
	 }
  },
  created(){
    this.promotions.push(this.promotion)
    console.log("promotionssss   "+JSON.stringify(this.promotions));
  },
  mounted(){

  },
  methods:{

    UpdatePromotion:function(event,promotion){

      this.$delete(promotion,'datetime')
      this.$delete(promotion,'tag')
      this.$set(promotion,'name',event.target.value)

      this.$root.$emit("update_promotion_name",promotion)

      //console.log("*******     promotion to update name    "+JSON.stringify(promotion))

    },

    displacePromotion:function(promotion,order_position_displace){

      console.log("in  displacePromotion")

      var old_position = promotion.order_position
      var new_position = promotion.order_position+order_position_displace

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/displacePromotion',{
            data:{
              old_position:old_position,
              new_position:new_position
            }
          })
          .then(response => {

            this.$root.$emit("change_promotions")

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting promotion")
          })
          .finally(() => {
            this.ready = true
          })

    },
    deactivatePromotion:function(event,promotion){

      this.$delete(promotion,'datetime')
      this.$delete(promotion,'tag')
      this.$set(promotion,'available',0)

      
      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setPromotionSingle',{
            promotion:promotion
          })
          .then(response => {

            this.$root.$emit("change_promotions")

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting promotion")
          })
          .finally(() => {
            this.ready = true
          })
    },
    activatePromotion:function(event,promotion){

      this.$delete(promotion,'datetime')
      this.$delete(promotion,'tag')
      this.$set(promotion,'available',1)

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setPromotionSingle',{
            promotion:promotion
          })
          .then(response => {

            this.$root.$emit("change_promotions")

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting promotion")
          })
          .finally(() => {
            this.ready = true
          })
    },
    removePromotion:function(event,promotion){

      if(!confirm("Remove this promotion?")){
        return
      }

      this.$root.$emit("img_updated")

      axios
          .post(properties.protocol+properties.baseurl+properties.port+'/deletePromotion',{
            promotion:promotion
          })
          .then(response => {

            this.$root.$emit("change_promotions")

            alert(response.data)

          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error deleting promotion")
          })
          .finally(() => {
            this.ready = true
            window.location.href = window.location.href
          })
    },
    clickFilePromotion:function(event,promotion){



      document.getElementById("file_promotion_"+promotion.name).click()


    },
    uploadImage:function(event,promotion){

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

      images.append('name',promotion.name)
      
      this.$root.$emit("img_updated")

      axios
        .post(properties.protocol+properties.baseurl_img+properties.port_img+'/addImagePromotion',images,{headers:{'Content-Type': 'multipart/form-data'}})
        .then(response => {

          console.log("....... ssuccess addImagePromotion")

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
    showDescription:function(event,promotion){

      promotionDescription = window.prompt("edit promotion description", promotion.description);

      if(promotionDescription == null || promotionDescription == promotion.description){
        return
      }

      var promotionToUpdate = promotion

      this.$delete(promotionToUpdate,'tag')
      this.$delete(promotionToUpdate,'datetime')
      this.$set(promotionToUpdate,'description',promotionDescription)

      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/setPromotionSingle',{
          promotion:promotionToUpdate
        })
        .then(response => {

          this.$root.$emit("change_promotions")

        })
        .catch(error => {
          console.log(error)
          this.errored=true
          alert("Error deleting promotion")
        })
        .finally(() => {
          this.ready = true
        })

    }
    
  },

  template:'<div class="promo_admin category admin_promotion_item"><img class = "img_promo_admin" :src="promotion.img" /><div class = "option_category "><div class="title_category"><input class = "input_promo_admin" type = "text" :value="promotion.name" title="name promotion" v-on:change="UpdatePromotion($event,promotion)" /><tag_promotion title="tag" :promotion="promotion" :search_rpomotion="search_promotion"></tag_promotion></div><div><i v-if="promotion.order_position>1" class="fas fa-caret-left icon_category" v-on:click="displacePromotion(promotion,-1)"></i><i v-if="promotion.available == 1" class="fas fa-toggle-on icon_category" title="deactivate" v-on:click="deactivatePromotion($event,promotion)"></i><i v-else class="fas fa-toggle-off icon_category" title="activate" v-on:click="activatePromotion($event,promotion)"></i><i class="fas fa-info-circle icon_category" title = "Description" v-on:click="showDescription($event,promotion)"></i><i class="fas fa-image icon_category" title = "change picture" v-on:click="clickFilePromotion($event,promotion)"></i><i class="fas fa-trash icon_category" title = "remove promotion" v-on:click="removePromotion($event,promotion)"></i><i v-if="promotions_length>promotion.order_position" class="fas fa-caret-right icon_category" v-on:click="displacePromotion(promotion,1)"></i></div></div><input type="file" :name="\'file_promotion_\'+promotion.name" :id="\'file_promotion_\'+promotion.name" :ref="\'file_promotion_\'+promotion.name" multiple v-on:change="uploadImage($event,promotion)"></div>'

})
