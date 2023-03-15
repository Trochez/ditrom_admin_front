

Vue.component('product_buy_item',{

  props: ['product'],
  mounted(){

	console.log("product_buy_item  product "+JSON.stringify(this.product))

  },

  methods:{
	showimg:function(event,path){

		this.$root.$emit("show_img_product_list",path)

	}
  },
  template: '<tr class="tablechild"><td class="tdwish" colspan = "2"><img :src="\'/ditrom/products/\'+product.ref+\'/1.jpeg\'" v-on:click="showimg($event,\'/ditrom/products/\'+product.ref+\'/1.jpeg\')" loading="lazy"></td><td class="tdwish" colspan = "2">{{product.ref}}</td><td class="tdwish" colspan = "1"> {{product.name}}</td><td class="tdwish" colspan = "3"> {{product.cart_description}}</td></tr>'
				//
})