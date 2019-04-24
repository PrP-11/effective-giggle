function makeTable(data) {
  $("#user-data").html('');
  if(data[0]){
    $.each(data, function(i, field){
      var list = "<tr><td>" + field.userName + "</td><td>"
      + field.emailId + "</td><td>"
      + field.phoneNo + "</td><td>"
      + field.dateTime + "</td><td>"
      + '<button type="button" class="btn btn-danger delete" data-toggle="modal" data-target="#confirm-delete" id="'+ field.emailId
      +'" onClick="confirmDelete(this.id)">Delete</button></td></tr>';

      $('#user-data').append(list);
    });
  } else{
    $("#user-data").html('No user found!');
  }
}

function deleteUser(id){
  var url = "/api/user/" + id;
  $.ajax({
    type: "DELETE",
    url: url,
    success: function(data) {
      var msg = "Deleted user Successfully";
      displayAlert('danger', msg);
      getList('/api/user?email');
    }
  });
}

function confirmDelete(id) {
  $('.ok-button').attr("id", id);
}

function getList(url) {
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      makeTable(data);
    }
  });
}

function displayAlert(type, msg) {
  var alert = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">'+
    msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<span aria-hidden="true">&times;</span></button></div>';

  $("#alert-div").html(alert);
  $(".alert")
    .delay(800)
    .slideUp(1000, function() {
      $(this).alert("close");
    });
}
function submitForm(data) {
  $.ajax({
    type: "POST",
    url: "/api/user",
    data: data,
    success: function(data) {
      console.log(data);
      var msg = "User Added/Updated Successfully!";
      displayAlert('success', msg);
    }
  });
}

$(function() {
  getList("/api/user?email");
  $('#search-bar').on('submit', function(e) {
      e.preventDefault();
      var data = $("#search-bar :input").serializeArray();
      var url = "/api/user?email=" + data[0].value;
      getList(url);
  });
  $('#web-form').on('submit', function(e) {
      e.preventDefault();
      var data = $("#web-form :input").serializeArray();
      submitForm(data);
  });
});
