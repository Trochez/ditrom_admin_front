

Vue.component('option_list',{

  props: ['selected_product','feature'],

  data () {
    return{
      options:[],
      newOption:""
    }
  },

  mounted(){
    this.getProductFeatureOptions()
  },

  methods:{

    getProductFeatureOptions:function(feature,selected_product){

      //console.log("in getProductFeatureOptions")

      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/getProductFeatureOptions',{
            data:{
              product:{
                ref:this.selected_product.ref
              },
              feature:{
                id:this.feature.id
              }
            }
          })
        .then(response => {

          this.options = response.data

          //console.log("getProductFeatureOptions   "+JSON.stringify(this.options))


        })
      .catch(error => {
        alert("Error obtiendo opciones")
          console.log(error)
          this.errored=true
        })
        .finally(() => {
          this.ready = true
        })

    },

    addFeatureOption:function(){

      var ths = this

      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/setProductFeatureOptions',{
            data:{
              product_ref:this.selected_product.ref,
              feature_id:this.feature.id,
              name:this.newOption
            }
          })
        .then(response => {

          console.log("setProductFeatureOptions   "+JSON.stringify(response.data))

          alert(response.data)

          this.getProductFeatureOptions()

          this.newOption = ""


        })
        .catch(error => {
          alert("Error obtiendo opciones")
          console.log(error)
          this.errored=true
        })
        .finally(() => {
          this.ready = true
        })

    },

    removeFeatureOption:function(option,feature,product){

      axios
        .post(properties.protocol+properties.baseurl+properties.port+'/removeProductFeatureOptions',{
            data:{
              feature_option:option.feature_option
            }
          })
        .then(response => {

          alert(response.data)

          this.getProductFeatureOptions()


        })
        .catch(error => {
          alert("Error getting options")
          console.log(error)
          this.errored=true
        })
        .finally(() => {
          this.ready = true
        })

    }


  	
  },
  template: '<div class="product_feature"><template v-for = "option in options"><div><label>* {{option.name}}</label><i class="fas fa-trash-alt icon_feature" title="Remove option" v-on:click = "removeFeatureOption(option,feature,selected_product)"></i></div></template><input class="new_option_feature highlight" type="text" :id="selected_product.ref+\'-\'+feature.id" v-on:change = "addFeatureOption()" v-model="newOption" ><i class="fas fa-plus icon_feature" v-on:click = "addFeatureOption()" title="add option"></i></div>'
				//
})