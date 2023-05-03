

Vue.component('buy_item',{
  props: ['bill_item','show_bill'],

  data () {
	    return {
			
	    }
  },

  mounted(){

  

  },

 
  methods:{
  
	showProducts:function(event,bill_item){

		console.log("event.target.tagName   "+event.target.tagName)

		/*if(event.target.tagName == "i" || event.target.tagName == "I"){
			return
		}*/

		if(bill_item in this.show_bill){
			this.$delete(this.show_bill,bill_item)
		}
		else{
			this.$set(this.show_bill,bill_item,bill_item)
		}

		console.log("bill_item  "+JSON.stringify(bill_item))

	},
	formatMoney:function(price){

		var string = ""

		price = ""+price

		price = price.split("")

		price = price.reverse()

		//console.log("in formatmoney "+JSON.stringify(price)+"  --  "+typeof price)

		for(var i=price.length-1;i>=0;i--){
			if(i%3==0 && i!=0){
				string+=price[i]+"."
			}
			else{
				string+=price[i]
			}
		}

		//console.log("formatmoney  "+string)

		return string

	}
  },
  template: '<tr v-on:click="showProducts($event,bill_item.ref)"><td class="tdwish highlight"><template v-if="!show_bill[bill_item.ref]"><i class="fa fa-caret-down " aria-hidden="true"></i></template><template v-else><i class="fa fa-caret-up " aria-hidden="true"></i></template></td><td class="tdwish">{{bill_item.ref}}</td><td v-if="bill_item.state == 1" class="tdwish">Pagada</td><td v-else class="tdwish">Sin pagar</td><td class="tdwish">{{formatMoney(bill_item.amount)}}</td><td class="tdwish">{{bill_item.datetime}}</td></tr>'
				//
})