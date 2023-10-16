// カードリストの配列
const cardList = [];
var nowCardList = [];
// 読み込むリストファイルのID
const id_list = [
  '215001',
  '215002',
  '215003',
  '215004',
  '215005',
  '215006',
  '215007',
  '215008',
  '215009',
  '215010',
  '215011',
  '215012',
  '215013',
  '215014',
  '215015',
  '215016',
  '215017',
  '215018',
  '215019',
  '215020',
  '215021',
  '215022',
  '215901'
];

// スクロールのウェイト
let scrollWait = 0;

// スクロール速度
let scrollSpeed = 1000;

$(function () {
  // リクエストパラメータの取得
  const params = location.href.split('?');
  const paramms = params.length > 1 && params[1].split('&');
  const paramArray = [];
  for (i = 0; i < paramms.length; i++) {
    vl = paramms[i].split('=');
    paramArray.push(vl[0]);
    paramArray[vl[0]] = vl[1];
  }
  // 自動スクロールのウェイトを設定
  if (typeof paramArray['scrollWait'] != 'undefined') {
    if ($.isNumeric(paramArray['scrollWait'])) {
      scrollWait = Number(paramArray['scrollWait']);
    }
  }
  // 自動スクロールのスピードを設定
  if (typeof paramArray['scrollSpeed'] != 'undefined') {
    if ($.isNumeric(paramArray['scrollSpeed'])) {
      scrollSpeed = Number(paramArray['scrollSpeed']);
    }
  }

  // ヘルプボタンのポップオーバー
  $('[data-toggle="popover"]').popover();

  // セレクトボックスの設定
  $('.selectpicker').selectpicker({
    style: 'btn-default',
    size: 8
  });

  // スクロールストップボタンは最初は非表示
  $('#scroll_stop').hide();

  // カードリストの読み込み
  for (let i = 0; i < id_list.length; i++) {
    const val = id_list[i];
    const filename = `./cardlist/${val}.list`;
    const tmpList = readCSV(filename, val);
    if (typeof tmpList !== 'undefined') {
      cardList.push(...tmpList);
    }
  }

  // TOPへ戻るボタン
  const pageTop = $('.page-top');
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(() => {
    $('body, html').animate({ scrollTop: 0 }, 500, 'swing');
    return false;
  });
});

// CSV読み込み
const readCSV = filename => {
  let csvList;
  $.ajax({
    url: filename,
    async: false
  })
    .done(data => {
      // csvを配列に格納
      csvList = $.csv(',', '', '\n')(data);
      csvList = csvList.filter(csv => !csv[0].includes('PE-'));
      //console.log(data)
    })
    .fail(data => {
      //console.log("読み込み失敗：" , url)
    });
  return csvList;
};

// リストを受け取ってカードリストのタグを生成
const generateTag = cardList => {
  // カードリストを挿入するid
  const target = '#clist';
  let insert = '';

  // 挿入するHTMLを作成
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i];
    insert += '<div>';
    insert += `<img src="image/${card[0]}.png" title="${card[0]}" class="content" />`;
    insert += '</div>';
  }
  $(target).append(insert);
};

// オートスクロール開始
const startScroll = () => {
  const cardNum = $('.content').length - 1;
  $('#clist').removeClass("clist");
  $('#clist').autoScroller({
    wait: scrollWait,
    speed: scrollSpeed,
    target: '.content',
    display: cardNum
  });
};

// オートスクロール停止
const stopScroll = () => {
  $('#clist').empty();
  $('#clist').addClass("clist");
  generateTag(nowCardList);
};

// クリック時に実行
$(() => {
  // スクロールする
  $('#scroll_start').click(() => {
    const cardNum = $('.content').length;
    if (cardNum != 0) {
      // 開始前に停止
      stopScroll();

      // スクロール開始
      startScroll();

      // ボタン切り替え
      $('#scroll_start').hide();
      $('#scroll_stop').show();
    }
  });

  // スクロール停止
  $('#scroll_stop').click(() => {
    stopScroll();

    // ボタン切り替え
    $('#scroll_start').show();
    $('#scroll_stop').hide();
  });

  // 全てのカードを表示
  $('#showList').click(() => {
    // 表示中のカードリストを削除
    $('#clist').empty();
    generateTag(cardList);
  });

  // 指定したキャラ、弾ごとにカードを表示
  $('.selectpicker').change(() => {
    // 表示するキャラの番号
    const character_num = $('[name=character_num]').val();
    const select_series = $('[name=series_num]').val();

    // カードリストを条件で絞り込み
    const charaList = cardList.filter((elem, index) => {
      series = elem[0].split('-');
      if (select_series == 0) {
        //ALL
        return elem[1] == character_num;
      } else if (select_series == series[0]) {
        //選択シリーズとイコール
        return elem[1] == character_num;
      } else if (select_series == 9999) {
        if (series[0].match(/[a-z]/gi)) {
          return elem[1] == character_num;
        }
      }
    });

    // 表示中のカードリストを削除
    $('#clist').empty();

    // ボタン切り替え
    $('#scroll_start').show();
    $('#scroll_stop').hide();

    // スクロール
    nowCardList = charaList;

    // カードリストを表示
    generateTag(charaList);
  });
});
