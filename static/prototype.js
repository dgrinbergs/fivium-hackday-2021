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
      });
  },
  data: function() {
    return {
      errors: [],
      socket: null,
      registered: false,
      name: "",
      members: [],
      location: {}
    }
  },
  methods: {
    connect: function () {
      this.errors = []
      if (this.name.length < 3) {
        console.log(this.name.length > 2)
        this.errors.push("Please enter your name")
        return
      }

      this.socket.emit('register', this.name)
      this.registered = true;
    },
    disconnect: function() {
      this.socket.emit('unregister')
      this.registered = false;
    },
    myFunction: function () {
      console.log('can access data outside of mounted')
    },
  },
  mounted: function() {
    this.socket.on('register', name => {
      this.members.push(name)
    })

    this.socket.on('unregister', name => {
      this.members.splice(this.members.indexOf(name), 1)
    })

    this.socket.on('members', members => {
      this.members = members;
    })
  }
});