<template>
	<v-layout justify-center>
		<v-flex sm5>
			<v-card ref="form">
				<v-card-text>
					<v-layout>
						<v-flex d-flex justify-center>
							<v-avatar size="150">
								<img src="../assets/default-avatar.jpg" alt="">
							</v-avatar>
						</v-flex>
					</v-layout>
					<v-divider class="mt-3 mb-4"></v-divider>
					<v-layout>
						<v-flex>
							<v-text-field ref="name" v-model="name"
										  :rules="[() => !!name || 'This field is required']"
										  :error-messages="errorMessages"
										  label="Full Name"
										  placeholder="John Doe"
										  required></v-text-field>
							<v-text-field ref="phone"
										  v-model="phone"
										  :rules="[() => !!phone || 'This field is required', () => !!phone && phone.length <= 12 || 'Address must be more than 12 characters']"
										  :error-messages="errorMessages" :mask="phoneMask"
										  label="Phone"
										  placeholder="+38(093)000-0000"
										  required></v-text-field>
						</v-flex>
					</v-layout>
				</v-card-text>
				<v-divider class="mt-5"></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-slide-x-reverse-transition>
						<v-tooltip v-if="formHasErrors" left>
							<v-btn slot="activator" icon class="my-0" @click="resetForm">
								<v-icon>refresh</v-icon>
							</v-btn>
							<span>Refresh form</span>
						</v-tooltip>
					</v-slide-x-reverse-transition>
					<v-btn color="primary" flat @click="submit">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        name: null,
        phone: null,
		phoneMask: '+##(###)###-####',
        formHasErrors: false
      }
    },
    computed: {
      form () {
        return {
          name: this.name,
          phone: this.phone
        }
      }
    },
    methods: {
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      }
    }
  }
</script>

<style>

</style>