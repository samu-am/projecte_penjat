<template>
    <div class="main_container">
    <div class="d-flex justify-content-center">
        <img id="monster_player_1" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img id="monster_player_2" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
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
            player_number: "P2",
            isMyTurn: false,
        }
    },
    computed: {
        ...mapGetters({
            gameName: 'gameinfo/gameName',
            gamePassword: 'gameinfo/gamePassword',
            playerName: 'gameinfo/playerName',
        }),
    },
    mounted() {
        console.log('GAME STATUS')
        console.log(this.gameName)
        this.getStatusGame()
    },
    methods: {
        async getStatusGame() {
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
                
                $('#letters').html(data.gameInfo.wordCompleted)

                console.log(data)
            } catch (e) {
                console.log(e)
            }
        },

        checkGameStatus() {
            if(this.player_turn === this.player_number){
                this.isMyTurn = true
                $(document).on("keyup", this.tryLetter);
                
            } else {
                this.isMyTurn = false
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

                Toast.fire({
                    icon: 'info',
                    title: this.player_number === "P1" ? "Player 2 is playing" : "Player 1 is playing",
                })

                $(document).on("keyup", function(){
                    Toast.fire({
                        icon: 'info',
                        title: this.player_number === "P1" ? "Player 2 is playing" : "Player 1 is playing",
                    })
                });
            }
        },
        async tryLetter(event){
            const { data } = this.$axios.post(
                    `https://penjat.codifi.cat`,
                        {
                            action: "playGame",
                            gameName: this.gameName,
                            word: `${event.key.toUpperCase()}`,
                            player: `${this.player_turn}`
                        },
            );

            await this.getStatusGame()

            console.log(data)
        }
    }
}
</script>

<style>

</style>