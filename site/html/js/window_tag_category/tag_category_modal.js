

Vue.component('tag_category_modal',{
  props: ['selected_category'],
  data () {
	    return {
	    }
  },
  mounted(){

	this.$root.$on("change_categories",function(){
		modal.showTag = !modal.showTag
	})
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

  template: '<div class="modalglobal"  id="tag_categorymodal" ref="tag_categorymodal" v-on:click="showCategory"><div class="modalcontent  tcenter" id="modalcategory_tag_intern" ref="modalcategory_tag_intern"><div class="col-sm-12 allheight"><label class="search_tag_icon">Select tag to become category</label><tag_pool :selected_category = "selected_category"/></div></div></div>'
				//
})