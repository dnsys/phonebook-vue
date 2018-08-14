<template>
	<v-layout>
		<v-flex>
			<contacts-list></contacts-list>
		</v-flex>
	</v-layout>
</template>

<script>
import ContactsList from '../components/ContactsList'
export default {
  components: {
    ContactsList
  }
}
</script>

<style>

</style>