<template>
    <div class="main_container">
    <div class="d-flex justify-content-center">
        <img v-if="player_1.lives == 0" id="monster_player_1" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_1.lives == 1" id="monster_player_1" src="~/assets/img/monster1.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_1.lives == 2" id="monster_player_1" src="~/assets/img/monster2.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_1.lives == 3" id="monster_player_1" src="~/assets/img/monster3.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_1.lives == 4" id="monster_player_1" src="~/assets/img/monster4.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_1.lives == 5" id="monster_player_1" src="~/assets/img/monster5.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 0" id="monster_player_1" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 1" id="monster_player_1" src="~/assets/img/monster1.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 2" id="monster_player_1" src="~/assets/img/monster2.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 3" id="monster_player_1" src="~/assets/img/monster3.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 4" id="monster_player_1" src="~/assets/img/monster4.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img v-if="player_2.lives == 5" id="monster_player_1" src="~/assets/img/monster5.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        
    </div>
    <div class="letters_container">
        <span id="letters"></span>
    </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import $ from 'jquery';
import { mapGetters } from 'vuex'

export default {
    name: 'MainComponent',
    // props: ["gamename", "playernumber"],
    data() {
        return {
            player_1: {
                lives: 5,
            },
            player_2: {
                lives: 5,
            },
            word: undefined,
            player_turn: undefined,
            isMyTurn: false,
            time_counter: 0,
            timeout: 0,
            timer_on: false,
            wordPending: true,
            gameOn: true,
        }
    },
    computed: {
        ...mapGetters({
            gameName: 'gameinfo/gameName',
            gamePassword: 'gameinfo/gamePassword',
            playerName: 'gameinfo/playerName',
        }),
    },
    watch: {
        time_counter() {
            if(this.time_counter % 1 === 0) {
                this.getStatusGame()
            }
        }
    },
    mounted() {
        console.log(this.playerName)
        this.getStatusGame()
        this.startCount()
    },
    methods: {
        async getStatusGame() {
            if(this.gameOn) {
                try {
                    const { data } = await this.$axios.post(
                        `https://penjat.codifi.cat`,
                            {
                                action: "infoGame",
                                gameName: this.gameName,
                            },
                    );

                    this.player_1.lives = data.gameInfo.livesP1
                    this.player_2.lives = data.gameInfo.livesP2
                    this.player_turn = data.player
                    this.wordPending = data.gameInfo.wordCompleted.includes('_')

                    $('#letters').html(data.gameInfo.wordCompleted)

                    if(this.wordPending){
                        if(this.player_1.lives === 0 || this.player_2.lives === 0) {
                            this.gameOn = false
                            this.stopCount()
                            Swal.fire({
                                title: '¡Vaya!',
                                text: ' Habeis perdido',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Jugar de nuevo',
                                denyButtonText: `Volver al inicio`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                        // RESTORE THE GAME
                                        if(this.playerName === 'P1' ) {
                                            await this.$axios.post(
                                                `https://penjat.codifi.cat`,
                                                {
                                                    action: "createGame",
                                                    gameName: this.gameName,
                                                    gamePassword: this.gamePassword
                                                },
                                            );
                                            this.gameOn = true
                                            this.startCount()
                                            this.getStatusGame()
                                        } else if(this.playerName === 'P2') {
                                            this.gameOn = true
                                            this.startCount()
                                            this.getStatusGame()
                                        }
                                } else if (result.isDenied) {
                                    this.$router.push('/')
                                }
                            })

                        } else {
                            await this.checkGameStatus()
                        }
                    } else {
                        this.gameOn = false
                        this.stopCount()
                        Swal.fire({
                                title: 'Enhorabuena!',
                                text: ' Habeis ganado',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Jugar de nuevo',
                                denyButtonText: `Volver al inicio`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                        // RESTORE THE GAME
                                        if(this.playerName === 'P1' ) {
                                            await this.$axios.post(
                                                `https://penjat.codifi.cat`,
                                                {
                                                    action: "createGame",
                                                    gameName: this.gameName,
                                                    gamePassword: this.gamePassword
                                                },
                                            );
                                            this.gameOn = true
                                            this.startCount()
                                            this.getStatusGame()
                                        } else if(this.playerName === 'P2') {
                                            this.gameOn = true
                                            this.startCount()
                                            this.getStatusGame()
                                        }
                                } else if (result.isDenied) {
                                    this.$router.push('/')
                                }
                            })
                    }
                    

                } catch (e) {
                    Swal.fire(
                            'Partida no disponible',
                            `Esperando a que el P1 refresque la partida`,
                            'info'
                    )
                    console.log(e)
                }
            }
        },

        checkGameStatus() {
            if(this.gameOn === true) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                if(this.player_turn === this.playerName){
                    this.isMyTurn = true
                    Toast.close()
                    $(document).on("keyup", this.tryLetter);
                    
                } else {
                    this.isMyTurn = false

                    Toast.fire({
                        icon: 'info',
                        title: this.playerName === "P1" ? "Player 2 is playing" : "Player 1 is playing",
                    })

                    $(document).on("keyup", function(){
                        Toast.fire({
                            icon: 'info',
                            title: this.playerName === "P1" ? "Player 2 is playing" : "Player 1 is playing",
                        })
                    });
                }
            }
        },
        async tryLetter(event){
            if(this.gameOn ){
                await this.$axios.post(
                        `https://penjat.codifi.cat`,
                            {
                                action: "playGame",
                                gameName: this.gameName,
                                word: `${event.key.toUpperCase()}`,
                                player: `${this.playerName}`
                            },
                );
            }
        },
        timedCount() {
            this.time_counter++;
            this.timeout = setTimeout(this.timedCount, 1000);
        },
        startCount() {
            if (!this.timer_on) {
                this.timer_on = true;
                this.timedCount();
            }
        },
        stopCount() {
            clearTimeout(this.timeout);
            this.timer_on = false;
        }
    }
}
</script>

<style>

</style>