let displayFirst = function(){
  $.getJSON("/api/users", function(users){
    let display =
    `<table class="table">
    <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Information</th>
    </tr>`
    for (let i in users){
      display = display + `
      <tr>
        <td>${users[i].username}</td>
        <td>${users[i].password} </td>
        <td>${users[i].bio} </td>
      </tr>`
    }
    display+=`</table>`
    $(".hasil").html(display)
  })
}

let displayUsers = function(users){
  let display =
  `<table class="table">
  <tr>
      <th>Username</th>
      <th>Password</th>
      <th>Information</th>
  </tr>`
  for (let i in users){
    display += `
    <tr>
      <td>${users[i].username}</td>
      <td>${users[i].password} </td>
      <td>${users[i].bio} </td>
    </tr>`
  }
  display+=`</table>`
  return display
}

let validasiUsername = function(username){
  var matches = username.match(/\d+/g);
  if (matches != null) {
    $(".alert-danger").text("Username tidak boleh mengandung angka")
    $(".alert-danger").show()
    $(".alert-success").hide()
    return false
  }
  else{
    $(".alert-success").text("Sukses Insert!")
    $(".alert-danger").hide()
    $(".alert-success").show()
    return true
  }
}

$(document).ready(function(){
  displayFirst()
  $(".alert-danger").hide()
  $(".alert-success").hide()
  $("#submitgan").click(function(event){
    event.preventDefault()
    let username = $("input[name='username']").val()
    if(validasiUsername(username))
    {
        $.ajax({
          url: '/api/users',
          type: 'POST',
          data: {
            username: $("input[name='username']").val()
            ,password: $("input[name='password']").val()
            ,bio: $("input[name='bio']").val()
          }
        })
        .done(function(){
          $.getJSON("/api/users", function(users){
            let display =
            `<table class="table">
            <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Information</th>
            </tr>`
            for (let i in users){
              display += `
                <tr>
                  <td>${users[i].username}</td>
                  <td>${users[i].password} </td>
                  <td>${users[i].bio} </td>
                </tr>`
            }
            display+=`</table>`
            $(".hasil").html(display)
          })
        })
    }
  })
})
