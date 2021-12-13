<template>
  <div>
    <v-row class="user-page">
      <v-card elevation="2" class="d-flex flex-wrap justify-space-between align-center  w-100 pa-5">
        <div>
          <h1 class="page-title"> Users</h1>
          <p v-if="users">{{users.length}} Users</p>
        </div>
        <div>
          <nuxt-link to="/users/add-users">
            <v-btn color="primary" dark large>
              Add User
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </nuxt-link>
        </div>

      </v-card>
      <v-card elevation="2" class="mt-10 w-100  pa-5">
        <v-card-title>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-alert border="left" color="primary" dark dismissible type="success" v-if="apiResponse == 'success'">
          >
          The User Has Been Deleted successfully
        </v-alert>
        <v-data-table v-model="selected" :headers="headers" :items="users" :single-select="singleSelect"
          :search="search" item-key="id" show-select class="elevation-1 w-100 " v-if="users">
          <template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
          </template>
          <template v-slot:item.avatar="{ item }">
            <v-img :lazy-src="item.avatar" max-height="50" max-width="50" :src="item.avatar"
              class="pa-3 rounded-circle"></v-img>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>

        <v-data-table v-else class="elevation-1" loading loading-text="Loading... Please wait">
        </v-data-table>

      </v-card>
    </v-row>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: '',
        singleSelect: false,
        selected: [],
        headers: [{
            text: 'Id',
            value: 'id',
          },
          {
            text: 'Avatar',
            value: 'avatar'
          },
          {
            text: 'First Name',
            value: 'first_name'
          },
          {
            text: 'Last Name',
            value: 'last_name'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false
          },

        ],
        users: '',
        apiResponse: ''
      }
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        let user = await this.$axios.get('/get-users')
        this.users = user.data.response.attributes
      },
      async deleteItem(item) {
        let user = await this.$axios.post('/delete-users', {
          id: item.id,
        })
        this.apiResponse = user.data.response.status
        this.fetchUsers()
      },
      // async massDelete() {
      //   let deleteIds = []
      //   this.selected.map((item) => {
      //     deleteIds.push(item.id)
      //   })
      //   await this.$axios.post('/delete-users', {
      //     id: deleteIds,
      //   })
      //   this.fetchUsers()

      // }
    }
  }

</script>
<style lang="scss" scss scoped>
  .user-page {
    .page-title {
      font-size: 3.5em;
      font-weight: 700;
      line-height: 1;
    }

    .bg-light {
      background-color: #fff
    }

    a {
      text-decoration: none;
    }
  }

</style>
