export default {
	getAuthUser: async () => {
		await getUser.run()
		if (getUser.data != undefined) {
			await showAlert("SUper")
			await storeValue("userLogged",getUser.data,false)
			navigateTo("Page1",appsmith.URL.queryParams)
		} else {
			showAlert("Un soucis c'est produit lors de l'authentification, essayer de vous relogger ou contacter votre administrateur")
		}

	}
}