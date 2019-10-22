$("#addCategory").on("submit", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "post",
    url: "/categories",
    data: formData,
    success: function(response) {
      location.reload();
    },
    error: function() {
      alert("添加分类失败");
    }
  });
});
$.ajax({
  type: "get",
  url: "/categories",
  success: function(response) {
    var html = template("categoryTpl", { data: response });
    $("#categoryBox").html(html);
  }
});
//修改模块
$("#categoryBox").on("click", ".edit", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "get",
    url: "/categories/" + id,
    success: function(response) {
      var html = template("modifyCategoryTpl", response);
      $("#modifyCategoryBox").html(html);
    }
  });
});
$("#modifyCategoryBox").on("submit", "#modifyCategory", function() {
  var id = $(this).attr("data-id");
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: "put",
    url: "/categories/" + id,
    data: formData,
    success: function(response) {
      location.reload();
    }
  });
  return false;
});

//删除
$("#categoryBox").on("click", ".delete", function() {
  var id = $(this)
    .siblings(".edit")
    .attr("data-id");
  var isConfirm = confirm("确定删除此分类吗？");
  if (isConfirm) {
    $.ajax({
      type: "delete",
      url: "/categories/" + id,
      success: function(response) {
        location.reload();
      }
    });
  }
});
//批量删除
$("#selectAll").on("change", function() {
  var status = $(this).prop("checked");
  $("#categoryBox")
    .find("input")
    .prop("checked", status);
  if (status) {
    $("#deleteMany").show();
  } else {
    $("#deleteMany").hide();
  }
});
$("#categoryBox").on("change", ".categoryStatus", function() {
  var inputs = $("#categoryBox").find("input");
  if (inputs.length == inputs.filter(":checked").length) {
    $("#selectAll").prop("checked", true);
  } else {
    $("#selectAll").prop("checked", false);
  }
  if (inputs.filter(":checked").length > 0) {
    $("#deleteMany").show();
  } else {
    $("#deleteMany").hide();
  }
});
$("#deleteMany").on("click", function() {
  var ids = [];
  var checkedCategory = $("#categoryBox")
    .find("input")
    .filter(":checked");
  checkedCategory.each(function(index, element) {
    ids.push($(element).attr("dayta-id"));
  });
  $.ajax({
    type: "delete",
    url: "/categories/" + ids.join("-"),
    success: function(response) {
      location.reload();
    }
  });
});
