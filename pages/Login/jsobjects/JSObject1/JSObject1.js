export default {
	getToken: async () => {
		if (appsmith.URL.queryParams.code != undefined) {
			console.log(appsmith.URL.queryParams)
			await storeValue("code",appsmith.URL.queryParams.code,false)
			console.log(appsmith.store.code)
			let response =  await getToken.run({code: appsmith.store.code})
			console.log(response)
			await storeValue("jwt",response.access_token,false)
			let params = appsmith.URL.queryParams.state.split("&")
			let objectParams = {}
			params.map((element) => {
				let itemObject = element.split("=")
				let newObj = {}
				newObj[itemObject[0]] = itemObject[1]
				Object.assign(objectParams,newObj)
			})
			
			navigateTo("Page1",objectParams)
		} else {
			console.log("no")
		}

	}
}