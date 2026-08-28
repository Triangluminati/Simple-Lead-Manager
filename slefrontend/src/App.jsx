import { useEffect, useState } from 'react'
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead
} from './api'
import './App.css'

function App() {

  const Statuses = {
    New: "New",
    Contacted: "Contacted",
    Qualified: "Qualified",
    Not_Interested: "Not Interested"
  }

  const [leads, setLeads] = useState([])

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(Statuses.New)

  const [editingId, setEditingId] = useState(null)

  const [editName, setEditName] = useState("")
  const [editCompany, setEditCompany] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editStatus, setEditStatus] = useState(Statuses.New)

  useEffect(() => {
    loadLeads()
  }, [])

  async function loadLeads() {
    try {
      const data = await getLeads()
      setLeads(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAddLead() {

    if (!name || !company || !email) {
      return
    }

    const newLead = {
      name: name,
      company: company,
      email: email,
      status: status
    }

    try {

      const lead = await addLead(newLead)

      setLeads([
        ...leads,
        lead
      ])

      setName("")
      setCompany("")
      setEmail("")
      setStatus(Statuses.New)

    } catch (error) {
      console.error(error)
    }
  }


  function startEditing(lead) {

    setEditingId(lead.id)

    setEditName(lead.name)
    setEditCompany(lead.company)
    setEditEmail(lead.email)
    setEditStatus(lead.status)
  }


  async function saveEdit(id) {

    const updatedLead = {
      id: id,
      name: editName,
      company: editCompany,
      email: editEmail,
      status: editStatus
    }

    try {

      const result = await updateLead(
        id,
        updatedLead
      )

      setLeads(
        leads.map((lead) =>
          lead.id === id
            ? result
            : lead
        )
      )

      setEditingId(null)

    } catch (error) {
      console.error(error)
    }
  }


  function cancelEdit() {
    setEditingId(null)
  }


  async function handleDeleteLead(id) {

    try {

      await deleteLead(id)

      setLeads(
        leads.filter((lead) =>
          lead.id !== id
        )
      )

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="app">

      <h1>Lead Manager</h1>

      <div className="spreadsheet">

        {/* HEADER */}

        <div className="spreadsheet-header">

          <div>Name</div>
          <div>Company</div>
          <div>Email</div>
          <div>Status</div>
          <div>Actions</div>

        </div>


        {/* ADD LEAD */}

        <div className="spreadsheet-row new-row">

          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(event) =>
                setCompany(event.target.value)
              }
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value={Statuses.New}>
                New
              </option>

              <option value={Statuses.Contacted}>
                Contacted
              </option>

              <option value={Statuses.Qualified}>
                Qualified
              </option>

              <option value={Statuses.Not_Interested}>
                Not Interested
              </option>
            </select>
          </div>

          <div className="actions">

            <button onClick={handleAddLead}>
              Add
            </button>

          </div>

        </div>


        {/* LEADS */}

        {leads.map((lead) => {

          const editing = editingId === lead.id

          return (

            <div
              className="spreadsheet-row"
              key={lead.id}
            >

              {/* NAME */}

              <div>

                {editing ? (

                  <input
                    value={editName}
                    onChange={(event) =>
                      setEditName(event.target.value)
                    }
                  />

                ) : (

                  lead.name

                )}

              </div>


              {/* COMPANY */}

              <div>

                {editing ? (

                  <input
                    value={editCompany}
                    onChange={(event) =>
                      setEditCompany(event.target.value)
                    }
                  />

                ) : (

                  lead.company

                )}

              </div>


              {/* EMAIL */}

              <div>

                {editing ? (

                  <input
                    value={editEmail}
                    onChange={(event) =>
                      setEditEmail(event.target.value)
                    }
                  />

                ) : (

                  lead.email

                )}

              </div>


              {/* STATUS */}

              <div>

                {editing ? (

                  <select
                    value={editStatus}
                    onChange={(event) =>
                      setEditStatus(event.target.value)
                    }
                  >

                    <option value={Statuses.New}>
                      New
                    </option>

                    <option value={Statuses.Contacted}>
                      Contacted
                    </option>

                    <option value={Statuses.Qualified}>
                      Qualified
                    </option>

                    <option value={Statuses.Not_Interested}>
                      Not Interested
                    </option>

                  </select>

                ) : (

                  lead.status

                )}

              </div>


              {/* ACTIONS */}

              <div className="actions">

                {editing ? (

                  <>
                    <button
                      className="save-button"
                      onClick={() =>
                        saveEdit(lead.id)
                      }
                    >
                      Save
                    </button>

                    <button
                      className="cancel-button"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>

                ) : (

                  <>
                    <button
                      onClick={() =>
                        startEditing(lead)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteLead(lead.id)
                      }
                    >
                      Delete
                    </button>
                  </>

                )}

              </div>

            </div>

          )
        })}

      </div>

    </div>
  )
}

export default App