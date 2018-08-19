<template>
	<v-layout justify-center>
		<v-flex sm5>
			<v-card>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-card-text>
						<v-layout>
							<v-flex d-flex justify-center>
								<v-avatar size="150" @click='pickFile'>
									<img src="../assets/default-avatar.jpg" alt="" v-if="!imageUrl">
									<img :src="imageUrl" alt="" v-else>
								</v-avatar>
								<input
										ref="avatar"
										type="file"
										style="display: none"
										accept="image/*"
										@change="onFilePicked"
								>
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
											  :rules="[() => !!phone || 'This field is required', () => !!phone && phone.length > 12 || 'Address must be more than 12 characters']"
											  :error-messages="errorMessages" :mask="phoneMask"
											  label="Phone"
											  placeholder="+38(093)000-0000"
											  :return-masked-value="true"
											  required></v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
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
					<v-btn color="primary" flat @click="submit" :disabled="submitDisabled">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        valid: true,
        name: '',
        phone: '',
        imageName: '',
        imageUrl: '',
        imageFile: '',
		phoneMask: '+##(###)###-####',
        formHasErrors: false,
		errorMessages: '',
        submitDisabled: false
      }
    },
    computed: {
      // form () {
      //   return {
      //     avatar: this.imageFile,
      //     name: this.name,
      //     phone: this.phone
      //   }
      // }
    },
    methods: {
      pickFile () {
        this.$refs.avatar.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        this.$refs.form.reset()
      },
      submit () {
        this.formHasErrors = false
        this.formHasErrors = false

		if(this.$refs.form.validate()){
          let obj = {
            avatar: this.imageFile,
            name: this.name,
			phone: this.phone
		  }
          console.log(obj)
		  this.$store.dispatch('contacts/addContact', obj)
		  this.$router.push('/contacts')
		}else{
          this.formHasErrors = true
		}
      }
    }
  }
</script>

<style>

</style>