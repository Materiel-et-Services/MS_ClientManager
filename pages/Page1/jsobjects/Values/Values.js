export default {
	filterContactsInfo:  (clientArray) => {
		return clientArray.map((clientObject) => {
			 let object = {}
    for (const [key,value] of Object.entries(clientObject)) {
			
        if (["createdon",
        "modifiedon",
        "cr9c2_telephone",
				"test_mobile",
				"test_genre",
				"test_famille",
				"test_typedecommunication",	
				"matserv_depot",
				"matserv_last_consent_date",
				"cr2b8_main_contact",
        "cr9c2_email",
        "cr9c2_name",
				"cr9c2_contact_clientid",
        "cr9c2_type_contact"].includes(key) == true) {
             object[key] = value
        }
    }
    return object
		})
	},
	filterClientInfo:  (clientObject) => {
		
    let object = {}
    for (const [key,value] of Object.entries(clientObject)) {
        if (["cr2b8_clientsunifie_2id",
				"cr2b8_archived_client",
				"cr2b8_plafond",
        "cr2b8_creele",
        "cr2b8_codeclient",
        "cr2b8_raisonsocialeclient",
        "cr2b8_adresse",
        "cr2b8_codepostal",
        "cr2b8_sret",
        "cr2b8_ville"].includes(key) == true) {
             object[key.replace("cr2b8_","")] = value
        }
    }
    return object

	},
	initClientsInfos: async () => {
		await getOneClient.run({clientCode: appsmith.store.clientCode})
		return Values.filterClientInfo(getOneClient.data.value[0])
	},
	initApp: async () => {
		isArchivedIncluded.isChecked === true ? await storeValue("withArchive","cr2b8_archived_client ne null",false) : await storeValue("withArchive","cr2b8_archived_client eq false",false)
		
		if(appsmith.store.jwt != undefined) {
			//console.log(appsmith.store)
			return await getAllClients.run()
		.then(async () => {
			if (Object.keys(appsmith.URL.queryParams).includes("clientCode") === true) {
				 await storeValue("clientCode",appsmith.URL.queryParams.clientCode,false)
			} else {
				 await storeValue("clientCode",getAllClients.data.value[0].cr2b8_codeclient,false)
			}
				//Object.keys(appsmith.URL.queryParams).includes("clientCode") === true ?  await storeValue("clientCode",appsmith.URL.queryParams.clientCode,false) :  await storeValue("clientCode",getAllClients.data.value[0].cr2b8_codeclient,false)
		
			
		
			}
		)
		.then(async () => {
			
		 await getOneClient.run({clientCode:appsmith.store.clientCode})})
		.then(async () => {
			let optionsContainer = {}
		await GetOptions.run({options:"cr9c2_type_de_contacts"})
				console.log(1)
		optionsContainer.contactOptions = Values.remapOptions(GetOptions.data.Options)
				
		await GetOptions.run({options:"test_genre"})
				console.log(2)
		optionsContainer.genreOptions = Values.remapOptions(GetOptions.data.Options)
				
		await GetOptions.run({options:"test_typedecommunication"})
				console.log(3)
		optionsContainer.communicationsOptions = Values.remapOptions(GetOptions.data.Options)
				
		await GetOptions.run({options:"test_famille"})
				console.log(4)
		optionsContainer.familleOptions = Values.remapOptions(GetOptions.data.Options)
				
		await GetOptions.run({options:"matserv_depot"})
				
		optionsContainer.depotOptions = Values.remapOptions(GetOptions.data.Options)
				
		await storeValue("optionsObject",optionsContainer,false)
				
		})
		} else {
			console.log("test2")
			navigateTo("Login")
		}
		
		
	},
	remapObject: (element) => {
		return element.map((element) => {
return {
	value: element.cr2b8_codeclient,
	label:element.cr2b8_raisonsocialeclient,}
	})
	},
	remapOptions: (element) => {
		 return element.map((element) => {
return {
	value: element.Value,
	label:element.Label.UserLocalizedLabel.Label}
	})
	},
	myFun2: async () => {
		//use async-await or promises
	}
}