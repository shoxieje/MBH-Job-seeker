<template>
    <section class="signup-top">
        <div class="stepper-container mw-60">
            <h1 class="title-signup">Register your jobseeker account</h1>
            <v-stepper v-model="e1">
                <!-- HEADER -->
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                        Register your account
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">
                        Enter your details
                    </v-stepper-step>

                    <v-divider></v-divider>
                </v-stepper-header>

                <!-- CONTENT -->
                <v-stepper-items class="mw-60">
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="grey lighten-1">
                            <JobSeekerSignup1
                                ref="firstPage"
                                @registerEmail="getEmail"
                                @registerPassword="getPassword"
                        /></v-card>

                        <div class="stepper-btn-container">
                            <v-btn
                                class="stepper-btn-primary"
                                @click="firstRegister"
                            >
                                Register
                            </v-btn>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-12" color="grey lighten-1"
                            >
                            <JobSeekerSignup2
                                ref="secondPage"
                                @firstName="getFn"
                                @lastName="getLn"
                                @mobileNumber="getMobile"
                                @title="getTitle"
                                @state="getState"
                                @suburb="getSuburb"
                                @postcode="getPostcode"
                                @location="getLocation"
                        />
                    </v-card>

                        <div class="stepper-btn-container">
                            <v-btn
                                class="stepper-btn-primary"
                                @click="secondRegister"
                            >
                                Register
                            </v-btn>
                        </div>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>
        </div>
    </section>
</template>

<script>
import JobSeekerSignup1 from "../components/signup-component/Signup-1.vue";
import JobSeekerSignup2 from "../components/signup-component/Signup-2.vue";
import { config } from "../../utils/constant.js";
import axios from "axios";
import bcrypt from "bcryptjs";

export default {
    name: "JobSeekerSignup",
    components: {
        JobSeekerSignup1,
        JobSeekerSignup2,
    },
    data() {
        return {
            email: "",
            password: "",
            title: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            suburb: "",
            state: "",
            postcode: "",
            location: "",
            e1: 1,
        };
    },

    created() {},

    methods: {
        // ------------------ GET DATA FROM CHILD -----------------------------
        getState(value) {
            this.state = value;
        },
        getPostcode(value) {
            this.postcode = value;
        },
        getSuburb(value) {
            this.suburb = value;
        },
        getLocation(value) {
            this.location = value;
        },
        getEmail(value) {
            this.email = value;
        },
        getPassword(value) {
            this.password = value;
        },
        getFn(value) {
            this.firstName = value;
        },
        getLn(value) {
            this.lastName = value;
        },
        getMobile(value) {
            this.mobileNumber = value;
        },
        getTitle(value) {
            this.title = value;
        },

        // -----------------------------------------------------------------------------------------

        validEmail() {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                this.email
            );
        },

        // Computed boolean variable that returns whether the 'password' input is more than or equal to 5 chars
        validPassword() {
            if (this.password.length < 6) return false;
            return true;
        },

        firstRegister() {
            this.$refs.firstPage.emailOnBlur();
            this.$refs.firstPage.passwordOnBlur();

            if (this.validEmail() && this.validPassword()) {
                this.e1 = 2;
                // this.hashedPassword = bcrypt.hashSync(this.password, 10);
                // // find if email exist
                // axios
                //     .get(
                //         `http://localhost:8081/user/searchByEmail/${this.email}`
                //     )
                //     .then((result) => {
                //         if (result.data.length > 0) {
                //             this.$refs.firstPage.setSignUpError(
                //                 true,
                //                 "This email is already registered. Sign in or use a different email."
                //             );
                //         } else {
                //             this.$refs.firstPage.setSignUpError(false, "");
                //             this.e1 = 2;
                //         }
                //     });
            }
        },
        secondRegister() {
            this.$refs.secondPage.emitTitle();
            this.$refs.secondPage.emitFirstName();
            this.$refs.secondPage.emitLastName();
            this.$refs.secondPage.emitLocState();
            this.$refs.secondPage.emitLocPostcode();
            this.$refs.secondPage.emitLocSuburb();
            this.$refs.secondPage.emitPhoneNumber();

            if (
                !this.checkEmpty(this.title) &&
                !this.checkEmpty(this.firstName) &&
                !this.checkEmpty(this.lastName) &&
                !this.checkEmpty(this.mobileNumber) &&
                !this.checkEmpty(this.location)
            ) {
        //     axios
        //         .post(
        //             `http://localhost:8081/user`,
        //             new URLSearchParams({
        //                 userEmail: this.email,
        //                 userPassword: this.hashedPassword,
        //                 userType: "BUSINESS",
        //             }),
        //             config
        //         )
        //         .then(
        //             axios
        //                 .get(
        //                     `http://localhost:8081/user/searchByEmail/${this.email}`
        //                 )
        //                 .then((results) => {
        //                     console.log(results);
        //                 }),

        //             // second call
        //             axios.post(
        //                 `http://localhost:8081/businessUser`,
        //                 new URLSearchParams({
        //                     userEmail: this.email,
        //                     firstName: this.firstName,
        //                     lastName: this.lastName,
        //                     title: this.title,
        //                     address: this.address,
        //                     phoneNumber: this.mobileNumber,
        //                 }),
        //                 config.headers
        //             )
        //         )
        //         .then(
        //             axios
        //                 .get(
        //                     `http://localhost:8081/businessUser/searchByEmail/${this.userEmail}`
        //                 )
        //                 .then(
        //                     this.$store.dispatch("setUserData", this.email),
        //                     this.$store.dispatch("authUserLoggingIn", true),
        //                     this.$router.push("/")
        //                 )
        //         );
            }
        },

        checkEmpty(value) {
            return value.length === 0;
        },

    },
};
</script>

