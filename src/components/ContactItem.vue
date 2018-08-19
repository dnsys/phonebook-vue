<template>
	<v-list-tile @click="">
		<v-list-tile-avatar>
			<img :src="contact.avatar" v-if="contact.avatar">
			<img src="../assets/default-avatar.jpg" alt="" v-else>
		</v-list-tile-avatar>

		<v-list-tile-content class="ml-2">
			<v-list-tile-title>{{ contact.name }}</v-list-tile-title>
			<v-list-tile-sub-title>{{ contact.phone }}</v-list-tile-sub-title>
		</v-list-tile-content>

		<v-list-tile-action>
			<v-menu bottom left>
				<v-btn slot="activator" icon>
					<v-icon>more_vert</v-icon>
				</v-btn>
				<v-list>
					<v-list-tile :to="{ name: 'contact-view', params: { id: id } }">
						<v-list-tile-title>View</v-list-tile-title>
					</v-list-tile>
					<v-list-tile :to="{ name: 'contact-edit', params: { id: id } }">
						<v-list-tile-title>Edit</v-list-tile-title>
					</v-list-tile>
					<v-list-tile @click="dialog = !dialog">
						<v-list-tile-title>Delete</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-list-tile-action>
		<v-dialog v-model="dialog" max-width="300px">
			<v-card>
				<v-card-title class="headline">Are you sure?</v-card-title>
				<v-card-text>
					Are you sure you want to delete this item? I hope you know what you do
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="green darken-1" flat="flat" @click="dialog = false">
						Disagree
					</v-btn>

					<v-btn color="green darken-1" flat="flat" @click="deleteContact(id)">
						Agree
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-list-tile>
</template>

<script>
import toastr from 'toastr'

export default {
  data(){
    return{
      dialog: false
	}
  },
  props: ['contact', 'id'],
  methods: {
    deleteContact(itemId){
		this.$store.dispatch('contacts/removeContact', itemId).then(()=>{ this.dialog = false })
	}
  }
}
</script>

<style scoped>
</style>