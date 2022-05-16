<template>
<div v-if="errors.state" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Ha ocurrido un error! </strong>
  <span v-for="message in errors.message" :key="message" class="block sm:inline" v-text="message"></span>
  <span @click="closeAlert()" class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-gray-200 p-6 rounded border-gray-300">
    <div class="flex flex-wrap">
      <div class="justify-items-center mx-2">
        <svg class="fill-current h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z"/></svg>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Editar Perfil</h2>
    </div>
    <form @submit.prevent="update()" class="mt-8 space-y-6" action="#" method="POST">
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
          <label for="password" class="sr-only">New Password</label>
          <input v-model="user.password" type="password" autocomplete="current-password" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password">
        </div>
        <div class="my-4">
          <label for="password" class="sr-only">Confirm New Password</label>
          <input v-model="user.password_confirmation" type="password" autocomplete="current-password" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password">
        </div>
      </div>
      <div class="flex flex-wrap justify-center">
        <button type="submit" class="group relative mx-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Editar
        </button>
        <button @click="this.$parent.editProfile = false" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Cancelar
        </button>
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
                id:0,
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                access_token: auth.getData().access_token
            },
            errors: {
              state: false,
              message:[]
            }
        }
    },
    mounted(){
        this.showUser()
    },
    methods:{
        closeAlert(){
          this.errors.state = false;
          this.errors.message = [];
        },
        async showUser(){
            this.axios.post('http://127.0.0.1:8000/api/edit','',{
                headers:{
                    Authorization: 'Bearer '+ auth.getData().access_token
                }
            }).then(response=>{
                    this.user.id = response.data.id
                    this.user.name = response.data.name
                    this.user.email = response.data.email
                }).catch(error=>{
                    console.log(error)
                })
        },
        async update(){
            await this.axios.post(`http://127.0.0.1:8000/api/update/${this.user.id}`,this.user,{
                headers:{
                    Authorization: 'Bearer '+ auth.getData().access_token
                }
            })
            .then(response=>{
                console.log(response)
                auth.logout()
                auth.login(this.user)
                this.$parent.showForm('')
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