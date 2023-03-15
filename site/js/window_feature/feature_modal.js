

Vue.component('feature_modal',{
  props: ['selected_product'],
  data () {
	    return {
	    	 product_features:[]
	    }
  },
  methods:{
  	
  	showFeature:function(event){

      //console.log("........in option modal  "+JSON.stringify(featuremodal.showFeature)+"   "+event.target.id)

  		if(event.target.id != 'featuremodal' && featuremodal.showFeature){
  			return
  		}

  		featuremodal.showFeature = !featuremodal.showFeature
  		
  	},
  	
    updateProductFeatures:function(value){

      this.product_features = value
    }
  },

  template: '<div class="modalglobal"  id="featuremodal" ref="featuremodal" v-on:click="showFeature"><div class="modalcontent  tcenter" id="modalfeature_intern" ref="modalfeature_intern"><div class="col-sm-12 allheight"><feature_list :selected_product = "selected_product" :product_features="product_features"/><feature_product :selected_product="selected_product" v-on:update="updateProductFeatures($event)"  :product_features="product_features"/> </div></div></div>'
				//
})