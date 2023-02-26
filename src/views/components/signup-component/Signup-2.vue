<template>
    <section class="signup-top">
        <b-container class="container-signup">
            <!-- <h2 class="title-signup">
                Enter your details
            </h2> -->
            <!-- YOUR DETAILS -->
            <div class="jobseeker-signup-box">
                <h3 class="subtitle-signup">Personal Details</h3>
                <b-form id="jobseeker-signup-form1" class="">
                    <!-- INPUTS -->
                    <b-row class="my-1">
                        <b-col sm="12">
                            <label for="title" class="required-field"
                                >Title</label
                            >
                            <multiselect
                                style="border: 1px solid #ced4da"
                                placeholder="Select a title"
                                v-model="title"
                                :options="options"
                                :show-labels="false"
                                :searchable="false"
                                @input="emitTitle"
                            >
                            </multiselect>

                            <!-- rt = required title -->
                            <div id="rt" style="color: red; display: none">
                                Title is required
                            </div>
                        </b-col>
                    </b-row>

                    <b-row class="my-1">
                        <b-col sm="12">
                            <label for="firstName" class="required-field"
                                >First Name
                            </label>
                            <b-form-input
                                id="firstName"
                                type="text"
                                @blur="emitFirstName"
                                @input="emitFirstName"
                                aria-describedby="input-wrong-first-name"
                                v-model="firstName"
                                :state="checkedFirstName"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-wrong-first-name"
                            >
                                {{ errFirstName }}
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>

                    <b-row class="my-1">
                        <b-col sm="12">
                            <label for="lastName" class="required-field"
                                >Last Name
                            </label>
                            <b-form-input
                                id="lastName"
                                type="text"
                                @blur="emitLastName"
                                @input="emitLastName"
                                v-model="lastName"
                                aria-describedby="input-wrong-last-name"
                                :state="checkedLastName"
                            ></b-form-input>

                            <b-form-invalid-feedback id="input-wrong-last-name">
                                {{ errLastName }}
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>

                    
                    <b-row class="my-1">
                        <b-col sm="12">
                            <label for="phoneNumber" class="required-field"
                                >Phone Number
                            </label>
                            <VuePhoneNumberInput
                                @phone-number-blur="emitPhoneNumber"
                                @input="emitPhoneNumber"
                                default-country-code="AU"
                                valid-color="#4b8a54"
                                v-model="phoneNumber"
                                id="phoneNumber"
                            />
                            <!-- rphone = required phone -->
                            <b-form-invalid-feedback id="rphone" style="display: none">
                                Valid phone number is required
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>

                    <!-- Location -->
                    <b-row class="my-1">
                        <b-col sm="4">
                            <label for="location" class="required-field"
                                >State
                            </label>
                            <b-form-input
                                id="locState"
                                type="text"
                                @blur="emitLocState"
                                @input="emitLocState"
                                aria-describedby="rloc-state"
                                v-model="locState"
                                :state="checkedLocState"
                            ></b-form-input>

                            <b-form-invalid-feedback id="rloc-state">
                                {{ errLocState }}
                            </b-form-invalid-feedback>
                        </b-col>
                        <b-col sm="4">
                            <label for="location" class="required-field"
                                >Town / Suburb
                            </label>

                            <b-form-input
                                id="locSuburb"
                                type="text"
                                @blur="emitLocSuburb"
                                @input="emitLocSuburb"
                                aria-describedby="rloc-suburb"
                                v-model="locSuburb"
                                :state="checkedLocSuburb"
                            ></b-form-input>

                            <b-form-invalid-feedback id="rloc-suburb">
                                {{ errLocSuburb }}
                            </b-form-invalid-feedback>
                        </b-col>
                        <b-col sm="4">
                            <label for="location" class="required-field"
                                >Postcode
                            </label>

                            <b-form-input
                                id="locPostcode"
                                type="text"
                                @blur="emitLocPostcode"
                                @input="emitLocPostcode"
                                aria-describedby="rloc-postcode"
                                v-model="locPostcode"
                                :state="checkedLocPostcode"
                            ></b-form-input>

                            <b-form-invalid-feedback id="rloc-postcode">
                                {{ errLocPostcode }}
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>

                </b-form>
            </div>

        </b-container>
    </section>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import Multiselect from "vue-multiselect";
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { config } from "../../../utils/constant";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
    data() {
        return {
            title: null,
            options: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Others"],
            firstName: "",
            lastName: "",
            phoneNumber: "",
            
            locState: "",
            locSuburb: "",
            locPostcode: "",
            location: "",
            
            errFirstName: "",
            errLastName: "",
            errLocState: "",
            errLocSuburb: "",
            errLocPostcode: "",

            checkedFirstName: null,
            checkedLastName: null,
            checkedLocState: null,
            checkedLocSuburb: null,
            checkedLocPostcode: null,
        };
    },

    components: {
        VuePhoneNumberInput,
        Multiselect,
    },
    methods: {
        // ----- first name validation -----------
        emitFirstName() {
            if (this.firstName.length === 0) {
                this.checkedFirstName = false;
                this.errFirstName = "First Name is required";
            } else if (this.firstName.length === 1) {
                this.checkedFirstName = false;
                this.errFirstName = "Must be between 2 and 50 characters";
            } else {
                this.checkedFirstName = null;
                this.$emit("firstName", this.firstName);
            }
        },

        // ----- last name validation -----------

        emitLastName() {
            if (this.lastName.length === 0) {
                this.checkedLastName = false;
                this.errLastName = "Last Name is required";
            } else if (this.lastName.length === 1) {
                this.checkedLastName = false;
                this.errLastName = "Must be between 2 and 50 characters";
            } else {
                this.checkedLastName = null;
                this.$emit("lastName", this.lastName);
            }
        },

        // ----- phone number validation -----------
        //https://ilikekillnerds.com/2014/08/regular-expression-for-validating-australian-phone-numbers-including-landline-and-mobile/
        validPhoneNumber() {
            // eslint-disable-next-line
            return /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/.test(this.phoneNumber);
        },

        emitPhoneNumber() {
            if (this.validPhoneNumber()) {
                this.styleToNormal("rphone", "phoneNumber");
                this.$emit("mobileNumber", this.phoneNumber);
            }
            else {
                this.styleToRequiredField("rphone", "phoneNumber");
            }
        },

        emitTitle() {
            if (this.title === null) {
                document.getElementsByClassName("multiselect")[0].style.border =
                    "1px solid red";
                document.getElementById("rt").style.display = "block";
            } else {
                document.getElementsByClassName("multiselect")[0].style.border =
                    "1px solid #ced4da";
                document.getElementById("rt").style.display = "none";
                this.$emit("title", this.title);
            }
        },

        
        // ----- location validation -----------

        emitLocState() {
            if (this.checkEmpty(this.locState)) {
                this.checkedLocState = false;
                this.errLocState = "State is required";
            } else {
                this.checkedLocState = null;
                this.$emit("state", this.locState);
                this.emitLocation();
            }
        },

        emitLocPostcode() {
            if (this.checkEmpty(this.locPostcode)) {
                this.checkedLocPostcode = false;
                this.errLocPostcode = "Postcode is required";
            } else {
                this.checkedLocPostcode = null;
                this.$emit("postcode", this.locPostcode);
                this.emitLocation();
            }
        },

        emitLocSuburb() {
            if (this.checkEmpty(this.locSuburb)) {
                this.checkedLocSuburb = false;
                this.errLocSuburb = "Suburb is required";
            } else {
                this.checkedLocSuburb = null;
                this.$emit("suburb", this.locSuburb);
                this.emitLocation();
            }
        },

        emitLocation() {
            if (
                !this.checkEmpty(this.locSuburb) &&
                !this.checkEmpty(this.locState) &&
                !this.checkEmpty(this.locPostcode)
            ) {
                this.$emit(
                    "location",
                    this.locSuburb +
                        " " +
                        this.locState +
                        " " +
                        this.locPostcode
                );
            }
        },

        styleToRequiredField(rid, sid) {
            document.getElementById(rid).style.display = "block";
            document.getElementById(sid).style.border = "1px solid red";
        },

        styleToNormal(rid, sid) {
            document.getElementById(rid).style.display = "none";
            document.getElementById(sid).style.border = "1px solid #ced4da";
        },

        checkEmpty(value) {
            return value.length === 0;
        },
    },
};
</script>

<style></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
