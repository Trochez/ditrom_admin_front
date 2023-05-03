
Vue.component('user_item',{
  props: ['user','selected_user','search_user'],

  methods:{
    
  	showUserModal:function(event,selected_user){

  		modal.showUser = !modal.showUser

      if(modal.showUser){
        modal.selected_user = selected_user
      }

  		//console.log("in showUserModal  user_item  "+JSON.stringify(modal.showUser))
  	},
    
    changeEnabled:function(event,user){

      if(event.target.checked){
        user.enabled = 1
      }
      else{
        user.enabled = 0
      }

      var user_to_update = user 

      this.$delete(user_to_update,'datetime')

       axios
          .post(properties.protocol+properties.baseurl+properties.port+'/setUser',{
            data:user
          })
          .then(response => {

            this.$root.$emit("cahnge_user")


          })
          .catch(error => {
            console.log(error)
            this.errored=true
            alert("Error updating user")
          })
          .finally(() => {
            this.ready = true
          })

    }
  },
  template: '<tr class="product_tr" v-if="JSON.stringify(user).includes(search_user) "><td class="user_td">{{user.name}}</td><td class="user_td">{{user.lastname}}</td><td class="user_td">{{user.mail}}</td><td class="user_td">{{user.tel}}</td><td class="user_td">{{user.address}}</td><td class="user_td">{{user.datetime}}</td><td class="user_td"><input type="checkbox" checked :ref="user.mail+\'-enabled\'" :id="user.mail+\'-enabled\'" v-if="user.enabled == 1" v-on:click="changeEnabled($event,user)" v-model="user.enabled"><input type="checkbox" :ref="user.mail+\'-enabled\'" :id="user.mail+\'-enabled\'" v-else v-on:click="changeEnabled($event,user)" v-model="user.enabled"></td><td class = "user_td"><i class="fas fa-file-invoice-dollar icon_product" v-on:click="showUserModal($event,user)"></i></td><td class = "user_td"></td></tr>'
				//
})