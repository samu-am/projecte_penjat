<template>
  
        <div>
            <div class="container salas">
                <div id="fond">
                    <h1 id="title">INICIO</h1>

                    <div>
                        <button id="btnCrear" @click="formCreate">Crear sala</button>
                    </div>
                    
                    <div>
                        <button id="btnUnirse" @click="formUnirse">Unirse a una sala</button>
                    </div>
                </div>
            </div>
            
            <div class="spinner-border d-none" style="width: 5rem; height: 5rem;" role="status"></div>
        </div> 
</template>

<script>
import Swal from "sweetalert2";
import $ from 'jquery';

export default {
    name: 'CrearSalaComponent',
    data() {
        return {
            gameData: {
                nombreSala: '',
                contrasenaSala: '',
                playerName: '',
            },
            reloaded: false,
        }
    },
    mounted() {
        $(document).unbind('keyup');
    },
    methods: {
        formCreate() {
            
            Swal.fire({
                title: 'Crear partida',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                html: `
                    <input type="text" id="name" class="swal2-input" placeholder="Nom">
                    <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
                `,
                confirmButtonText: 'Crear',
                focusConfirm: false,
                preConfirm: () => {
                    const nameInput = Swal.getPopup()?.querySelector('#name')
                    const passwordInput = Swal.getPopup()?.querySelector('#password')
                    
                    return { name: nameInput.value, password: passwordInput.value }
                },
            }).then(async (result) => {
                
                document.querySelector('.salas').classList.add('d-none');

                document.querySelector('.spinner-border').classList.remove('d-none');
                
                this.gameData.nombreSala = result.value?.name ?? ""
                this.gameData.contrasenaSala = result.value?.password ?? ""
                
                if (this.gameData.nombreSala !== "" && this.gameData.contrasenaSala !== "") {
                    this.gameData.playerName = "P1";
                    const { data } = await this.$axios.post(
                        `https://penjat.codifi.cat`,
                        {
                        action: "createGame",
                        gameName: this.gameData.nombreSala,
                        gamePassword: this.gameData.contrasenaSala
                        },
                    );

                    await this.$store.dispatch('gameinfo/fetchCreateGameData', this.gameData)

                    console.log(data)
                    this.$router.push('/gamecontrol')
                }
            })
            
            
            // else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: 'Hay campos vacios.'
            //     })
            // }
            
        },
        formUnirse () {
            Swal.fire({
                title: 'Unirse a partida',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                html: `
                    <input type="text" id="name" class="swal2-input" placeholder="Nom">
                `,
                confirmButtonText: 'Crear',
                focusConfirm: false,
                preConfirm: () => {
                    const nameInput = Swal.getPopup()?.querySelector('#name')
                    
                    return { name: nameInput.value}
                },
            }).then(async (result) => {
                
                this.gameData.nombreSala = result.value?.name ?? ""
                    
                if (this.gameData.nombreSala !== "") {
                    this.gameData.playerName = "P2";
                    this.gameData.contrasenaSala = '';
                    
                    await this.$store.dispatch('gameinfo/fetchCreateGameData', this.gameData)
                    this.$router.push('/gamecontrol')
            }
                
            })
        
        },
    },
}
</script>

<style>

</style>