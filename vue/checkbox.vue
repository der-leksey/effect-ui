<template>
    <label class="checkbox">
        <input v-model="computedValue" type="checkbox" :name="name"
        :value="val" :true-value="trueVal" :false-value="falseVal"
    >
        <span class="checkbox-check"></span>
        <span v-if="label" class="checkbox-label"><slot>{{ val }}</slot></span>
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
        trueVal: {
            default: true,
        },
        falseVal: {
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
            this.newValue = value
        }
    },
}
</script>

