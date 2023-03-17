

Vue.component('img_zoom',{
  props: ['image'],

  mounted(){
  },

  methods:{

    hide:function(){
      this.$root.$emit('hide_img')
    }
  	
  },
  template: '<div class = "img_zoom_div" v-if="image" v-on:click="hide"><img class="allheight" :src="image"></div>'
				//
})