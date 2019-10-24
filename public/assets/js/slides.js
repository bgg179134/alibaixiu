$("#file").on("change", function() {
  var file = this.files[0];
  var formData = new FormData();
  formData.append("image", file);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      //   console.log(response[0].image);
      $("#image").val(response[0].image);
    }
  });
});
$("#slidersForm").on("submit", function() {
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: "post",
    url: "/slides",
    data: formData,
    success: function(response) {
      //   console.log(response);
      location.reload();
    }
  });
  return false;
});
$.ajax({
  type: "get",
  url: "/slides",
  success: function(response) {
    console.log(response);
    var html = template("imageTpl", {
      data: response
    });
    $("#imagesBox").html(html);
  }
});
$("#imagesBox").on("click", ".delete", function() {
  var id = $(this).attr("data-id");
  if (confirm("您确定删除此轮播图吗？")) {
    $.ajax({
      type: "delete",
      url: "/slides/" + id,
      success: function(response) {
        location.reload();
      }
    });
  }
});
