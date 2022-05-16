<template>
<div v-if="errors.state" class="flex flex-wrap items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Ha ocurrido un error! </strong>
  <span v-for="message in errors.message" :key="message" class="block sm:inline" v-text="message"></span>
  <span @click="closeAlert()" class="top-0 bottom-0 right-0 px-4 py-3 mx-2">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-gray-200 p-6 rounded border-gray-300">
    <div class="flex flex-wrap">
      <div class="justify-items-center mx-4">
        <svg class="fill-current h-20 w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"/></svg>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresa tus datos!</h2>
    </div>
    <form @submit.prevent="register()" class="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm ">
        <div class="my-4">
          <label for="name" class="sr-only">Name</label>
          <input v-model="user.name" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name">
        </div>
        <div class="my-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model="user.email" type="email" autocomplete="email" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div class="my-4">
          <label for="password" class="sr-only">Password</label>
          <input v-model="user.password" type="password" autocomplete="current-password" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
        <div class="my-4">
          <label for="password" class="sr-only">Confirm Password</label>
          <input v-model="user.password_confirmation" type="password" autocomplete="current-password" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password">
        </div>
      </div>
      <div class="flex flex-wrap justify-center">
        <button type="submit" class="group relative mx-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Registrarse
        </button>
        <a @click="this.$parent.register = false" class="mx-2 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Cancelar
        </a>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import {auth} from '../Helpers/session.js'
export default {
    data: function(){
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                access_token: ''
            },
            errors: {
              state: false,
              message:[]
            }
        }
    },
    created(){
        console.log(this.$parent)
    }, 
    methods:{
        closeAlert(){
          this.errors.state = false;
          this.errors.message = [];
        },
        register(){
          this.axios.post('http://127.0.0.1:8000/api/register',this.user)
          .then(response=>{
            console.log(response)
            this.user.access_token = response.data.access_token
            auth.login(this.user)
            this.$parent.showForm('')
            return
          }).catch(error=>{
              this.errors.state = true;
              var errors = error.response.data.errors
              for (var [key, value] of Object.entries(errors)) {
                  console.log(key);
                  this.errors.message.push(value[0]);
              }
          });
        }
    }
}
</script>