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
// import Swal from 'sweetalert2'
import $ from 'jquery';

export default {
    name: 'MainComponent',
    // props: ["gamename"],
    data() {
        return {
            player_1: {
                lives: 5,
            },
            player_2: {
                lives: 5,
            },
            word: undefined,
            player_turn: undefined
        }
    },
    async created() {
        console.log('GAME STATUS')
        await this.getStatusGame();
        $(document).on("keyup", this.tryLetter);
    },
    methods: {
        async getStatusGame() {
            try {
                const { data } = await this.$axios.post(
                    `https://penjat.codifi.cat`,
                        {
                            action: "infoGame",
                            gameName: "Astronauta Generoso",
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

        async tryLetter(event){
            const { data } = this.$axios.post(
                    `https://penjat.codifi.cat`,
                        {
                            action: "playGame",
                            gameName: "Astronauta Generoso",
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