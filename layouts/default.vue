<template>
  <v-app class="bg-app">
    <v-main>
      <v-container fluid>
        <v-row class="top-menu" >
          <v-col class="d-flex justify-center">
            <img src="~/assets/images/logo.svg" alt="Basebone Logo" />
          </v-col>
        </v-row>

        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        fixed: false,
        title: 'Vuetify.js'
      }
    }
  }

</script>

<style lang="scss" scoped>
 .bg-app {
    background-image: url('~assets/images/error-page-bg.jpg');
    background-attachment: fixed;
    background-color: #f5f5f5;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  .top-menu {
    background: linear-gradient(180deg, #6279fd, #9363fc);
  }
 }
</style>
