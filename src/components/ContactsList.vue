<template>
	<div>
		<v-card>
			<v-list two-line v-if="isContactsEmpty">
				<contact-item v-for="(contact, key) in contacts" :contact="contact" :key="key" :index="key"></contact-item>
			</v-list>
			<v-card-text v-else>
				<h4>Phonebook is empty</h4>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import ContactItem from './ContactItem'
import { firebaseDB } from '../firebaseConnect'

export default {
  data(){
    return{
      contacts: ''
	}
  },
  components: {
    ContactItem
  },
  computed: {
    isContactsEmpty(){
      return !!(this.contacts.length)
	}
  },
  firebase: {
    contacts: {
      source: firebaseDB.ref('contacts'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  mounted(){
    console.log(this.contacts)
  }
}
</script>

<style>

</style>