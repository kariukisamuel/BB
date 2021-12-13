<template>
  <v-row class="error-page-bg" align="center">
    <v-col class="text-center" v-if="error.statusCode === 404">
      <h1>
        {{error.statusCode }}
      </h1>
      <p>{{pageNotFound}}</p>
      <NuxtLink to="/users">
        <v-btn class="ma-2" outlined color="primary">
          Go To Users
        </v-btn>
      </NuxtLink>
    </v-col>
    <v-col cols="3" v-else>
      <h1>
        {{ otherError }}
      </h1>
    </v-col>
  </v-row>


</template>

<script>
  export default {
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageNotFound: 'This Page Wasnt Found',
        otherError: 'An error occurred'
      }
    },

  }

</script>
<style lang="scss" scoped>
  .error-page-bg {
    h1 {
      font-size: 15vw;
      font-weight: 900;
      line-height: 1;
    }
    a{
      text-decoration: none;
    }
  }

</style>
