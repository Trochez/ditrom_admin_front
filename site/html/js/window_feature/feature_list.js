

Vue.component('feature_list',{
  props: ['selected_product','product_features'],

  data () {
    return{
      search_feature:"",
      features:[]
    }
  },

  mounted(){

    //console.log("selected_product option list  "+JSON.stringify(this.selected_product))

    this.loadFeatures()

  	//this.img_indexes = (1 to this.selected_product.imgqnt)

    //console.log("img_indexes  "+JSON.stringify(this.img_indexes))

  },
  methods:{

    loadFeatures:function(){

      console.log("in loadFeatures")

      var data = {
        product_ref:this.selected_product.ref
      }

      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/getfeatures')
        .then(response => {

          this.features = response.data;

          //console.log("features feature_list  "+JSON.stringify(this.features))

        })
        .catch(error => {
          console.log(error)
          this.errored=true
        })
        .finally(() => {
          this.ready = true
        })

    },

    addFeaturePool:function(){

      var feature = window.prompt("Name of feature to create","feature");


      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/addFeature',{
            data:{
              feature:feature
            }
          })
        .then(response => {

          this.loadFeatures()
          console.log("Caracteristica creada correctamente")


        })
      .catch(error => {
        alert("Error saving feature")
          console.log(error)
          this.errored=true
        })
        .finally(() => {
          this.ready = true
        })


    }
  },
  template: '<div class="col-sm-4 fleft allheight"><div class="col-sm-12 fleft tags_title"><label class="">Features</label><i class="fas fa-plus-square plus_tag" v-on:click="addFeaturePool" title="Create feature"></i></div><i class="fas fa-search search_tag_icon"></i><input type="text" v-model="search_feature" name="search_feature" id="search_feature" ref="search_feature" class="search_tag"><div id="feature_list" class="tag_list" ref = "feature_list"><template v-for="feature in features"><feature :selected_product="selected_product"  :product_features="product_features" :feature="feature" :search_feature="search_feature" v-on:feature_removed="loadFeatures"/></template></div></div>'
})