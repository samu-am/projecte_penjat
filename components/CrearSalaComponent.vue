<template>
  <div class="container">
    <h1>INICIO</h1>

    <div>
      <button @click="formCreate">Crear sala</button>
    </div>
    
    <div>
    <button>Unirse a una sala</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";


export default {
    name: 'CrearSalaComponent',
    data() {
        return {
            nombreSala: '',
            contrasenaSala: '',
        }
    },
    methods: {
        formCreate() {
            
            Swal.fire({
                title: 'Crear tabla',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                html: `
                    <input type="text" id="name" class="swal2-input" placeholder="Nom">
                    <input type="text" id="password" class="swal2-input" placeholder="Contraseña">
                `,
                confirmButtonText: 'Crear',
                focusConfirm: false,
                preConfirm: () => {
                    const nameInput = Swal.getPopup()?.querySelector('#name')
                    const passwordInput = Swal.getPopup()?.querySelector('#password')
                    if (this.validateData(nameInput.value, passwordInput.value)) {
                        Swal.showValidationMessage(this.errors.join("<br>"))
                    }
                    return { name: nameInput.value, password: passwordInput.value }
                },
            }).then((result) => {

                this.nombreSala = result.value?.name ?? ""
                this.contrasenaSala = result.value?.password ?? ""
                // this.profile!.nombreSala = result.value?.name ?? ""
                // this.profile!.contrasenaSala = result.value?.password ?? ""
            })
            
        },
    },
}
</script>

<style>

</style>