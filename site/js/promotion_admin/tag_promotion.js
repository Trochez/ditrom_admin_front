

Vue.component('tag_promotion',{

  props: ['search_promotion','promotion'],

  mounted(){
	console.log("promotion tag   "+JSON.stringify(this.promotion))
  },

  methods:{

	updateTagPromotion:function(){

		//console.log("in emit update tag promotion")

		this.$root.$emit("update_tag_promotion",this.promotion)
		
	}

  },
  template: '<div class=""><label class="tag_promotion" >{{promotion.tag}}<i class="fas fa-exchange-alt icon_promotion" v-on:click = "updateTagPromotion"></i></label></div>'
				//
})