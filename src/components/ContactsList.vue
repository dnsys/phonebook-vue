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
			<v-list two-line v-if="sortedList.length > 0">
				<contact-item v-for="(contact, key) in sortedList" :contact="contact" :key="key" :index="key"></contact-item>
			</v-list>
			<v-card-text v-else>
				<h4>No data available</h4>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import ContactItem from './ContactItem'

export default {
  data(){
    return{
      dbConnect: this.$store.getters.db,
      contacts: '',
	  sortType: null,
	  selectItems: [
        { sortby: 'Sort by name', val: 'name' },
	  ],
	  searchQuery: ''
	}
  },
  firebase(){
    return {
      contacts: {
        source: this.$store.getters.db.ref('contacts')
      }
    }
  },
  components: {
    ContactItem
  },
  computed: {
	sortedList(){
	  let contacts = this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
	  })
	  if(this.sortType != null){
        return _.orderBy(contacts, this.sortType, 'asc')
	  }else{
        return contacts
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