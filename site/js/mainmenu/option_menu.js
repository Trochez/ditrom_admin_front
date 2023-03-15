

Vue.component('option_menu',{
  props: ['option'],
  methods:{
  	loadScreen:function(url){

  		console.log("in loadScreen  "+url)

		window.history.pushState("","", "?screen="+url)

  		$("#screen").load(url)

  	}
  },
  template: '	<div class = "icondiv" v-on:click="loadScreen(option.screen)"><i :class="option.icon" ></i><label>{{option.name}}</label></div>'
				//
})