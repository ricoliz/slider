$(function(){

  var firststep = {
    duration: 400,
    auto: false,
    easing:'easeOutSine',
    interval: 3000
  };

  var $window = $(window),
    $container = $('.slider'),
    $element = $container.find('ul'),
    $list = $element.find('li'),
    $next = $container.find('#next'),
    $prev = $container.find('#prev'),
    shift = 2,
    lw = $list.width(),
    len = $list.length,
    w_width = $(window).width(),
    timer = '';


  function go(){
    setting();
    // $(window).on('center', center);
    // center();
    $next.on('click', function(){ slideShow(true); });
    $prev.on('click', function(){ slideShow(false); });
    load();
    // 変数firststepのautoがtrueなら、関数sliderの引数にtrueを渡して一定間隔で実行。
    // 間隔は変数firststepのintervalに従う。
    if(firststep.auto){
      timer = setInterval(function(){ slideShow(true); }, firststep.interval);
    }
    console.log("go",lw);
  }

  // firstview
  function setting(){
    // 最後から3,2番目と最後のイメージを前にもっていっとく。
    for(var y = shift; y > 0; y--){
      $element.find('li').eq(len - y).remove().prependTo($element);
    }
    // ulの後にlayerをいれとく
    for(y = 0; y < 2; y++){
      $('<div class="layer"></div>').insertAfter($element);
    }
    // 変数入れとく
    $leftlayer = $container.find('.layer').eq(0);
    $rightlayer = $container.find('.layer').eq(1);
    console.log("setting",lw);
  }

  // function center(){

  //   // var val2 = (w_width - lw) / 2 - lw * shift;
  //   // $element.css({
  //   //   'width': lw * len,
  //   //   'left': val2
  //   // });

  //   var val2 = (w_width - lw) / 2;
  //   $element.css({
  //     // width: lw * len,
  //     marginleft: val2
  //   });

  //   console.log("val2",val2);
  // }

  // function center(){
  //   var left = (w_width - lw)/2;
  //   console.log(w_width);
  //   console.log(lw);
  //   console.log(left);
  //   $element.css({
  //     'left' : left,
  //     'top' : 0
  //   });

  //   // $element.css("position","relative");
  //   // $element.css("left", ($(window).width() - this.width())/2 + $(window).scrollLeft() + "px");
  //   // return this;
  // }

  function slideShow(dir){
    // ulがアニメーション中なら、以降の処理を中断します。
    if($element.filter(':animated').length) return;

    // 変数firststepのautoがtrueなら、自動スライドを中止します。
    if(firststep.auto){
      clearInterval(timer);
    }
    console.log("firststep.auto&slideshow",firststep.auto);
    // もしdir内がtrueならliの幅の分だけマイナス。falseならliの幅の値を入れる。
    val = (dir)? -lw: lw;
    console.log("val", val);

    $(".slider ul").animate({
      "marginLeft":val
    }, firststep.duration,firststep.easing,callback);
  }

  function callback(){
    // 関数slideで定義した変数valが、0より小さければ最初のliを最後に移動させ、0より大きければ最後のliを最初に移動させる
    if(0 > val){
      $element.find('li').eq(0).remove().appendTo($element);
    }else{
      $element.find('li').eq(len - 1).remove().prependTo($element);
    }

    // 関数slideで、ulをanimateさせた時に付与されたmarginleftの値をリセットします。
    $element.css('marginLeft', 0);
    console.log("callback",lw);
    // 変数firststepのautoがtrueなら、自動スライドを開始します。
    if(firststep.auto){
      timer = setInterval(function(){ slideShow(true); }, firststep.interval);
    }
  }
  function load(){
    console.log("load",lw);
    // 非表示にしているDOMを配列に入れます。
    var array = [$element, $next, $prev];
    // 配列に入っているDOMを全て表示します。
    for(var y = 0; y < array.length; y++) array[y].css('visibility', 'visible');
    // CSSで$containerの背景画像に設定していたloading.gifをリセットします。
    $container.css('background', 'none');
  }

  // windowのloadイベントを登録します。
  // ロードが完了したら関数initializeを実行します。
  $window.on('load', go);

});