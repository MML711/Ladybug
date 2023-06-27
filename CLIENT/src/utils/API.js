import axios from "axios";

const API = {
  // Gets all projects
  getProjects: function () {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/projects`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  // Gets the project with the given id
  getProject: function (id, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return axios.get(`${process.env.REACT_APP_SERVERURL}/api/projects/` + id, {
      signal,
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  },
  getProjectUsers: function (projectId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/userProjects/${projectId}`, {
      signal,
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  getProjectTickets: function (projectId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets/` + projectId, {
      signal,
    }).then((res) => res.json());
  },
  createProject: function (projectData) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(projectData),
    }).then((res) => res.json());
  },
  updateProject: function (projectId, projectData) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(projectData),
    });
  },
  removeUser: function (userId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  addContact: function (id, data) {
    return axios.put(`${process.env.REACT_APP_SERVERURL}/api/users/` + id, data);
  },
  getTicket: function (projectId, ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets/${projectId}/${ticketId}`, {
      signal,
    }).then((res) => res.json());
  },
  getTicketComments: function (ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/comments/${ticketId}`, {
      signal,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  getDevAssignments: function (ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/devAssignments/${ticketId}`, {
      signal,
    }).then((res) => res.json());
  },
  createTicket: function (projectId, payload) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  updateTicket: function (projectId, ticketId, payload) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets/${projectId}/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  deleteTicket: function (projectId, ticketId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets/${projectId}/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  createDevAssignment: function (ticketId, devId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/devAssignments/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(devId),
    }).then((res) => res.json());
  },
  removeAllDevAssignments: function (ticketId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/devAssignments/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  login: function (userInfo) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userInfo),
    });
  },
  getAvailableUsers: function (projectId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/availableUsers/` + projectId, {
      signal,
    }).then((res) => res.json());
  },
  addTeamMember: function (projectId, userId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/userProjects/` + projectId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userId),
    });
  },
  removeTeamMember: function (projectId, userId) {
    return fetch(
      `${process.env.REACT_APP_SERVERURL}/api/userProjects/${projectId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  },
  removeAllTeamMembers: function (projectId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/userProjects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  getUsers: function (abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/users`, { signal }).then((res) =>
      res.json()
    );
  },
  getUser: function (abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/users/0`, {
      signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  updatePic: function (pic) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/users/0`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(pic),
    }).then((res) => res.json());
  },
  lookupUserByEmail: function (email) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/auth/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((res) => res.json());
  },
  deleteProject: function (projectId) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  register: function (userData) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },
  getUserTickets: function (abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;

    return fetch(`${process.env.REACT_APP_SERVERURL}/api/tickets`, {
      signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  createComment: function (ticketId, comment) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/comments/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(comment),
    });
  },
  deleteComment: function (ticketId, commentId) {
    return fetch(
      `${process.env.REACT_APP_SERVERURL}/api/comments/${ticketId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  },
  updateUser: function (userId, payload) {
    return fetch(`${process.env.REACT_APP_SERVERURL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
};

export default API;
