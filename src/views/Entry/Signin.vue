<template>
    <section class="login-top">
        <!-- CAPTION FOR BCKGRND IMAGE FOR SEO -->
        <!-- <span class="background-image" role="img" aria-label="Future Farmers - Merino Sheep - On farm sales"></span> -->
        <b-container>
            <div id="login">
                <b-row id="login-row" class="justify-content-center">
                    <b-col md="8" sm="auto" id="login-column">
                        <b-row class="justify-content-center">
                            <!-- LOGIN BOX -->
                            <b-col md="6" sm="auto" id="login-box">
                                <h2 class="pt-5 signin-label">Sign In</h2>
                                <b-alert
                                    variant="danger"
                                    class="m-4 text-center"
                                    v-show="!noLoginError"
                                    show
                                >
                                    {{ loginError }}</b-alert
                                >
                                <b-form id="login-form" class="form">
                                    <!-- LOGIN INPUTS -->
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

                                    <b-form-group
                                        label-for="loginPassword"
                                        class="password-label-c"
                                        :state="validPassword"
                                        :valid="false"
                                        invalid-feedback="Password must be at least 6 characters"
                                    >
                                        <div class="password-container">
                                            <label class="login-label"
                                                >Password
                                            </label>
                                            <router-link
                                                class="text-right cr-account"
                                                to="/jobseeker/forget-password"
                                                >Forget your
                                                password?</router-link
                                            >
                                        </div>
                                        <b-form-input
                                            type="password"
                                            name="loginPassword"
                                            id="loginPassword"
                                            v-model="loginPassword"
                                            trim
                                            :state="validPassword"
                                        />
                                    </b-form-group>
                                    <!-- LOGIN BUTTON (BUTTONS FOR SUBMISSION TO MOCK USERS) -->
                                    <b-form-group class="mb-4">
                                        <br />
                                        <b-button
                                            variant="primary"
                                            size="md"
                                            class="w-100 mt-3 mm-2 signin-btn"
                                            @click="login"
                                            >Sign in</b-button
                                        >
                                    </b-form-group>

                                    <!-- <b-form-group>
                                        <router-link to="/Signup"><p class="text-center" style="color: #4964e9"> Forgot password? </p></router-link>
                                    </b-form-group> -->
                                    <!-- REGISTRATION LINKS -->
                                    <div id="signup-list">
                                        <p>
                                            Don't have an account?
                                            <router-link
                                                class="text-right cr-account"
                                                to="/jobseeker/Signup"
                                                >Create an account</router-link
                                            >
                                        </p>
                                    </div>
                                </b-form>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </section>
</template>

<script>
import axios from "axios";
import { config } from "../../utils/constant";
import VueCookies from "vue-cookies";
// import { randomUUID } from "crypto";
const bcrypt = require("bcryptjs");

export default {
    name: "JobSeekerSignIn",

    data() {
        return {
            // Login input variables
            loginEmail: "",
            loginPassword: "",
            // Variable to store login error
            firstTimeLogin: true,
            loginError: "",
            noLoginError: true,
        };
    },

    created() {},

    computed: {
        // Computed boolean variable returning whether the 'loginEmail' input is a valid email address by testing a regular expression
        validLoginEmail() {
            if (!this.firstTimeLogin)
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.loginEmail))
                // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginEmail))
                    return null;
                return false;
        },

        // Computed boolean variable that returns whether the 'password' input is more than or equal to 5 chars
        validPassword() {
            if (!this.firstTimeLogin)
                if (this.loginPassword.length >= 6) 
                    return null;
                return false;
        },
    },

    methods: {
        // This method sends a request to the server, first building the necessary data object
        // containing login email and password. (Currently set to mock JobSeeker login - 'USER' type)
        login() {
            this.firstTimeLogin = false;

            if (this.validLoginEmail == null && this.validPassword == null) {
                // find if email exist
                axios
                    .get(
                        `http://localhost:8081/user/searchByEmail/${this.loginEmail}`
                    )
                    .then((result) => {
                        if (result.data.length == 0) {
                            this.noLoginError = false;
                            this.loginError = "Invalid Email or Password";
                        } else {
                            let userData = result.data[0];

                            let matchedPassword = bcrypt.compareSync(
                                this.loginPassword,
                                userData.user_password
                            );

                            if (!matchedPassword) {
                                this.noLoginError = false;
                                this.loginError = "Invalid Email or Password";
                            } else {
                                // generate cookie
                                // 1000-01-01 00:00:00 || yyyy-mm-dd hh:mm:ss
                                // token expires after an hour

                                let now = new Date();
                                let d = new Date(+now + 3600 * 1000);

                                let expiresAt =
                                    d.getFullYear() +
                                    "-" +
                                    ("0" + (d.getMonth() + 1)).slice(-2) +
                                    "-" +
                                    ("0" + d.getDate()).slice(-2) +
                                    " " +
                                    ("0" + d.getHours()).slice(-2) +
                                    ":" +
                                    ("0" + d.getMinutes()).slice(-2) +
                                    ":" +
                                    ("0" + d.getSeconds()).slice(-2);

                                const newSessionToken = crypto.randomUUID();

                                VueCookies.set(
                                    "mbh_session_token",
                                    newSessionToken,
                                    d
                                );

                                axios
                                    .post(
                                        `http://localhost:8081/sessionToken/createToken`,
                                        new URLSearchParams({
                                            session_token: newSessionToken,
                                            userName: this.loginEmail,
                                            expiresAt: expiresAt,
                                        }),
                                        config.headers
                                    )
                                    .then(
                                        // set data for apps

                                        this.$store
                                            .dispatch(
                                                "setUserData",
                                                this.loginEmail
                                            )
                                            .then(this.$router.push("/"))
                                    );
                            }
                        }
                    });
            }
        },
    },
};
</script>

<style lang="sass">
@import '../../assets/styles/custom-variables.sass'
.login-label
    font-size: 20px

.signin-label
    font-size: 46px

.password-container
    display: flex
    justify-content: space-between

.signin-btn
    color: white !important
    font-weight: bold
// .cr-account
</style>
