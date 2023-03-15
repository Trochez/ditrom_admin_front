

Vue.component('promotion_board',{
    props: ['search_promotion'],
    data () {
          return {
              promotions:[],
              new_promotion:null,
              pathpromotion:properties.pathpromotion,
              date:null,
              promotions_length:0
          }
    },
    mounted(){
  
      console.log("search_promotion  "+this.search_promotion)
  
        this.getPromotions()
  
        var ths = this
  
        this.$root.$on("set_promotion",function(){
  
          modal.showTag = !modal.showTag
  
        })

        this.$root.$on("update_tag_promotion",function(promotion){
  
            modal.showTag = !modal.showTag
            modal.selected_promotion = promotion
    
        })
  
        this.$root.$on("change_promotions",function(){
  
            console.log("in change_promotions ++++")

            ths.getPromotions()
  
        })

        this.$root.$on("update_promotion_name",function(promotion){
  
            console.log("in change_promotions ++++")

            ths.uodatePromotion(promotion)
  
        })
  
    },
    updated(){
  
        if(this.new_promotion){
  
            document.getElementById(this.new_promotion).className="hover_new"
  
        }
  
    },
    methods:{
        getPromotions: function(){
  
            axios
                .post(properties.protocol+properties.baseurl+properties.port+'/getPromotions')
                .then(response => {

                    //console.log("------ getPromotions   "+JSON.stringify(response.data))
  
                    this.promotions = response.data
                    this.date = new Date()
                    this.promotions_length = this.promotions.length
  
                    })
                .catch(error => {
                    console.log(error)
                    this.errored=true
                })
                .finally(() => {
                    this.ready = true
  
                })
  
        },
        deletepromotion:function(event,promotion,index){
  
            if(!confirm("Remove this promotion?")){
                return
            }
  
            axios
            .post(properties.protocol+properties.baseurl+properties.port+'/deletepromotion',{
              data:promotion
            })
            .then(response => {
  
                this.$delete(this.promotion,index)
  
  
  
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
        uodatePromotion:function(promotion){

            for(var i in this.promotions){

                if(this.promotions[i].name == promotion.name && this.promotions[i].id != promotion.id){
                    alert("There is other promotion with this name")
                    this.$root.$emit("change_promotions")
                    return
                }

            }

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
            })
            .finally(() => {
                this.ready = true
            })
        }
    },
    template: '<div id = "paternpromotion" class="paternpromo" ><template v-for="promotion in promotions"><promotion :promotion="promotion" :search_promotion="search_promotion" :promotions_length="promotions_length"/></template></div>'
                  //
  })	