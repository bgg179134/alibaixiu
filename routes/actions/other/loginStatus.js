module.exports = async (req, res) => {
  if (
    req.session &&
    req.session.userInfo &&
    req.session.userInfo.role == "admin"
  ) {
    const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`;
    // console.log(s);
    res.send(s);
  } else {
    res.send("var isLogin = false");
  }
};
