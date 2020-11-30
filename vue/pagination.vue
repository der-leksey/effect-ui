<template>
    <ul v-if="pages.length > 1" class="pagination">

        <template v-for="p in pages">
            
            <li v-if="!p">
                <span class="pagination-dots">...</span>
            </li>
            <li v-else>
                <a class="pagination-link"
                    :class="{ 'is-active' : p == page }"
                    @click.prevent="click(p)"
                    :href="path + '?page='+p"
                >
                    {{ p }}
                </a>
            </li>
            
        </template>
        
    </ul>
</template>



<script>
export default {

    computed: {
        pages() {
            const last = Math.ceil(this.total / this.limit);
            let arr = [1, this.page-1, this.page, this.page+1, last]
            arr = arr.filter((v, i, a) => a.indexOf(v) === i && v && v <= last); 
            last - this.page > 2 && arr.splice(-1, 0, 0);
            this.page > 3 && arr.splice(1, 0, 0);
            return arr;
        },
    },

    methods: {
        click(val) {
            if (val === this.page) return;
            //console.log(this.pages);
            this.$emit('update:page', val);
            this.$emit('change', val);
        },
    },

    data() {
        return {
            path: window.location.pathname,
        }
    },

    props: ['total', 'limit', 'page'],
    
}
</script>
