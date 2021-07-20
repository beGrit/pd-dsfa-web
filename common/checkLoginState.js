function checkLoginState(toUrl) {
  // let that = this;
  return new Promise(resolve => {
    let isLogin = dsf.getCookie("isLogin");
    if (isLogin == 1) {
      resolve(true);
    } else {
      let sourceUrl = dsf.config.setting_public_login_dialog;
      if (toUrl) {
        sessionStorage.setItem("toUrl", toUrl);
      } else {
        sessionStorage.clear();
      }
      sourceUrl &&
        this.$openDialog({
          title: "",
          width: "400px",
          height: "340px",
          params: {
            path: sourceUrl,
            loginSuccess() {
              resolve(true);
            },
            loginFail() {
              resolve(false);
            },
          },
          onClosed() {
            resolve(false);
          },
        });
    }
  });
}

export default checkLoginState;