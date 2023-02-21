<!-- eslint-disable vue/no-unused-components -->
<template>
    <div>
        <VueSelect multiple :options="crops" v-model="selectedCrops" @input="selected"></VueSelect>

        <b-row class="my-1">
                    <b-col sm="4">
                        <label for="state" 
                            >State
                        </label>
                        <multiselect
                            id="state"
                            style="border: 1px solid #ced4da"
                            placeholder="Select a state"
                            v-model="state"
                            :options="['NSW', 'VIC', 'TAS', 'QLD', 'SA', 'WA']"
                            :show-labels="false"
                            :searchable="true"
                            @input="emitState"
                        >
                        </multiselect>

                    </b-col>

                    <b-col sm="4">
                        <label for="town" 
                            >Town
                        </label>
                        <multiselect
                            id="town"
                            style="border: 1px solid #ced4da"
                            placeholder="Select a town"
                            v-model="town"
                            :options="townData"
                            :show-labels="false"
                            :searchable="true"
                            @input="emitTown"
                        >
                        </multiselect>

                    </b-col>

                    <b-col sm="4">
                        <label for="postcode" 
                            >Postcode
                        </label>
                        <multiselect
                            id="postcode"
                            style="border: 1px solid #ced4da"
                            placeholder="Select a postcode"
                            v-model="postcode"
                            :options="postcodeData"
                            :show-labels="false"
                            :searchable="true"
                            @input="emitPostcode"
                        >
                        </multiselect>

                    </b-col>
                </b-row>
    </div>
</template>


<script>
    import VueSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import Multiselect from "vue-multiselect";
    import { mapGetters } from "vuex";

    export default {

        data() {
            return {
                selectedCrops: [],
                state: "",
                town: "",
                postcode: ""
            }

        },


        components: {
            VueSelect,
            Multiselect
        },

        computed: {
            ...mapGetters({
                crops: "getCropData",
                townData: "getTownData",
                postcodeData: "getPostcodeData"
            }),
        },

        methods: {
            selected() {
                console.log(this.selectedCrops)
            },

            emitState() {

            },

            emitTown() {

            },

            emitPostcode() {

            }
        }

    }


</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

