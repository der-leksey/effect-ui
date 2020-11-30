import EfInput from '../vue/input.vue';
import EfRanger from '../vue/ranger.vue';
import EfRadio from '../vue/radio.vue';
import EfCheckbox from '../vue/checkbox.vue';
import EfPagination from '../vue/pagination.vue';


export default {
	install(Vue, options) {
		Vue.mixin({
			components: {
				EfInput, EfRanger, EfRadio, EfCheckbox, EfPagination
			}
		})
	}
}