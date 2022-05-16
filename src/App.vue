<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
    <div v-if="!(login||register||editProfile||play)">
      <p v-if="showButtons" class="text-2xl font-bold my-6">Bienvenido! Qué quieres hacer?</p>
      <p v-if="!showButtons" class="text-2xl font-bold my-6">Hola! Inicia sesión o registrate</p>
      <button v-if="!showButtons" @click="showForm('login')" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
        Iniciar Sesión
      </button>
      <button v-if="!showButtons" @click="showForm('register')" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
        Registrarse
      </button>
      <button v-if="showButtons" @click="showForm('play')" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
        Jugar
      </button>
      <button v-if="showButtons" @click="showForm('edit')" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
        Editar Perfil
      </button>
      <button v-if="showButtons" @click="logout()" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
        Cerrar Sesión
      </button>
    </div>
    <div>
      <login-form v-if="login"/>
      <register-form v-if="register"></register-form>
      <edit-form v-if="editProfile"></edit-form>
      <play-game v-if="play"></play-game>
    </div>

  </div>

</template>

<script>
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'
import {auth} from './Helpers/session.js'
import EditForm from './components/EditForm.vue'
import PlayGame from './components/PlayGame.vue'

export default {
  name: 'App',
  components: {
    RegisterForm,
    LoginForm,
    EditForm,
    PlayGame
  },
  data: function(){
    return {
      user: {
              email: '',
              password: '',
              access_token: ''
            },
      login: false,
      register: false,
      editProfile: false,
      play: false,
      showButtons: false, //es true cuando hay una sesión activa y false cuando no
    }
  },
  created(){
    this.showForm('')
  },
  methods:{
    showForm(type){  
      if(auth.getData())
      {
        this.login = false
        this.register = false
        this.showButtons = true
        this.editProfile = (type == 'edit') ? true : false
        this.play = (type == 'play') ? true : false
      }
      else
      {
        this.login = (type == 'login') ? true : false
        this.register = (type == 'register') ? true : false
        this.showButtons = false
      }

    },
    logout(){
      this.axios.post('http://127.0.0.1:8000/api/logout','',{
        headers:{
          Authorization: 'Bearer '+ auth.getData().access_token
        }
      })
      .then(response=>{
        console.log(response)
        auth.logout()
        this.showForm('')
        return
      }).catch(error=>{
        console.log(error)
      });
    }
  }
}
</script>