<style lang="sass">
@import '../../assets/styles/custom-variables.sass'
.mw-60
    max-width: 60rem
    margin-inline: auto

/* Stepper */
.stepper-container
    padding: 3rem

.stepper-btn-container
    text-align: right

.stepper-btn-primary
    background-color: $blue-mbh-0 !important
    color: white !important

.stepper-btn-secondary
    // color: $mbh-navy !important

/*Sign up*/
.container-signup
    text-align: left

.jobseeker-signup-box
    background-color: #f1f1f1
    border-radius: 10px
    padding: 3rem
    margin: 1rem 0

.title-signup
    // color: $mbh-navy
    padding-bottom: 1rem

.subtitle-signup
    color: $black-mbh-0
    font-size: 1.5rem
    padding-bottom: 1rem

.jobseeker-signup-btn
    color: white
    font-weight: bold
    font-size: 20px !important

.required-field::after
    content: "*"
    color: red
    margin-left: 2px

@media only screen and (max-width: $laptop-max)
    .v-stepper__step.v-stepper__step--inactive
        display: none !important
    .v-stepper__step.v-stepper__step--active
        width: 100%
        padding: 0
    .v-stepper__step.v-stepper__step--active div
        display: block !important
        font-weight: bolder
        color: $black-mbh-0 !important
    .v-stepper__step.v-stepper__step--complete
        display: none !important
    .stepper-btn-container
        flex-wrap: wrap
        padding: 0 0.5rem 1rem

@media only screen and (max-width: $mobile-max)
    .v-btn__content
        font-size: smaller !important
    .v-btn:not(.v-btn--round).v-size--default
        padding: 5px !important

@media only screen and (max-width: $tablet-max)
    .stepper-container
        padding: 3rem 0.5rem
    .v-stepper__content
        padding: 0.5rem
    .jobseeker-signup-box
        padding: 2rem 1rem
    .title-signup
        font-size: x-large
    .subtitle-signup
        font-size: large
        margin-left: -0.5rem !important
    label
        font-size: medium
    .col-sm-3
        padding: 3px !important
    .col-sm-9
        padding: 3px !important
    .col div
        padding: 3px !important

@media only screen and (max-width: 576px)
    .v-picker__body.v-picker__body--no-title.theme--dark
        width: unset !important
</style>
