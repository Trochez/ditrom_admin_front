

Vue.component('product_buy_list',{
  props: ['products'],
  data () {
	    return {
			products_list:this.products
	    }
  },
  mounted(){
	  console.log("product_buy_list products  "+JSON.stringify(this.products_list))
  },
  methods:{

  	
  },
  template: '<tr class="tablechild"><th class="tdwish" colspan = "2">PIC</th><th class="tdwish" colspan = "2">Ref</th><th class="tdwish" colspan = "1">Name</th><th class="tdwish" colspan = "3">Description</th></tr>'
				//
})