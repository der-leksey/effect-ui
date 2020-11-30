<template>
    <label class="radio" :class="{disabled: disabled}">
		<input v-model="computedValue" type="radio" :name="name"
			:value="val"
			:disabled="disabled"
		>
		<span class="radio-check"></span>
		<span v-if="label" class="radio-label"><slot>{{ val }}</slot></span>
	</label>
</template>



<script>
export default {

    data() {
        return {
            newValue: this.value
        }
    },

    props: {
        val: {},
        disabled: {
            default: false,
        },
        label: {
            type: Boolean,
            default: true,
        },
        value: {},
        name: {
            type: String,
        },
    },


    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        }
    },

    watch: {
        value(value) {
            this.newValue = value;
        },
        disabled(v) {
            if (!!v && this.value == this.val) {
                this.newValue = '';
                this.$emit('input', '');
            }
        }
    },

}
</script>
