$.ajax({
  type: "get",
  url: "/categories",
  success: function(response) {
    var html = template("categoryTpl", {
      data: response
    });
    $("#category").html(html);
  }
});
$("#feature").on("change", function() {
  var formData = new FormData();
  var file = this.files[0];
  formData.append("cover", file);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      //   console.log(response);
      $("#preview").attr("src", response[0].cover);
      $("#preview").show();
      $("#thumbnail").val(response[0].cover);
    }
  });
});
$("#postAddForm").on("submit", function() {
  var formData = $(this).serialize();
  //   console.log(formData);
  $.ajax({
    type: "post",
    url: "/posts",
    data: formData,
    success: function(response) {
      location.href = "/admin/posts.html";
    }
  });
  return false;
});
