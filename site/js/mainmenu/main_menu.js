

Vue.component('main_menu',{
  props: ['options'],

  template: '<div class = "main_menu_container"><div class="menu_icon"><i class="fas fa-bars"></i></div><div class = "main_menu"><template v-for="option in options"><option_menu :option="option"></option_menu></template></div></div>'
})