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
$("#featureBox").on("change", "#feature", function() {
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

var id = getUrlParams("id");
if (id != -1) {
  $.ajax({
    type: "put",
    url: "/posts/" + id,
    data: id,
    success: function(response) {
      $.ajax({
        type: "get",
        url: "/categories",
        success: function(categories) {
          response.categories = categories;
          console.log(response);
          var html = template("modifyTpl", response);
          $("#contentBox").html(html);
        }
      });
    }
  });
}
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split("&");
  console.log(paramsAry);
  for (var i = 0; i < paramsAry.length; i++) {
    var arr = paramsAry[i].split("=");
    if (arr[0] == name) {
      return arr[1];
    }
  }
  return -1;
}

$("#contentBox").on("submit", "#modifyForm", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "put",
    url: "/posts/" + id,
    data: formData,
    success: function(response) {
      // console.log(response);
      location.href = "/admin/posts.html";
    }
  });
  return false;
});
