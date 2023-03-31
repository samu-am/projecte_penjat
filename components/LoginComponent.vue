<template>
  <div class="container">
    <h1>Iniciar sesión en la sala</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="nombre-sala">Nombre de la sala</label>
        <input type="text" class="form-control" id="nombre-sala" v-model="nombreSala" />
      </div>
      <div class="form-group">
        <label for="contrasena-sala">Contraseña de la sala</label>
        <input type="password" class="form-control" id="contrasena-sala" v-model="contrasenaSala" />
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VModal from 'vue-js-modal'

// Vue.use(VModal)
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
// import $ from 'jquery';

Vue.use(VueSweetalert2)

export default {
    name: 'LoginComponent',
    data() {
        return {
            nombreSala: '',
            contrasenaSala: '',
        }
    },
    methods: {
        login() {
        // Aquí puedes agregar la lógica para verificar que el nombre y la contraseña
        // sean válidos y redirigir al usuario a la sala correspondiente.

            if (this.nombreSala === 'nombreDeLaSala' && this.contrasenaSala === 'contraseñaDeLaSala') {
                // Iniciar sesión correctamente
                alert('Dentro')
            } else {
                // Mostrar modal de Bootstrap
                // $('#modal-error').modal('show')
                alert('Fuera')
            }
        },
    },
}
</script>

<style>

</style>