$("#logo").on("change", function() {
  var file = this.files[0];
  var formData = new FormData();
  formData.append("logo", file);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      $("#site_logo").val(response[0].logo);
      $("#preview").attr("src", response[0].logo);
    }
  });
});
$("#settingForm").on("submit", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "post",
    url: "/settings",
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
  url: "/settings",
  success: function(response) {
    console.log(response);
    if (response) {
      $("#site_logo").val(response.logo);
      $("#preview").attr("src", response.logo);
      $("#site_name").val(response.title);
      $("#comment_status").prop("checked", response.comment);
      $("#comment_reviewed").prop("checked", response.review);
    }
  }
});
