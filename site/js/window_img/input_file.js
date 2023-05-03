Vue.component('input_file',{
		props: ['selected_product'],
		methods:{


		showFiles(event){
	  		console.log(event.target.files)
	  	}
    },
    template: '<div><input type="file" name="file" id="file" ref="file" multiple v-on:change="showFiles"></div>'
			//
})