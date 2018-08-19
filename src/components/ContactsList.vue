<template>
	<div>
		<v-layout justify-space-between :class="{'column reverse': $vuetify.breakpoint.smAndDown, 'row': $vuetify.breakpoint.mdAndUp}">
			<v-flex md2>
				<v-select v-model="sortType" :items="selectItems" item-text="sortby" item-value="val" label="Sort by"></v-select>
			</v-flex>
			<v-flex md2>
				<v-text-field
						label="Search"
						append-icon="search"
						v-model="searchQuery"
				></v-text-field>
			</v-flex>
		</v-layout>
		<v-card>
			<v-list two-line>
				<contact-item v-for="(contact, id) in sortedList" :contact="contact" :key="id" :id="contact.id"></contact-item>
			</v-list>
			<!--<v-card-text v-else>-->
				<!--<h4>No data available</h4>-->
			<!--</v-card-text>-->
		</v-card>
		<v-fab-transition>
			<router-link to="/add">
				<v-tooltip left>
					<v-btn slot="activator" color="indigo" dark fab fixed bottom right>
						<v-icon>add</v-icon>
					</v-btn>
					<span>Add new contact</span>
				</v-tooltip>
			</router-link>
		</v-fab-transition>
	</div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import ContactItem from './ContactItem'

export default {
  data(){
    return{
	  sortType: null,
	  selectItems: [
        { sortby: 'Sort by name', val: 'name' },
	  ],
	  searchQuery: ''
	}
  },
  components: {
    ContactItem
  },
  computed: {
	...mapGetters('contacts', {
	  contacts: 'contacts'
	}),
	contactsLength(){
	  //return Object.keys(this.contacts).length
	},
    sortedList(){
      let contacts = this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
      if(this.sortType != null){
        return _.orderBy(contacts, this.sortType, 'asc')
      }else{
        return contacts
      }
    },
  },
  mounted(){
    //console.log(this.contacts)
  },
  created(){
    this.$store.dispatch('contacts/getContacts')
  }
}
</script>

<style>

</style>