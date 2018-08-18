<template>
	<div>
		<v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" fixed app>
			<v-list dense>
				<v-list-tile to="/">
					<v-list-tile-action>
						<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile to="/contacts" v-if="isUserLogged">
					<v-list-tile-action>
						<v-icon>contact_mail</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Contact</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar color="indigo" dark fixed app>
			<v-btn flat fab small v-if="currentRoute" @click="$router.go(-1)">
				<v-icon dark>keyboard_arrow_left</v-icon>
			</v-btn>
			<v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
			<v-toolbar-title>Phonebook app</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<template v-if="isUserLogged">
					<v-btn flat to="/">Home</v-btn>
					<v-btn flat to="/contacts">Contacts</v-btn>
				</template>
				<template v-else>
					<v-btn flat to="/">Home</v-btn>
				</template>
			</v-toolbar-items>
			<v-btn flat fab small dark v-if="isUserLogged" @click="logOut">
				<v-icon>power_settings_new</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      drawer: false,
    }),
    props: {
      source: String
    },
	computed: {
	    ...mapGetters({
		  isUserLogged: 'user'
		}),
	  	currentRoute(){
  		  return this.$route.name === 'contact-edit' || this.$route.name === 'contact-add'
		}
	},
	methods: {
      logOut(){
        this.$store.dispatch('logout')
	  }
	}
  }
</script>

<style>

</style>