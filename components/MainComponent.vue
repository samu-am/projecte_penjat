<template>
    <div class="main_container">
    <div class="d-flex justify-content-center">
        <img id="monster_player_1" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
        <img id="monster_player_2" src="~/assets/img/monster0.png" style="width: 50%; height: 50%;" alt="monstre penjat" class="monster">
    </div>
    <div class="letters_container">
        <span id="letters">______</span>
    </div>
    </div>
</template>

<script>
export default {
    name: 'MainComponent',
    data() {
        return {
            player_1: {
                lives: 5,
            },
            player_2: {
                lives: 5,
            },
            word: undefined,
        }
    },
    async created() {
        // await this.fetch();
        // await this.fetchBalance();
    },
    methods: {
        async fetch() {
            try {
                await this.$axios.post(
                    `https://penjat.codifi.cat`,
                    [
                        {
                            // id: this.$config.roleClientId,
                            // name: "client",
                            // description: "Cliente",
                            // composite: false,
                            // clientRole: false,
                            // containerId: this.$config.containerId,
                        },
                    ]
                );
            } catch (e) {
                // console.log("KC Assign Roles: " + e);
                // await this.$axios.delete(
                //     `${this.$config.keycloakRestUrl}/users/${userId}`
                // );
                // this.loading = false;
                // return;
            }
        },
    }
}
</script>

<style>

</style>