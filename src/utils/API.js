const URL_PREFIX = "http://localhost:3001"
// const URL_PREFIX = "https://augfish-api.herokuapp.com"

const API = {
    login:function(userData){
        console.log(userData)
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(userData)
        }).then(res=> res.json()).catch(err=>null)
    },
    checkAuth:function(token){
        console.log("checking auth")
        return fetch(`${URL_PREFIX}/api/users/check/auth`,{
            headers:{
                "authorization": `Bearer ${token}`
            }
        }).then(res=> res.json()).catch(err=>null)
    },
    // getUsers:function(userId){
    //     return fetch(`${URL_PREFIX}/api/users/`,{
    //     }).then(res=>res.json()).catch(err=>null)
    // },
    getUserData: function (userId) {
        return fetch(`${URL_PREFIX}/api/users/${userId}`, {
        }).then(res => res.json(res)).catch(err => null)
    },
    // getOneTank:function(tankId){
    //     return fetch(`${URL_PREFIX}/api/tanks/${tankId}`,{
    //     }).then(res=>res.json()).catch(err=>null)
    // },
    createPoint: function (geoData) {
        return fetch(`${URL_PREFIX}/api/geos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geoData)
        }).then(res => res.json()).catch(err => null)
    },
    updatePoint:function(geoData){
        return fetch(`${URL_PREFIX}/api/geos/${geoData.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify(geoData)
        }).then(res=> res.json()).catch(err=>null)
    },
    deletePoint:function(id){
        console.log("deleting", id)
        return fetch(`${URL_PREFIX}/api/geos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.status(200).send("delete successful")).catch(err => null)
    },
    createEntry: function (entryData) {
        return fetch(`${URL_PREFIX}/api/entries`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData)
        }).then(res => res.json()).catch(err => null)
    },
    addGeotoEntry: function (geos, id) {
        return fetch(`${URL_PREFIX}/api/entries/addpoint/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geos)
        }).then(res => res.send("association Added")).catch(err => null)
    },
    filterByPoint: function (geoId) {
        // console.log(geoId)
        return fetch(`${URL_PREFIX}/api/geos/${geoId}`, {
        }).then(res => res.json(res)).catch(err => null)
    },

    updatePhoto: function (data) {
        console.log("Hi")
        console.log(data)
        return fetch(`${URL_PREFIX}/api/photos/${data.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.send("association Added")).catch(err => null)
    },
    

    // createPoint:function(token,fishData){
    //     return fetch(`${URL_PREFIX}/api/fishes`,{
    //         method:"POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "authorization": `Bearer ${token}`
    //           },
    //         body:JSON.stringify(fishData)
    //     }).then(res=> res.json()).catch(err=>null)
    // }

    // Delete Entry:
    deleteEntry: function (entryId) {
        return fetch(`${URL_PREFIX}/api/entries/${entryId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).catch(err => null)
    }
}

module.exports = API;