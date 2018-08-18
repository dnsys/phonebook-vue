<template>
	<v-layout row align-center justify-center>
		<v-flex md6 text-xs-center>
			<v-card>
				<v-card-text>
					<img src="../assets/logo.png">
					<div>
						<h1>This is test app for learning VUE.JS</h1>
					</div>
					<div v-if="!isUserLogged">
						<h4>I made this project just for learning VueJS. This is the simple project that contains phonebook and management of it (add, delete, sort).
							Also i added auth for this app. The application backend is based on Firebase</h4>
					</div>
					<div v-else>
						<h4>Welcome! Please, follow the link in main menu "Contacts" to check what can this application.
							If your own list is currently empty, you can add new item manually or click beautiful button "Generate"
							bellow to generate content automatically. Play around!</h4>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-flex justify-center>
						<v-btn color="info" to="/auth" v-if="!isUserLogged">Enter</v-btn>
						<v-btn v-else @click.prevent="setSeeds">Generate</v-btn>
					</v-flex>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
	  data(){
	    return{
		}
	  },
	  computed: {
	    isUserLogged(){
          return this.$store.getters.user
		}
	  },
	  methods: {
	    setSeeds(){
	      this.$store.dispatch('contacts/seeds')
		}
	  }
	}
</script>

<style>
	
</style>