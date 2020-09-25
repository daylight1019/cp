'use strict'

// const BASE_URL = 'http://192.168.109.231:8000/api/'
const BASE_URL = 'http://dev.myincredibleone.com/api/'

const address = {
	baseUrl: () => {
		return BASE_URL;
	},

	login: () => {
		return BASE_URL + 'login'
	},

	register: () => {
		return BASE_URL + 'register'
	},

	getLeadsList: () => {
		return BASE_URL + 'leads'
	},

	getLead: (id) => {
		return BASE_URL + 'lead/' + id
	},

	changePassword: () => {
		return BASE_URL + 'changepassword'
	},

	feedback: () => {
		return BASE_URL + 'feedback'
	},

	getContractTemplate: () => {
		return BASE_URL + 'contracttemplates'
	},

	getSystem: () => {
		return BASE_URL + 'systems'
	},

	getColor: () => {
		return BASE_URL + 'colors'
	},

	getIngredientList: () => {
		return BASE_URL + 'ingredients'
	},

	getPattern: () => {
		return BASE_URL + 'patterns'
	},

	addColor: () => {
		return BASE_URL + 'color'
	},

	addIngredient: () => {
		return BASE_URL + 'ingredient'
	},

	addPattern: () => {
		return BASE_URL + 'pattern'
	},

	addSystem: () => {
		return BASE_URL + 'system'
	},

	addPerson: () => {
		return BASE_URL + 'person'
	},

	addLead: () => {
		return BASE_URL + 'lead'
	},

	addPhone: () => {
		return BASE_URL + 'phone'
	},

	addAddress: () => {
		return BASE_URL + 'address'
	},

	addLeadDetail: () => {
		return BASE_URL + 'leaddetail'
	},

	getProjects: () => {
		return BASE_URL + 'projects'
	},

	getProjectDetails: () => {
		return BASE_URL + 'projectdetails'
	},

	getProjectDetail: (id) => {
		return BASE_URL + 'projectdetail/' + id
	},

	addProject: () => {
		return BASE_URL + 'project'
	},

	addProjectDetail: () => {
		return BASE_URL + 'projectdetail'
	},

	uploadImage: () => {
		return BASE_URL + 'project/image'
	},

	addNote: () => {
		return BASE_URL + 'project/note'
	},

	getNote: (id) => {
		return BASE_URL + 'project/note/list/' + id
	},

	getState: () => {
		return BASE_URL + 'states'
	},

	getProjectByStatus: (status) => {
		return BASE_URL + 'project/getprojectsbystatus/' + status
	},

}

export default address
