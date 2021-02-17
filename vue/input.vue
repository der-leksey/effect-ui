<template>
	<label
		class="field"
		:class="[{'not-empty': value} || {filename, 'show-validate': blured}, 'field-type-' + type]"
	>	

		<transition name="error">
			<span v-if="error" class="field-error" v-html="error"></span>
		</transition>

		<span v-if="message && !error" class="field-message" v-html="message"></span>
		
		<span v-if="type=='file'" class="field-filename" v-html="filename"></span>

		<input v-if="type=='file'"
			v-bind="$attrs"
			class="input"
			type="file"
			@input="attachFile($event)"
		>

		<textarea v-else-if="type=='textarea'"
			v-bind="$attrs"
			class="input"
			:value="computedValue"
			@input="onInput($event)"
			@blur="blured = true"
			:placeholder="placeholder"
		></textarea>

		<input v-else
			v-bind="$attrs"
			class="input"
			:type="type"
			:value="computedValue"
			@input="onInput($event)"
			@blur="blured = true"
			:pattern="patterns[type]"
			:placeholder="placeholder"
		>

		<span class="field-label" v-html="label"></span>
		<slot></slot>
		<span class="field-bar"></span>
		
	</label>
</template>


<script>
export default {

	methods: {
		attachFile($e) {
			this.$emit('input', $e.target.files[0]);
			if ($e.target.files[0]) {
				this.filename = $e.target.files[0].name;
			} else {
				this.filename = '';
			}
			
		},
		onInput(event) {
            this.$nextTick(() => { // скопировано из buefy, разобраться, зачем это
                if (event.target) {
                    this.computedValue = event.target.value
                }
            })
        },
	},

	data() {
		return {
			newValue: this.value,
			patterns: {
				email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}',
				tel: '[0-9 ()\\-+]{6,}' // примитивная проверка на телефон
			},
			blured: false,
			filename: ''
		}
	},

	props: {
		value: {},
		label: {},
		error: {},
		message: {},
		type: {
			default: 'text'
		},
		placeholder: {
			default: ' '
		},
	},

	computed: {
		computedValue: {
			get() {
				return this.newValue
			},
			set(value) {
				this.newValue = value
				this.$emit('input', value)
			}
		},
	},
	watch: {
        value(value) {
            this.newValue = value
        }
    },
	inheritAttrs: false,
}
</script>
