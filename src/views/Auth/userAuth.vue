<template>
  <div class="fst">
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog title="Authenticating" :show="isLoading" fixed>
      <p>Authenticating...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <section>
      <p>Welcome To Our Website</p>
      <h1>{{ submitButtonAction }}</h1>
      <form @submit.prevent="submitForm">
        <div class="form-controls" :class="{invalid : !email.isValid}">
          <label for="email">Email:</label>
          <input
            type="email"
            placeholder="test@test.com"
            id="email"
            v-model.trim="email.val"
            @blur="clearValidity('email')"
          />
          <span v-if="!email.isValid">Email must contain @ and .</span>
        </div>
        <div class="form-controls" :class="{invalid : !password.isValid}">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model.trim="password.val"
            @blur="clearValidity('password')"
          />
          <span v-if="!password.isValid">Password must be at least 6 characters</span>
        </div>
        <base-button
        ><span>{{ submitButtonAction }}</span>
      </base-button>
    </form>
      <p>
        Already have an account?
        <base-button type="button" link @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      mode: 'login',
      isLoading: false,
      error: null,
      formIsValid:true
    };
  },
  computed: {
    submitButtonAction() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'SignUp';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup';
      } else {
        return 'Login';
      }
    },
  },
  methods: {
    clearValidity(input){
      this[input].isValid = true
    },
    validateForm(){
      this.formIsValid=true;
      if(this.email.val === '' || !this.email.val.includes('@') || !this.email.val.includes('.')){
        this.email.isValid=false;
        this.formIsValid=false
      }
      if(this.password.val === '' || this.password.val.length<6){
        this.password.isValid = false;
        this.formIsValid= false
      }
    },
    async submitForm() {
      
      this.validateForm();
      if(!this.formIsValid){
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
      };
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        this.$router.replace('/products');
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later';
      }
      this.isLoading = false;
      
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError(){
      this.error=null;
    }
  },
};
</script>

<style scoped>
.fst {
  height: 80vh;
  padding: 2rem;
  overflow-x: hidden;
}
section {
  background-color: white;
  max-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
h1 {
  margin: 0 2rem;
  font-size: 46px;
  font-weight: black;
}
form {
  margin: 1rem;
  padding: 1rem;
}
.form-controls {
  margin: 0.5rem 0;
  background-color: white;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
input:focus {
  border-color: bisque;
  background-color: #e0f7b4;
  outline: none;
}
@media (max-width:450px){
  section{
    padding: .5rem;
  }
  form{
    margin: 0;
    padding: 1rem;
  }
  input{
    width :90%
  }
  h1{
    margin: 0 1rem;
  }
  section > p:first-child{
    margin: 0 1rem;
    margin-top: 1rem;
  }
}
.errors {
  color: red;
}
.invalid {
  color: red;
}
.invalid > input{
  border-color: rgb(214, 117, 117);
}
p {
  margin: 1rem 2rem;
}
</style>

