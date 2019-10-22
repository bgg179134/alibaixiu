$("#modifyForm").on("submit", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "put",
    url: "/users/password",
    data: formData,
    success: function(response) {
      location.href = "/admin/login.html";
    },
    error: function() {
      alert("密码修改失败");
    }
  });
  return false;
});
