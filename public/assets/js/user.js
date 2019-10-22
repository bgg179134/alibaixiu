//用户保存表单提交
$("#userForm").on("submit", function() {
  //使用formdata保存表单数据 serialize方法获取数据
  var formData = $(this).serialize();
  // console.log(formData);
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function() {
      //保存成功刷新页面
      location.reload();
    },
    error: function() {
      alert("添加用户失败");
    }
  });
  return false;
});

//头像上传
$("#modifyBox").on("change", "#avatar", function() {
  var formData = new FormData();
  //追加图片路径
  formData.append("avatar", this.files[0]);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      // console.log(response);
      //图片显示
      $("#preview").attr("src", response[0].avatar);
      $("#hiddenAvatar").val(response[0].avatar);
    }
  });
});

//获取用户列表
$.ajax({
  type: "get",
  url: "/users",
  success: function(response) {
    // console.log(response);
    var html = template("userTpl", {
      data: response
    });
    $("#userBox").html(html);
  }
});

//用户编辑功能
$("#userBox").on("click", ".edit", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "get",
    url: "/users/" + id,
    data: id,
    success: function(response) {
      // console.log(response);
      var html = template("modifyTpl", response);
      $("#modifyBox").html(html);
    }
  });
});

//修改表单提交
$("#modifyBox").on("submit", "#modifyForm", function() {
  var id = $(this).attr("data-id");
  var formData = $(this).serialize();
  // console.log(formData);
  $.ajax({
    type: "put",
    url: "/users/" + id,
    data: formData,
    success: function(response) {
      location.reload();
    },
    error: function() {
      alert("修改失败！");
    }
  });
  return false;
});

//删除用户
$("#userBox").on("click", ".delete", function() {
  var id = $(this)
    .siblings(".edit")
    .attr("data-id");
  var isDelete = confirm("确认要删除此用户吗？");
  if (isDelete) {
    $.ajax({
      type: "delete",
      url: "/users/" + id,
      success: function(response) {
        location.reload();
      },
      error: function() {
        alert("删除失败");
      }
    });
  }
});
//批量删除
$("#selectAll").on("change", function() {
  var status = $(this).prop("checked");
  $("#userBox")
    .find("input")
    .prop("checked", status);
  if (status) {
    $("#deleteMany").show();
  } else {
    $("#deleteMany").hide();
  }
});

$("#userBox").on("change", ".userStatus", function() {
  var inputs = $("#userBox").find("input");
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
  var checkedUser = $("#userBox")
    .find("input")
    .filter(":checked");
  // console.log(checkedUser);
  checkedUser.each(function(index, element) {
    ids.push($(element).attr("data-id"));
  });
  // console.log(ids);
  // console.log(ids.join("-"));
  var isDelete = confirm("确认要进行批量删除用户吗？");
  if (isDelete) {
    $.ajax({
      type: "delete",
      url: "/users/" + ids.join("-"),
      success: function() {
        location.reload();
      }
    });
  }
});
