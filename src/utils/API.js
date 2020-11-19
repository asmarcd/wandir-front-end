const URL_PREFIX = "http://localhost:3001"
// const URL_PREFIX = "https://wandir.herokuapp.com"

const API = {
    // Sets the userstate on use affect based on login
    login:function(userData){
        console.log("Logging in",userData)
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(userData)
        }).then(res=> res.json()).catch(err=>null)
    },

    // return the userAuthentication token
    checkAuth:function(token){
        console.log("checking auth")
        return fetch(`${URL_PREFIX}/api/users/check/auth`,{
            headers:{
                "authorization": `Bearer ${token}`
            }
        }).then(res=> res.json()).catch(err=>null)
    },

    // create a new user on registration
    createUser: function (newUser) {
        console.log(newUser)
        return fetch(`${URL_PREFIX}/api/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json()).catch(err => null)
    },

    // get a users data, secret sauce for all data population
    getUserData: function (userId) {
        return fetch(`${URL_PREFIX}/api/users/${userId}`, {
        }).then(res => res.json(res)).catch(err => null)
    },

    // Creating a new geopoint
    createPoint: function (geoData) {
        return fetch(`${URL_PREFIX}/api/geos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geoData)
        }).then(res => res.json()).catch(err => null)
    },

    // update a point info
    updatePoint:function(geoData){
        return fetch(`${URL_PREFIX}/api/geos/${geoData.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify(geoData)
        }).then(res=> res.json()).catch(err=>null)
    },
    
    // delete a geo point
    deletePoint:function(id){
        console.log("deleting", id)
        return fetch(`${URL_PREFIX}/api/geos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.status(200).send("delete successful")).catch(err => null)
    },
    
    // add a new journal entry
    createEntry: function (entryData) {
        return fetch(`${URL_PREFIX}/api/entries`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData)
        }).then(res => res.json()).catch(err => null)
    },

    // add a geotag to entry association
    addGeotoEntry: function (geos, id) {
        return fetch(`${URL_PREFIX}/api/entries/addpoint/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geos)
        }).then(res => res.send("association Added")).catch(err => null)
    },
    
    // filter the points on point click
    filterByPoint: function (geoId) {
        // console.log(geoId)
        return fetch(`${URL_PREFIX}/api/geos/${geoId}`, {
        }).then(res => res.json(res)).catch(err => null)
    },

    // upload a photo
    updatePhoto: function (data) {
        return fetch(`${URL_PREFIX}/api/photos/${data.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.send("association Added")).catch(err => null)
    },
    
    // create new geopoint
    createPhoto:function (photoData){
        console.log("inside api route", photoData)
        return fetch(`${URL_PREFIX}/api/photos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData)
        }).then(res => res.json()).catch(err => null)
    },
   
    // Delete Entry:
    deleteEntry: function (entryId) {
        return fetch(`${URL_PREFIX}/api/entries/${entryId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).catch(err => null)
    },

    // Get Entry from data base
    getEntry: function (entryId) {
        return fetch(`${URL_PREFIX}/api/entries/${entryId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).catch(err => null)
    },

    // Update existing entry:
    updateEntry: function (newInputObject) {
        return fetch(`${URL_PREFIX}/api/entries/${newInputObject.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInputObject)
        }).then(res => res.json().catch(err => null))
    }
}

module.exports = API;