<template>
	<div class="ranger">

        <div class="ranger-inputs">
            <label>
                <span>от</span>
                <input :step="step" class="input" @change="update('min')" type="number" v-model="min">
            </label>
            <label>
                <span>до</span>
                <input :step="step" class="input" @change="update('max')" type="number" v-model="max">
            </label>
		</div>

		<div ref="slider"></div>

    </div>
</template>



<script>
//import noUiSlider from 'nouislider';
//import 'nouislider/distribute/nouislider.min.css';

export default {

    data() {
        return {
			min: null, max: null
        }
    },

    methods: {
        update(m) {
			typeof(noUiSlider) !== 'undefined' && this.$refs.slider.noUiSlider.set([this.min, this.max]);
			m == 'min' ? this.$emit('update:min', this.min) : this.$emit('update:max', this.max);
			this.$emit('range');
		}
    },

    props: {
		value: {},
		limits: {},
        step: {
            default: 10,
        },
    },

	watch: { 
		//Для сброса
		value(v) {
			if (!v.length) {
				//this.$refs.slider.noUiSlider.reset();
				this.min = this.limits[0] || 0;
				this.max = this.limits[1] || 1000;
				typeof(noUiSlider) !== 'undefined' && this.$refs.slider.noUiSlider.set([this.min, this.max]);
			}
		},

		// Для v-model
		min() {
			this.$emit('input', [this.min, this.max]);
		},
		max() {
			this.$emit('input', [this.min, this.max]);
		},
	},

	created() {
		this.min = this.value[0] || this.limits[0] || 0;
		this.max = this.value[1] || this.limits[1] || 1000;
	},

    mounted() {
		if (typeof(noUiSlider) !== 'undefined') {
			noUiSlider.create(this.$refs.slider, {
				step: this.step,
				start: [this.min || this.limits[0], this.max || this.limits[1]],
				connect: true,
				range: {
					'min': this.limits[0],
					'max': this.limits[1],
				}
			});
			this.$refs.slider.noUiSlider.on('update', (values, handle) => {
				this.min = Math.round(values[0]);
				this.max = Math.round(values[1]);
			});
			this.$refs.slider.noUiSlider.on('set', (values, handle) => {
				if (this.value.length) {
					//this.$emit('update:min', this.min);
					//this.$emit('update:max', this.max);
					this.$nextTick(() => {
						this.$emit('range');
					})
					
				}
				//console.log(values)
			});
			

		}
        
    }
}
</script>

