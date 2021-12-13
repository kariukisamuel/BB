<template>
  <div>
    <v-row class="add-users-page">
      <v-card elevation="2" class="w-100 pa-10 mt-10">
        <div class="d-flex justify-center">
          <v-card elevation="2" class="w-50 pa-10">
            <h1 class="text-center my-5">Add User</h1>
            <v-alert
                border="left"
                color="primary"
                dark
                dismissible
                type="success"
                v-if="apiResponse == 'success'">
            >
                The User Has Been Added successfully
            </v-alert>

            <!-- would have used the code base below if i was uploading an image to the server not a link-->
            <!-- <v-file-input 
              label="Upload Avatar" 
              filled 
              prepend-icon="mdi-camera" 
              :rules="imageRules"
              accept="image/png, image/jpeg, image/bmp" 
              required
              v-model="avatar"
             :error-messages="avatarErrors"
              show-size
              ref="avatar">
            </v-file-input> -->
            <v-text-field v-model="avatar"
                :error-messages="avatarErrors" 
                label="Avatar" 
                required
                @input="$v.avatar.$touch()" 
                @blur="$v.avatar.$touch()">
            </v-text-field>
            <v-text-field v-model="fname"
                :error-messages="fNameErrors" 
                :counter="10" 
                label="First Name" 
                required
                @input="$v.fname.$touch()" 
                @blur="$v.fname.$touch()">
            </v-text-field>
            <v-text-field 
                v-model="lname" 
                :error-messages="lNameErrors" 
                :counter="10" 
                label="Last Name" 
                required
                @input="$v.lname.$touch()" 
                @blur="$v.lname.$touch()">
            </v-text-field>
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            >
            </v-text-field>
            <v-btn class="mt-4" @click="submit" block color="primary">
                    submit
            </v-btn>

          </v-card>
        </div>
      </v-card>


    </v-row>
  </div>
</template>
<script>
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength,
    email
  } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        avatar:'',
        fname: '',
        lname: '',
        email: '',
        apiResponse: '',
      }
    },
    validations: {
      avatar: {
        required,
      },  
      fname: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3)
      },
      lname: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
    },
    computed: {
      avatarErrors() {
        const errors = []
        if (!this.$v.avatar.$dirty)
          return errors
      },
      fNameErrors() {
        const errors = []
        if (!this.$v.fname.$dirty)
          return errors
          !this.$v.fname.maxLength && errors.push('First Name must be at most 10 characters long') 
          !this.$v.fname.minLength && errors.push('First Name must be at least 3 characters long') 
          !this.$v.fname.required && errors.push('First Name is required.')
        return errors
      },
      lNameErrors() {
        const errors = []
        if (!this.$v.lname.$dirty)
          return errors
          !this.$v.lname.maxLength && errors.push('Last Name must be at most 10 characters long') 
          !this.$v.lname.minLength && errors.push('First Name must be at least 3 characters long') 
          !this.$v.lname.required && errors.push('Last Name is required.')
        return errors
      },
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty)
          return errors
        !this.$v.email.email && errors.push('Must be valid e-mail') 
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
        validateImage(file){
           console.log(file)
        },
        async submit() {
            this.$v.$touch()
            if (!this.$v.$invalid){
                //would have used this if i was to upload image to server
                //var formData = new FormData();
                // formData.append('avatar', this.avatar)
                // formData.append('first_name', this.fname)
                // formData.append('last_name', this.lname)
                // formData.append('email', this.email)
 
                
               let user = await this.$axios.post('/add-user',{
                     avatar: this.avatar,
                     first_name: this.fnamoe,
                     last_name: this.lname,
                     email: this.email
                 })
              
              this.apiResponse = user.data.response.status
      

                //      console.log(formData.get('avatar'))
                // let user = await this.$axios.post('/add-user', formData, {headers: {'Content-Type': 'multipart/form-data'} })
            
           }
        }
    }
  }

</script>
<style lang="scss" scoped>
  .add-users-page {


    .bg-light {
      background-color: #fff
    }
  }

</style>
