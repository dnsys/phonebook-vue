<template>
	<v-layout justify-center align-center>
		<v-flex md5>
			<v-card>
				<v-card-text>
					<form @submit.prevent="onSignin">
						<v-layout row>
							<v-flex xs12>
								<v-text-field
										name="email"
										label="Email"
										id="email"
										v-model="email"
										type="email"
										required></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row>
							<v-flex xs12>
								<v-text-field
										name="password"
										label="Password"
										id="password"
										v-model="password"
										type="password"
										required></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row>
							<v-flex xs12>
								<div class="text-xs-center">
									<v-btn type="submit" :disabled="loading" :loading="loading">
										Sign in
										<v-icon right>lock_open</v-icon>
										<span slot="loader" class="custom-loader">
                        					<v-icon light>cached</v-icon>
                       					</span>
									</v-btn>
									<v-btn flat>Registration</v-btn>
								</div>
								<div class="text-xs-center">
									<v-btn round color="red" dark :disabled="loading" :loading="loading" @click.prevent="signInGoogle">Login with Google
										<v-icon right dark>lock_open</v-icon>
										<span slot="loader" class="custom-loader">
                       						 <v-icon light>cached</v-icon>
                       					</span>
									</v-btn>
								</div>
								<br />
							</v-flex>
						</v-layout>
					</form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default{
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed:{
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    signInGoogle(){
      this.$store.dispatch('signUserInGoogle')
	}
  },
  watch: {
    user (value) {
      console.log(value)
      if (value !== null && value !== undefined) {
        this.$router.push('/contacts')
      }
    }
  },
}
</script>

<style>

</style>