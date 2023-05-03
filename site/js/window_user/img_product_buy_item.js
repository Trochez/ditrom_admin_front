

Vue.component('img_product_buy_item',{
  props: ['img'],

  mounted(){
  },

  methods:{
    
    showimg:function(event,path){

      this.img = null
    }
    
  	
  },
  template: '<div v-if="img" v-on:click="showimg" class="zoomimg"><div class="divimgslider"><img :src="img" class="imgpromo" loading="lazy"></div></div>'
				//
})