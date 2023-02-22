<template>
    <section class="forget-top">
        <b-container class="forget-container">
            <b-row id="forget-row" class="justify-content-center">
                <b-col md="8" sm="auto" id="forget-column">
                    <b-row class="justify-content-center">
                        <div id="forget-form" v-if="firstPage">
                            <h3 class="forget-subtitle">
                                Forget your password?
                            </h3>
                            <div class="text-primary">
                                <p class="forget-text text-primary">
                                    Enter the email linked to your account and
                                    we'll send you instructions to reset your
                                    password.
                                </p>
                                <b-form id="forget-form" class="form">
                                    <!-- LOGIN INPUTS -->
                                    <b-alert
                                        variant="danger"
                                        class="m-4 text-center forget-text"
                                        v-show="!noLoginError"
                                        show
                                    >
                                        {{ loginError }}</b-alert
                                    >
                                    <b-form-group
                                        label="Email"
                                        label-for="loginEmail"
                                        class="login-label mt-4"
                                        :state="validLoginEmail"
                                        invalid-feedback="Invalid email address, use format example@domain.com"
                                    >
                                        <b-form-input
                                            type="text"
                                            name="loginEmail"
                                            id="loginEmail"
                                            v-model="loginEmail"
                                            trim
                                            :state="validLoginEmail"
                                        />
                                    </b-form-group>
                                    <b-form-group class="mb-4">
                                        <b-button
                                            variant="primary text-white"
                                            size="md"
                                            class="w-100 mt-3 mm-2 signin-btn"
                                            @click="reset"
                                            >Reset</b-button
                                        >
                                    </b-form-group>
                                    <p class="forget-text text-dark">
                                        Don't have an account?
                                        <router-link
                                            class="text-right cr-account"
                                            to="/business/sign-up"
                                            >Register</router-link
                                        >
                                    </p>
                                </b-form>
                            </div>
                        </div>
                        <div id="forget-form2" v-if="secondPage">
                            <h3 class="forget-subtitle">
                                Password reset sent!
                            </h3>
                            <div
                                class="text-primary"
                                style="text-align: justify"
                            >
                                <p>
                                    <br />
                                    We have sent you an email with instructions
                                    to <strong>{{ loginEmail }} </strong> on how
                                    to reset your password.
                                    <br />
                                    <br />
                                    If you have not received an email, please
                                    check your spam folder and make sure the
                                    email you entered is correct.
                                    <br />
                                </p>
                            </div>
                            <strong>
                                <router-link
                                    class="cr-account text-secondary"
                                    style="text-align: center"
                                    :to="{ name: 'Landing' }"
                                    >Back</router-link
                                ></strong
                            >
                        </div>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {
        name: "ForgetPassword",

        computed: {
            // Computed boolean variable returning whether the 'loginEmail' input is a valid email address by testing a regular expression
            validLoginEmail() {
                if (!this.firstTimeLogin) {
                    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.loginEmail))  {
                        return null;
                    }
                    else {
                        return false;
                    }
                }
                return null;
            },
        },
        data() {
            return {
                firstPage: true,
                secondPage: false,
                loginEmail: "",
                firstTimeLogin: true,
                loginError: "",
                noLoginError: true,
            };
        },

        methods: {
            reset() {
                //Validate the email
                this.firstTimeLogin = false;
                console.log('test')


                if (this.validLoginEmail == null) {
                    this.firstPage = false;
                    this.secondPage = true;
                }
            },
        },

        created() {

        },
    };
</script>

<style lang="sass">
    @import '../../assets/styles/custom-variables.sass'
    .forget-top
        background: $mbh-white
        padding: 70px 0
    .forget-container
        background: $mbh-white-2
        padding: 5rem 20%
    .forget-subtitle
        color: $mbh-navy
    .forget-text
        text-align: left
    .cr-account
        color: $blue-mbh-0

    @media only screen and (max-width: $tablet-max)
        .forget-subtitle
            font-size: x-large
        .forget-text
            font-size: small
    @media only screen and (max-width: $mobile-max)
        .forget-subtitle
            font-size: large
        .forget-text
            font-size: small
</style>