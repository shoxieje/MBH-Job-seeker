<template>
    <section class="signup-top">
        <b-container class="container-signup">
            <b-form id="jobseeker-signup-form" class="">
                <!-- <h2 class="title-signup">
                    Enter your email and password
                </h2> -->
                <div class="jobseeker-signup-box">
                    <div>
                        <b-alert
                            variant="danger"
                            class="m-4 text-center"
                            v-show="signupError"
                            show
                        >
                            {{ signupErrorMsg }}
                        </b-alert>

                        <!-- EMAIL AND PASSWORD INPUTS -- v2 -->

                        <b-col class="">
                            <b-col class="pb-0">
                                <label for="email" class="required-field"
                                    >Email
                                </label>
                            </b-col>

                            <b-col class="py-0">
                                <b-form-input
                                    id="email"
                                    type="text"
                                    @blur="emailOnBlur"
                                    @input="emitEmail"
                                    aria-describedby="input-wrong-email"
                                    :state="checkedEmail"
                                    v-model="email"
                                ></b-form-input>

                                <b-form-invalid-feedback id="input-wrong-email">
                                    {{ errEmail }}
                                </b-form-invalid-feedback>
                            </b-col>
                        </b-col>

                        <b-col class="">
                            <b-col class="pb-0">
                                <label for="password" class="required-field"
                                    >Password
                                </label>
                            </b-col>

                            <b-col class="py-0">
                                <b-form-input
                                    id="password"
                                    type="password"
                                    @blur="passwordOnBlur"
                                    @input="emitPassword"
                                    aria-describedby="input-wrong-password"
                                    :state="checkedPassword"
                                    v-model="password"
                                ></b-form-input>

                                <!-- rpw = required password -->
                                <b-form-invalid-feedback
                                    id="input-wrong-password"
                                >
                                    {{ errPassword }}
                                </b-form-invalid-feedback>
                            </b-col>
                        </b-col>
                    </div>
                </div>
            </b-form>
        </b-container>
    </section>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            email: "",
            password: "",
            firstTimeLogin: true,
            firstOnBlurEmail: false,
            firstOnBlurPassword: false,
            checkedEmail: null,
            checkedPassword: null,
            errEmail: "",
            errPassword: "",
            signupError: false,
            signupErrorMsg: "",
        };
    },

    computed: {
        // Computed boolean variable returning whether the 'loginEmail' input is a valid email address by testing a regular expression
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
    },
    methods: {
        setSignUpError(err, msg) {
            if (err) {
                this.signupError = true;
                this.signupErrorMsg = msg;
            } else {
                this.signupError = false;
                this.signupErrorMsg = msg;
            }
        },

        emailOnBlur() {
            this.firstOnBlurEmail = true;
            this.emitEmail();
        },

        emitEmail() {
            if (this.firstOnBlurEmail) {
                if (this.email.length === 0) {
                    this.checkedEmail = false;
                    this.errEmail = "Required field";
                } else if (!this.validEmail) {
                    this.checkedEmail = false;
                    this.errEmail = "Invalid email address";
                } else {
                    this.checkedEmail = null;
                    this.$emit("registerEmail", this.email);
                }
            }
        },

        passwordOnBlur() {
            this.firstOnBlurPassword = true;
            this.emitPassword();
        },

        emitPassword() {
            if (this.firstOnBlurPassword) {
                if (this.password.length === 0) {
                    this.checkedPassword = false;
                    this.errPassword = "Required field";
                } else if (!this.validPassword) {
                    this.checkedPassword = false;
                    this.errPassword = "6 characters or more";
                } else {
                    this.checkedPassword = null;
                }

                this.$emit("registerPassword", this.password);
            }
        },
    },
};
</script>

<style></style>
