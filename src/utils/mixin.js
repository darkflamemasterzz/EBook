import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'menuVisible'
        ])
    },
    methods: {
        ...mapActions(['setMenuVisible'])
    }
}
