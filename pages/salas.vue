<template>
  
    <div class="container">
        <h1>INICIO</h1>

        <div>
            <button @click="formCreate">Crear sala</button>
        </div>
        
        <div>
            <button @click="formUnirse">Unirse a una sala</button>
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
            turn: '',
        }
    },
    methods: {
        async formCreate() {
            
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
                    
                    return { name: nameInput.value, password: passwordInput.value }
                },
            }).then((result) => {
                
                this.nombreSala = result.value?.name ?? ""
                this.contrasenaSala = result.value?.password ?? ""
                    
                
            })
            
            if (this.nombreSala !== "" && this.contrasenaSala !== "") {
                    this.turn = "P1";
                    
                    const { data } = await this.$axios.post(
                        `https://penjat.codifi.cat`,
                        {
                        action: "createGame",
                        gameName: this.nombreSala,
                        gamePassword: this.contrasenaSala
                        },
                    );
                    console.log(data)
                } 
                // else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: 'Hay campos vacios.'
                //     })
                // }
            
        },
        formUnirse () {
            console.log("unirse")
        }
    },
}
</script>

<style>

</style>