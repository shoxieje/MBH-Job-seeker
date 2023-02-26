<template>
    <section class="reset-top">
        <b-container class="reset-container">
            <b-row id="reset-row" class="justify-content-center">
                <b-col md="8" sm="auto" id="reset-column">
                    <b-row class="justify-content-center">
                        <div id="reset-form" v-if="firstPage">
                            <h3 class="reset-subtitle">Reset your password</h3>
                            <br />
                            <div class="text-primary">
                                <b-form id="reset-form" class="form">
                                    <p class="reset-text text-primary">
                                        Enter your new password.
                                        <b-form-input
                                            type="password"
                                            name="password-1"
                                            id="password-1"
                                            v-model="password1"
                                            trim
                                            :state="validPassword"
                                            aria-describedby="err-password1"
                                            invalid-feedback="Password must be at least 6 characters"
                                        />
                                        <b-form-invalid-feedback
                                            id="err-password1"
                                        >
                                            Password must be at least 6
                                            characters
                                        </b-form-invalid-feedback>
                                    </p>
                                    <p class="reset-text text-primary">
                                        Re-enter your new password.
                                        <b-form-input
                                            type="password"
                                            name="password-2"
                                            id="password-2"
                                            v-model="password2"
                                            trim
                                            :state="validPassword2"
                                            aria-describedby="err-password2"
                                        />
                                        <b-form-invalid-feedback
                                            id="err-password2"
                                        >
                                            Both passwords must match
                                        </b-form-invalid-feedback>
                                    </p>
                                    <b-form-group class="mb-4">
                                        <b-button
                                            variant="primary text-white"
                                            size="md"
                                            class="w-100 mt-3 mm-2 signin-btn"
                                            @click="setNewPassword"
                                            >Set new password</b-button
                                        >
                                    </b-form-group>
                                </b-form>
                            </div>
                        </div>
                        <div id="reset-form2" v-if="secondPage">
                            <h3 class="reset-subtitle">
                                Your password has been updated!
                            </h3>
                            <div
                                class="text-primary"
                                style="text-align: justify"
                            >
                                <p>
                                    <br />
                                    You can sign in using your new password.
                                    <br />
                                </p>
                            </div>
                            <b-button
                                class="nav-btn text-white signin-btn"
                                variant="primary"
                                to="/jobseeker/signin"
                                >Sign in</b-button
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
        name: "JobSeekerResetPassword",
        props: ["", ""],
        components: {},
        computed: {
            // Computed boolean variable that returns whether the 'password' input is more than or equal to 5 chars
            validPassword() {
                //if this is first time login

                if (!this.firstTimeLogin) {
                    if (this.password1.length >= 6) {
                        return null;
                    }
                    return false;
                }
                return null;
            }, // Computed boolean variable that returns whether the 'password' input is more than or equal to 5 chars
            validPassword2() {
                if (!this.firstTimeLogin) {
                    if (this.password1.length == 0) 
                        return false;
                    if (this.password1 == this.password2) 
                        return null;
                    return false;
                }
                return null;
            },
        },
        data() {
            return {
                firstTimeLogin: true,
                firstPage: true,
                secondPage: false,
                password1: "",
                password2: "",
            };
        },
        methods: {
            setNewPassword() {
                this.firstTimeLogin = false;
                //Check if both password valid

                if (this.validPassword == null && this.validPassword2 == null) {
                    this.firstPage = false;
                    this.secondPage = true;
                }
            },
        },
        created() {
            const notUserLoggingIn = async () => {
                console.log();
                this.$store.dispatch("authUserLoggingIn", false);
            };

            notUserLoggingIn();
        },
    };
</script>

<style lang="sass">
    @import '../../assets/styles/custom-variables.sass'
    .reset-top
        background: $mbh-white
        padding: 70px 0
    .reset-container
        background: $mbh-white-2
        padding: 5rem 20%
    .reset-subtitle
        color: $mbh-navy
    .reset-text
        text-align: left
    .cr-account
        color: $blue-mbh-0
    .signin-btn
        font-size: medium !important

    @media only screen and (max-width: $tablet-max)
        .reset-subtitle
            font-size: x-large
        .reset-text
            font-size: small
    @media only screen and (max-width: $mobile-max)
        .reset-subtitle
            font-size: large
</style>