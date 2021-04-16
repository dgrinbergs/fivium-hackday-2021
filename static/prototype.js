window.FontAwesomeConfig = { autoReplaceSvg: 'nest' }

let Vue = new window.Vue({
  el: '#app',
  created () {
    // establish connection
    this.socket = io.connect()
    fetch('/noodle-maps.json')
      .then(r => r.json())
      .then(data => {
        this.location = data
      })
  },
  data: function () {
    return {
      errors: [], //errors when validating etc
      socket: null, //the socket between the client and the server
      registered: false, //whether the user has provided a name
      users: [], //other users connected and their selections
      userData: {
        name: "", // this users name
        locations: [] //the locations the user has selected
      },
      location: {} //the location of the office and nearby places provided from the noodle maps 'api'
    }
  },
  methods: {
    register: function () {
      this.errors = []
      if (this.userData.name.length < 3) {
        console.log(this.userData.name.length > 2)
        this.errors.push("Please enter your name")
        return
      }

      this.socket.emit('register', this.userData)
      this.registered = true
    },

    unregister: function () {
      this.socket.emit('unregister')
      this.registered = false
    },

    toggleGroup: function (id) {
      if (!this.userData.locations.includes(id)) {
        this.userData.locations.push(id)
      } else {
        this.userData.locations.splice(this.userData.locations.indexOf(id), 1)
      }
      this.socket.emit('user-update', this.userData)
    },

    getNamesForLocation: function (id) {
      let names = []
      for (let user of this.users) {
        if(user.locations.includes(id)) names.push(user.name)
      }
      return names;
    },

    getTotalUsersInLocation: function (id) {
      return this.getNamesForLocation(id).length
    }
  },
  mounted: function () {
    this.socket.on('register', users => {
      this.users = users
    })

    this.socket.on('unregister', users => {
      this.users = users
    })

    this.socket.on('users', users => {
      this.users = users
    })

    this.socket.on('user-update', users => {
      this.users = users
    })
  }
});