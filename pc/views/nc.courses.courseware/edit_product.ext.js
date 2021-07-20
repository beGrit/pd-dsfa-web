dsf.define(function () {
  return {
    //this.nameSpace获取当前页面命名空间
    //this.pageName获取当前页面的名称
    //this.$viewData中存储表单的数据
    //this.$viewInitData中存储了页面初始化接口获取的数据源、默认值、权限等信息
    //this.queryString获取当前页面的查询字符参数
    //this.frames获取页面中viewPart组件内嵌的内页组件
    //this.$parentView获取被frame嵌套的父页面组件
    data: function () {
      return {
        validateRules: {
          //课件时长校验
          durationValidate: function (v) {
            if ($.isEmptyObject(v)) {
              return {
                message: '课件时长不能为空'
              }
            }
            if (!(/^\d\d:[0-5]\d:[0-5]\d$/.test(v))) {
              return {
                message: '格式不正确，请使用“00:01:01”的时间格式'
              }
            }
            return null;
          },
          //文件地址校验
          fileUrlValidate: function (v) {
            if (this.fileTypeArr.indexOf(this.coursewareType) > -1 && $.isEmptyObject(v)) {
              return {
                message: '文件必须上传'
              }
            }
            return null;
          },
          //链接pc端地址校验
          linkPcUrlValidate: function (v) {
            if (this.linkTypeArr.indexOf(this.coursewareType) > -1 && $.isEmptyObject(v)) {
              return {
                message: 'pc端地址必填'
              }
            }
            return null;
          },
          //链接移动端地址校验
          linkMobileUrlValidate: function (v) {
            if (this.linkTypeArr.indexOf(this.coursewareType) > -1 && $.isEmptyObject(v)) {
              return {
                message: '移动端地址必填'
              }
            }
            return null;
          }
        },
        coursewareTypeChangeValue: "0",
        fileExt: {
          "video": {
            CheckedNameStr: "video,",
            extStr: ".avi,.qt,.mov,.mp4,.asf,.rm,.mpeg,",
            fileType: "video",
            isLinkeMine: true,
            mineStr: "video/avi,video/msvideo,video/x-msvideo,application/x-troff-msvideo,video/quicktime,video/quicktime,video/mp4,video/x-ms-asf,application/vnd.rn-realmedia,audio/x-pn-realaudio,video/mpeg,",
            tabIndex: "0",
          },
          "audio": {
            CheckedNameStr: "audio,",
            extStr: ".mp3,.rm,.wav,.midi,",
            fileType: "audio",
            isLinkeMine: true,
            mineStr: "audio/mp3,audio/mpeg3,audio/x-mpeg-3,video/mpeg,video/x-mpeg,application/vnd.rn-realmedia,audio/x-pn-realaudio,audio/wav,audio/x-wav,application/x-midi,audio/midi,audio/x-mid,audio/x-midi,music/crescendo,x-music/x-midi,",
            tabIndex: "0",
          },
          "document": {
            CheckedNameStr: "office,wps,",
            extStr: ".txt,.doc,.docx,.pdf,.pptx,.ppt,.xls,.xlsx,.wps,.et,.dps,",
            fileType: "file",
            isLinkeMine: true,
            mineStr: "text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/mspowerpoint,application/powerpoint,application/vnd.ms-powerpoint,application/x-mspowerpoint,application/vnd.ms-excel,application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/kswps,application/kset,application/ocelet-stream,application/ksdps,",
            tabIndex: "0",
          }
        },
        extsSetting: {}
      }
    },
    computed: {
      coursewareType: function (ee) {
        if (this.coursewareTypeChangeValue == "0") {
          var coursewareType = this.queryString.coursewareType;
          if (coursewareType) {
            var coursewareTypeText = "";
            this.$enum['nc_courses_courseware.r_type'].forEach(function (type_obj) {
              if (type_obj.value == coursewareType) {
                coursewareTypeText = type_obj.text;
                return false;
              }
            });
            this.$set(this.$viewData, "nc_courses_courseware.r_type", {
              "text": coursewareTypeText,
              "value": coursewareType
            });
            this.coursewareTypeToFileType(coursewareType);
            return coursewareType;
          }
        } else {
          return this.coursewareTypeChangeValue;
        }
        return "0";
      },
      fileTypeArr: function () {
        var fileArr = ["video", "audio", "document"];
        return fileArr;
      },
      mediaTypeArr: function () {
        var mediaArr = ["video", "audio", ];
        return mediaArr;
      },
      linkTypeArr: function () {
        var linkArr = ["link"];
        return linkArr;
      }
    },
    created: function () {},
    mounted: function () {

    },
    activated: function () {},
    deactivated: function () {},
    //=======二次开发额外增加的钩子函数 start ===============
    //用于页面初始化数据查询完成，已经获取了表单组件的默认值及下拉框等枚举类组件的数据(此处勿要对$viewData进行赋值操作,需要初始化表单值直接操作data参数)
    inited: function (data, next) {
      next();
    },
    //用于页面数据读取完成，仅对页面类型为表单时有效(此处勿要对$viewData进行赋值操作,需要初始化表单值直接操作data参数)
    dataLoaded: function (data, next) {
      next();
    },
    //页面全部加载完成，且组件都已经挂载
    ready: function () {},
    //表单提交保存验证前触发，此处可以对ignoreValidate属性进行配置设置为true可以忽略表单验证
    validateBefore: function (next, options) {
      next();
    },
    //表单提交保存验证后触发
    validateAfter: function (next, options) {
      next();
    },
    //表单保存前钩子函数
    saveBefore: function (next, options) {
      //如果是课程打开需要修改默认状态为已启用
      if (this.$dialog && this.$dialog.openerVm && this.$dialog.openerVm.nameSpace == "nc.courses.info") {
        this.$set(this.$viewData, "nc_courses_courseware.state", {
          "text": "启用",
          "value": "1"
        })
      }
      next();
    },
    //表单保存数据提交给服务器前对提交数据副本的处理
    postDataBefore: function (next, data, options) {
      next();
    },
    //表单保存数据提交给服务器成功后对服务器返回的结果数据处理
    postDataAfter: function (next, requestResult, options) {
      next();
    },
    //表单保存成功后钩子函数,result为保存后服务器返回的数据
    saveAfter: function (next, result, options) {
      //如果是课程打开需要回调并执行填充课程维护页面的子表
      if (this.$dialog && this.$dialog.openerVm && (this.$dialog.openerVm.nameSpace == "nc.courses.info" || this.$dialog.openerVm.nameSpace == "nc.live.info")) {
        this.$dialog.openerVm.backCoursewareAdd(result);
        this.$dialog.close();
      }
      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {},
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {
      //课件时长修改转换long值
      durationChange(v) {
        if (!($.isEmptyObject(v.args))) {
          var durationArr = v.args.split(":");
          var durationLong = Number(durationArr[0]) * 60 * 60 + Number(durationArr[1]) * 60 + Number(durationArr[2]);
          this.$set(this.$viewData, "nc_courses_courseware.sum_duration_long", durationLong);
        }
      },
      //课件类型改变修改显示隐藏数
      coursewareTypeChange(v) {
        this.coursewareTypeChangeValue = v.args.value;
        this.coursewareType = this.coursewareTypeChangeValue;
        this.coursewareTypeToFileType(v.args.value);
      },
      coursewareTypeToFileType(t) {
        //动态设置文件上传条件
        this.extsSetting = this.fileExt[t];
        var _this = this;
        setTimeout(function () {
          _this.$refs.file_url.rebuildDialogData();
        }, 300)
      },
      //上传文件填充时长和大小
      fileUrlChange(v) {
        var fileUrlJson = JSON.parse(v.args);
        if (fileUrlJson.length == 0) {
          //置空
        } else {
          this.$set(this.$viewData, "nc_courses_courseware.duration", this.timeToFormat(fileUrlJson[0].duration));
          this.$set(this.$viewData, "nc_courses_courseware.r_size", this.getfilesize(fileUrlJson[0].size));
          this.$set(this.$viewData, "nc_courses_courseware.sum_duration_long", fileUrlJson[0].duration);
        }
      },
      getfilesize(size) {
        if (!size) {
          return "";
        }
        var num = 1024.00;
        return (size / Math.pow(num, 2))
          .toFixed(2) //M
      },
      timeToFormat(times) {
        var result = '00:00:00';
        var hour, minute, second;
        if (times && times > 0) {
          hour = Math.floor(times / 3600);
          if (hour < 10) {
            hour = "0" + hour;
          }
          minute = Math.floor((times - 3600 * hour) / 60);
          if (minute < 10) {
            minute = "0" + minute;
          }
          second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
          if (second < 10) {
            second = "0" + second;
          }
          result = hour + ':' + minute + ':' + second;
        }
        return result;
      }

    }
  }
});