$.ajax({
  type: "get",
  url: "/posts",
  success: function(response) {
    console.log(response);
    var html = template("postListTpl", response);
    // console.log(html);
    $("#postsListBox").html(html);
    var html = template("pageTpl", response);
    $("#page").html(html);
  }
});
//分页功能
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page: page
    },
    success: function(response) {
      var html = template("postListTpl", response);
      // console.log(html);
      $("#postsListBox").html(html);
      var html = template("pageTpl", response);
      $("#page").html(html);
    }
  });
}

$.ajax({
  type: "get",
  url: "/categories",
  success: function(response) {
    var html = template("cateporyTpl", { data: response });
    $("#categoryBox").html(html);
  }
});

//文章筛选
$("#filterForm").on("submit", function() {
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: "get",
    url: "/posts",
    data: formData,
    success: function(response) {
      console.log(response);
      var html = template("postListTpl", response);
      $("#postsListBox").html(html);
      var html = template("pageTpl", response);
      $("#page").html(html);
    }
  });
  return false;
});

$("#postsListBox").on("click", ".delete", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "delete",
    url: "/posts/" + id,
    success: function(response) {
      location.reload();
    }
  });
});
