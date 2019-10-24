var currentpage = 1;
function getcomments(page) {
  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      page: page
    },
    success: function(response) {
      console.log(response);
      var html = template("commentsTpl", response);
      $("#commentBox").html(html);
      $("#pagination").twbsPagination({
        totalPages: response.pages,
        visiblePages: 3,
        first: "首页",
        prev: "上一页",
        next: "下一页",
        last: "尾页",
        onPageClick: function(event, page) {
          getcomments(page);
        }
      });
    }
  });
}
getcomments(currentpage);

$("#commentBox").on("click", ".status", function() {
  var id = $(this).attr("data-id");
  var state = $(this).attr("data-status");
  $.ajax({
    type: "put",
    url: "/comments/" + id,
    data: {
      state: state == 0 ? 1 : 0
    },
    success: function(response) {
      location.reload();
    }
  });
});
$("#commentBox").on("click", ".delete", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "delete",
    url: "/comments/" + id,
    success: function(response) {
      location.reload();
    }
  });
});
