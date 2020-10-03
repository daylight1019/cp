'use strict'
import address from './address'
import { saveToken, getToken } from '../utils/storage'

export default class Channel {
  constructor(options) {
    this.options = options
  }

  loginFromApi(email, pwd) {
    return fetch(address.login(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: pwd })
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        let parseData = JSON.parse(data);
        saveToken(parseData.token);
        return parseData;
      })
      .catch((error) => {
        console.log("-------------Login Error:" + error)
        return null;
      });
  }

  registerFromApi(firstName, lastName, email, password, c_password) {
    var params = { firstname: firstName, lastname: lastName, email: email, password: password, c_password: c_password };
    return fetch(address.register(), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("-------------Register Error:" + error);
        return null;
      });
  }

  async getLeadsListFromApi() {
    var token = await getToken();

    return fetch(address.getLeadsList(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        if (data[data.length - 1] != ']') data += ']';
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Leads List Error" + error)
        return null;
      });
  }

  async getLeadFromApi(id) {
    var token = await getToken();

    return fetch(address.getLead(id), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Lead Error" + error)
        return null;
      });
  }

  async changePasswordFromApi(password, newPassword) {
    var param = { password: password, newpassword: newPassword };
    var token = await getToken();

    return fetch(address.changePassword(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Change Password Error" + error)
        return null;
      });
  }

  async feedbackFromApi(feedback) {
    var param = { feedback: feedback };
    var token = await getToken();

    return fetch(address.feedback(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Feedback Error" + error)
        return null;
      });
  }

  async getContractTemplateFromApi() {
    var param = { criteria: {}, hints: { storageType: 'contracttemplatelayout', searchType: "use" } };
    var token = await getToken();

    return fetch(address.getContractTemplate(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Contract Template Error" + error)
        return null;
      });
  }

  async getSystemFromApi() {
    var token = await getToken();

    return fetch(address.getSystem(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        if (data[data.length - 1] != ']') data += ']'
        return data;
      })
      .catch((error) => {
        console.log("------------- Get System Error" + error)
        return null;
      });
  }

  async getOneSystemFromApi(id) {
    var token = await getToken();
    return fetch(address.addSystem() + "/" + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get System Error" + error)
        return null;
      });
  }

  async addSystemFromApi(param) {
    var token = await getToken();

    return fetch(address.addSystem(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add System Error" + error)
        return null;
      });
  }

  async updateSystemFromApi(param) {
    var token = await getToken();
    console.log("Update Param", JSON.stringify(param));
    return fetch(address.addSystem() + "/" + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update System Error" + error)
        return null;
      });
  }

  async getColorFromApi() {
    var token = await getToken();

    return fetch(address.getColor(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Color Error" + error)
        return null;
      });
  }

  async addColorFromApi(colorName) {
    var param = { name: colorName };
    var token = await getToken();

    return fetch(address.addColor(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Color Error" + error)
        return null;
      });
  }

  async updateColorFromApi(color) {
    var param = { name: color.name };
    var token = await getToken();

    return fetch(address.addColor() + '/' + color.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Color Error" + error)
        return null;
      });
  }

  async deleteColorFromApi(colorId) {
    var param = color;
    var token = await getToken();

    return fetch(address.addColor() + "/" + colorId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Color Error" + error)
        return null;
      });
  }

  async getIngredientListFromApi() {
    var token = await getToken();

    return fetch(address.getIngredientList(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Ingredient Error" + error)
        return null;
      });
  }

  async getOneIngredientFromApi(id) {
    var token = await getToken();

    return fetch(address.addIngredient() + '/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Ingredient Error" + error)
        return null;
      });
  }

  async addIngredientFromApi(param) {
    var token = await getToken();
    return fetch(address.addIngredient(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        return null;
      });
  }

  async updateIngredientFromApi(param) {
    var token = await getToken();
    return fetch(address.addIngredient() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log('error', error);
        return null;
      });
  }

  async getPatternFromApi() {
    var token = await getToken();

    return fetch(address.getPattern(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Pattern Error" + error)
        return null;
      });
  }

  async addPatternFromApi(patternName) {
    var param = { name: patternName };

    var token = await getToken();

    return fetch(address.addPattern(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Pattern Error" + error)
        return null;
      });
  }

  async updatePatternFromApi(pattern) {
    var param = { name: pattern.name };
    var token = await getToken();

    return fetch(address.addPattern() + '/' + pattern.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Pattern Error" + error)
        return null;
      });
  }

  async addPersonFromApi(person) {
    var param = person;
    var token = await getToken();

    return fetch(address.addPerson(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Person Error" + error)
        return null;
      });
  }

  async addLeadFromApi(lead) {
    var param = lead;
    var token = await getToken();

    return fetch(address.addLead(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Person Error" + error)
        return null;
      });
  }

  async addPhoneFromApi(phone) {
    var param = phone;
    var token = await getToken();

    return fetch(address.addPhone(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Person Error" + error)
        return null;
      });
  }

  async addAddressFromApi(person) {
    var param = person;
    var token = await getToken();

    return fetch(address.addAddress(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Person Error" + error)
        return null;
      });
  }

  async addLeadDetailFromApi(leadDetail) {
    var param = leadDetail;
    var token = await getToken();

    return fetch(address.addLeadDetail(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Person Error" + error)
        return null;
      });
  }

  async addProjectFromApi(lead) {
    var param = { leadid: lead.leadid };
    var token = await getToken();

    return fetch(address.addProject(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        if (data[data.length - 1] != '}') data += '}';
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Project Error" + error)
        return null;
      });
  }

  async addProjectDetailFromApi(param) {
    var token = await getToken();

    return fetch(address.addProjectDetail(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log("Add Project Detail", data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add ProjectDetail Error" + error)
        return null;
      });
  }

  async updateProjectDetailFromApi(param) {
    var token = await getToken();
    console.log("Param", JSON.stringify(param));
    return fetch(address.addProjectDetail() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log("Update Project Detail", data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update ProjectDetail Error" + error)
        return null;
      });
  }

  async updateProjectFromApi(param) {
    var token = await getToken();
    console.log("Param", JSON.stringify(param));
    return fetch(address.addProject() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log("Update Project", data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Project Error" + error)
        return null;
      });
  }

  async updatePersonFromApi(person) {
    var param = person;
    var token = await getToken();

    return fetch(address.addPerson() + "/" + person.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        if (data[data.length - 1] != '}') data += '}'
        console.log("Person Update Result", JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Person Error" + error)
        return null;
      });
  }

  async updateLeadFromApi(lead) {
    var param = lead;
    var token = await getToken();
    console.log("=======================updateLeadFromApi");

    return fetch(address.addLead() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log("Update Person Result", JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Person Error" + error)
        return null;
      });
  }

  async updatePhoneFromApi(phone) {
    var param = phone;
    var token = await getToken();

    return fetch(address.addPhone() + '/' + phone.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Phone Error" + error)
        return null;
      });
  }

  async updateAddressFromApi(addr) {
    console.log("=================update param", JSON.stringify(addr));
    var param = addr;
    var token = await getToken();

    return fetch(address.addAddress() + '/' + addr.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log("update address result=====", JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Address Error" + error)
        return null;
      });
  }

  async updateLeadDetailFromApi(leadDetail) {
    var param = leadDetail;
    var token = await getToken();
    console.log("Param", JSON.stringify(param));
    console.log("Token", JSON.stringify(token));
    return fetch(address.addLeadDetail() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        console.log(data)
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Person Error" + error)
        return null;
      });
  }

  async getProjectsFromApi() {
    var token = await getToken();

    return fetch(address.getProjects(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        if (data[data.length - 1] != ']') data += ']';
        console.log("Projects List", data)
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Project Error" + error)
        return null;
      });
  }

  async getProjectDetailsFromApi() {
    var token = await getToken();

    return fetch(address.getProjectDetails(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Project Detail Error" + error)
        return null;
      });
  }

  async getOneProjectDetailFromApi(id) {
    var token = await getToken();

    return fetch(address.addProject() + '/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Project Detail Error" + error)
        return null;
      });
  }

  async getNoteFromApi(id) {
    var token = await getToken();

    return fetch(address.getNote(id), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Note Error" + error)
        return null;
      });
  }

  async getStateFromApi() {
    var token = await getToken();

    return fetch(address.getState(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get State Error" + error)
        return null;
      });
  }

  async addNoteFromApi(param) {
    var token = await getToken();

    return fetch(address.addNote(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Add Note Error" + error)
        return null;
      });
  }

  async updateNoteFromApi(param) {
    var token = await getToken();

    return fetch(address.addNote() + '/' + param.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(param)
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Update Note Error" + error)
        return null;
      });
  }

  async uploadImageFromApi(param) {
    var token = await getToken();
    let imageFormData = new FormData();

    imageFormData.append("projectid", param.projectid)
    imageFormData.append("image", param.image)
    
    return fetch(address.uploadImage(), {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      },
      body: imageFormData
    })
      .then(response => response.text())
      .then((data) => {
        console.log("Upload Image Result", data)
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Upload Image Error" + error)
        return null;
      });
  }

  async getImageListFromApi(projectId) {
    var token = await getToken();
    return fetch(address.getImageList(projectId), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get Image Error" + error)
        return null;
      });
  }

  async getProjectByStatus(status) {
    var token = await getToken();
    return fetch(address.getProjectByStatus(status), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.text())
      .then((data) => {
        data = this.checkJSON(data);
        return data;
      })
      .catch((error) => {
        console.log("------------- Get State Error" + error)
        return null;
      });
  }

  checkJSON(param) {
    if (param == null || param == undefined) return;
    var dataArray = [...param];
    if (dataArray.filter(x => x == '{').length == dataArray.filter(x => x == '}').length + 1) param += '}'
    if (dataArray.filter(x => x == '[').length == dataArray.filter(x => x == ']').length + 1) param += ']'
    return param;
  }
}
