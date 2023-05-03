

Vue.component('tag_board',{
    props: ['search_tag'],
    data () {
          return {
              tags:[]
          }
    },
    mounted(){

        var ths = this

        this.$root.$on("change_tag",function(){
            ths.getTags()
        })

        this.getTags()

        this.$root.$on("show_products",function(tag){
  
            modal.showProduct = !modal.showProduct
            modal.selected_tag = tag
    
        })


    },
    methods:{

      
        getTags:function(){

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
      
    },
  
    template: '<div class="tag_pool_intern"><template v-for="tag in tags"><tag_item :search_tag="search_tag" :tag="tag"></tag_item></template></div>'
                  //
  })