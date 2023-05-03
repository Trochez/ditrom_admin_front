

Vue.component('users_board',{
  props: ['search_user'],
  data () {
	    return {
	    	users:[]
			
	    }
  },
  mounted(){

  	this.getUsers()

	var ths = this

	this.$root.$on("cahnge_user",function(){
		ths.getUsers()
	})


  },
  updated(){
  	

  },
  methods:{
  	getUsers: function(){

  		axios
		      .post(properties.protocol+properties.baseurl+properties.port+'/getUsers')
		      .then(response => {

		      	this.users = response.data;

			  	})
			  .catch(error => {
		      	console.log(error)
		      	this.errored=true
		      })
		      .finally(() => {
		      	this.ready = true

		      })

  	}
  },
  template: '<div class="div_table_products"><table class="table_products">	<thead class="thead_products"><tr class="tr_head_products"><th class="th_products">Name</th><th class="th_products">Lastname</th><th class="th_products">Mail</th><th class="th_products">Tel</th><th class="th_products">Address</th><th class="th_products">creation date</th><th class="th_products">Enabled</th><th class="th_products">Shopping history</th></tr></thead><tbody class="tbody_products"><template v-for="(user,index) in users"><user_item :id="user.mail" :user = "user" :search_user = "search_user" /></template></tbody></table></div>'
				//
})	