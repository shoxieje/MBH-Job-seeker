
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        district: [],
        town: [],
        postcode: [],
        seasonality: [],
        crop: []
    }, 

    mutations: {
        SET_DISTRICT_DATA(state, x) {
            state.district = x
        },
        SET_SEASONALITY_DATA(state, x) {
            state.seasonality = x
        },
        SET_CROP_DATA(state, x) {
            state.crop = x
        },
        SET_TOWN_DATA(state, x) {
            state.town = x
        },
        SET_POSTCODE_DATA(state, x) {
            state.postcode = x
        }

    },

    actions: {

        setDistrictData({commit}) {

            axios.get(`http://localhost:8082/district`).then(

                result => {

                    let temp_town = []
                    let temp_postcode = []
                    commit("SET_DISTRICT_DATA", result.data)


                    for(let x of result.data) {
                        temp_town.push(x.district_name)
                        temp_postcode.push(x.postcode)
                    }

                    commit("SET_TOWN_DATA", temp_town)
                    commit("SET_POSTCODE_DATA", temp_postcode)
                    

                }

            )
        },

        setCropData({commit}) {

            axios.get(`http://localhost:8082/crop`).then(

                result => {

                    let temp_crop = []
                    for(let crop of result.data) {
                        temp_crop.push(crop.c_name)
                    }

                    commit("SET_CROP_DATA", temp_crop)

                }

            )

        },

        setSeasonalityData({commit}) {

            axios.get(`http://localhost:8082/seasonality`).then(

                result => {

                    commit("SET_SEASONALITY_DATA", result.data)

                }

            )

        }

    }, 

    getters: {
        getCropData: (state) => {
            return state.crop
        },
        getSeasonalityData: (state) => {
            return state.seasonality
        },
        getDistictData: (state) => {
            return state.district
        },
        getTownData: (state) => {
            return state.town
        },
        getPostcodeData: (state) => {
            return state.postcode
        }

    }


})