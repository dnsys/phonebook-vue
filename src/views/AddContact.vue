<template>
	<v-layout justify-center>
		<v-flex sm5>
			<v-card ref="form">
				<v-card-text>
					<v-layout>
						<v-flex d-flex justify-center>
							<v-avatar size="150" @click='pickFile'>
								<img src="../assets/default-avatar.jpg" alt="" v-if="!imageUrl">
								<img :src="imageUrl" alt="" v-else>
							</v-avatar>
							<input
									type="file"
									style="display: none"
									ref="image"
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
        imageName: '',
        imageUrl: '',
        imageFile: '',
		phoneMask: '+##(###)###-####',
        formHasErrors: false,
		errorMessages: ''
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
      pickFile () {
        this.$refs.image.click ()
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