(function($, window, document, undefind) {
  $.fn.extend({
    circleProgress: function(options) {
      var params = {
        size: 70, //圆环大小
        outColor: "#D8D8D8", //默认圆环填充色
        innerColor: "#3AB269", //进度填充色
        lineWidth: 5, //圆环宽度
        radius: 30, //圆环半径
        textX: 15, //填充文字X坐标
        textY: 45, //填充文字Y坐标
      };
      opts = $.extend(params, options);
      if (!params.obj) return;
      var canvas = document.getElementById(params.obj);
      var canvasWth = opts.size;
      var canvasHgt = opts.size;
      canvas.width = canvasWth;
      canvas.height = canvasHgt;
      // canvas.style.backgroundColor = "#999";
      var ctx = canvas.getContext("2d");

      // 灰色圆环
      ctx.beginPath();
      ctx.lineWidth = opts.lineWidth;
      ctx.strokeStyle = opts.outColor;
      ctx.arc(canvasWth / 2, canvasWth / 2, opts.radius, 0, 2 * Math.PI, true); // true：逆时针 false：顺时针
      ctx.stroke();
      ctx.closePath();

      // 旋转改变开始位置
      ctx.translate(canvasWth / 2, canvasWth / 2);
      ctx.rotate(2 * Math.PI * (270 / 360));
      ctx.translate(-canvasWth / 2, -canvasWth / 2);

      // 绿色进度(+号表示字符串转整数)
      var percent = +canvas.dataset.percent;
      // console.log('圆环进度：' + percent);
      if (!percent) percent = 0;

      function progress() {
        // if (percent) {
        // 角度
        percent = percent >= 100 ? 100 : percent;
        var ang =
          percent == 0 ? 0.1 : Math.round(((360 * percent) / 100) % 360);
        // 进度条
        ctx.beginPath();
        ctx.lineWidth = opts.lineWidth;
        ctx.strokeStyle = opts.innerColor;
        ctx.arc(
          canvasWth / 2,
          canvasWth / 2,
          opts.radius,
          2 * Math.PI * (ang / 360),
          2 * Math.PI,
          true
        ); // true表示顺时针
        ctx.stroke();
        ctx.closePath();
        // 文本
        ctx.save(); // 保存上一个状态
        ctx.translate(canvasWth / 2, canvasWth / 2);
        ctx.rotate(2 * Math.PI * (-270 / 360));
        ctx.translate(-canvasWth / 2, -canvasWth / 2);
        ctx.clearRect(180, 180, 54, 30); // 清楚上次的文本绘制
        ctx.font = "32px Calibri";
        ctx.fillStyle = "#EE6D27";
        var len = String(percent).length;
        var translateX = len == 1 ? parseInt(canvasWth / 3) : (len == 2 ? parseInt(canvasWth / 4) : parseInt(canvasWth / 3));
        ctx.fillText(percent, translateX + 4, opts.textY);
        ctx.restore(); // 恢复上一个状态
        // 请求动画针
        // window.requestAnimationFrame(progress);
        // }
      }
      progress();
    },
  });
})(jQuery, window, document);