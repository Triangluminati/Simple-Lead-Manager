const API_URL = "http://127.0.0.1:8000/api/sle/"


export async function getLeads() {

  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to get leads")
  }

  return response.json()
}


export async function addLead(lead) {

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(lead)
  })

  if (!response.ok) {
    throw new Error("Failed to add lead")
  }
  return response.json()
}


export async function updateLead(id, lead) {

  const response = await fetch(`${API_URL}${id}/`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(lead)
  })

  if (!response.ok) {
    throw new Error("Failed to update lead")
  }

  return response.json()
}


export async function deleteLead(id) {

  const response = await fetch(`${API_URL}${id}/`, { method: "DELETE" })



  if (!response.ok) {
    throw new Error("Failed to delete lead")
  }
}