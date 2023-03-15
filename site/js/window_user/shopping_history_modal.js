

Vue.component('shopping_history_modal',{
  props: ['selected_user'],
  data () {
	    return {
			
	    	img:null,
			imgpath:null,
			buyList:[],
			show_bill:{}
	    }
  },
  mounted(){
	this.$root.$on("show_img_product_list",function(imgpath){
		this.imgpath = imgpath
	})

	this.getBuyList()
  },
  methods:{
  	
	getBuyList:function(){

		//console.log("getBuyList  ")

		axios
		.post(properties.protocol+properties.baseurl+properties.port+'/getBuyList',{
			user_mail:this.selected_user.mail,
		})
		.then(response => {

			//console.log("buylist  "+JSON.stringify(response.data))

			this.buyList = response.data

			})
			  .catch(error => {
			console.log(error)
			this.errored=true
		})
		.finally(() => {
			this.ready = true
		})

	},
	showuser:function(event){

		this.$root.$emit("show_user_buy_list",event)


	}

},

	

  template: '<div class="modalglobal" v-on:click="showuser($event)" id="modaluser" ref="modaluser"><div class="modalcontent_buy_history bottompatern tcenter" id="modaluserintern" ref="modaluserintern"><div class="allheight allwidth"><div class="modaltitle product_title sliderpatern "><h3 >Shopping history {{selected_user.name}}</h3></div><div class="col-sm-12 fleft wishpatern" ><table class="allwidth tbwish" ><tr class="wishtitles"><th class="tdwish"></th><th class="tdwish">Ref</th><th class="tdwish">Status</th><th class="tdwish">Value</th><th class="tdwish">Date</th></tr><tbody ><template v-for="bill_item in buyList"><buy_item :bill_item="bill_item" :show_bill="show_bill"></buy_item><template class="tablechild" v-if="show_bill"><template v-if="show_bill[bill_item.ref]"><product_buy_list :products="bill_item.products"></product_buy_list><template v-for="product in bill_item.products"><product_buy_item :product="product"></product_buy_item></template></template></template></template></tbody></table></div><img_product_buy_item :img="imgpath"></img_product_buy_item></div></div></div>'
				//
})