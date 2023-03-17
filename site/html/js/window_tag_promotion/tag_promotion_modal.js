

Vue.component('tag_promotion_modal',{
  props: ['selected_promotion'],
  data () {
	    return {
			flag_tag_update:false
	    }
  },
  mounted(){

	this.$root.$on("update_tag_promotion_modal",function(){
		console.log("in tag_promotion_modal update: update_tag_promotion_modal")
		modal.showTag = !modal.showTag
		this.flag_tag_update = true
	})

	this.$root.$on("set_promotion",function(){
		modal.showTag = !modal.showTag
		this.flag_tag_update = false
	})

	console.log("flag_tag_update ... "+JSON.stringify(this.flag_tag_update))
  },
  methods:{
  	
  	showCategory:function(event){

      //console.log("in option modal  "+JSON.stringify(tag_categorymodal.showCategory)+"   "+event.target.id)

  		if(event.target.id != 'tag_categorymodal' && modal.showTag){
  			return
  		}


  		modal.showTag = !modal.showTag
  		
  	}
  },

  template: '<div class="modalglobal"  id="tag_categorymodal" ref="tag_categorymodal" v-on:click="showCategory"><div class="modalcontent  tcenter" id="modalcategory_tag_intern" ref="modalcategory_tag_intern"><div class="col-sm-12 allheight"><label class="search_tag_icon">Select tag to bind to promotion</label><tag_pool :flag_tag_update="flag_tag_update" :selected_promotion = "selected_promotion"/></div></div></div>'
				//
})