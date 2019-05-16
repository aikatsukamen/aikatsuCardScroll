// ページ読み込み時に実行
var cardList;
var id_list = [ '215001',
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
				'215901'
				];
$(document).ready(function(){

	$.each(id_list, function(i, val) {
		filename = './cardlist/' + val + '.list';
		tmpList = readCSV(filename);
		if(typeof tmpList != "undefined"){
			if(i == 0){
				cardList = tmpList;
			} else {
				cardList = catArray(cardList, tmpList);
			}
		}
	});
});

// CSV読み込み
function readCSV(filename) {
	var csvList;
  $.ajax({
		url: filename,
		async: false
	}).done(function(data) {
			// csvを配列に格納
			csvList = $.csv(",", "","\n")(data);
			//console.log(data)
	}).fail(function(data) {
			//console.log("読み込み失敗：" , url)
	});
	return csvList;
}

// リストの結合
// どっちが早いかそのうち検証したい
function catArray(array1, array2){
	array1 = array1.concat(array2);
  //Array.prototype.push.apply(array1, array2);
  return array1
}

// リストを受け取ってカードリストのタグを生成
function generateTag(cardList){
	// カードリストを挿入するid
	var target = '#clist'; 
	var insert = '';

	// 挿入するHTMLを作成
	//<div class="ct2" style="display: display;"><img src="./image/1602-01.png"/></div>
	for (var i = 0; i < cardList.length; i++) {
		insert += '<div>';
		insert += '<img src="http://www.aikatsu.com/images/cardlist/cardimg/' + cardList[i][0] + '.png" title="' + cardList[i][0] + '" />';
		insert += '</div>';
	};
	$(target).append(insert);
}

// クリック時に実行
$(function() {
    $("#showList").click(function(){
				// 表示中のカードリストを削除
				$('#clist').empty();
        generateTag(cardList);
    });
    $("#showListIchigo").click(function(){
				// 表示するキャラの番号
				var character_num = $("[name=character_num]").val();

				// カードリストを条件で絞り込み
				var charaList = new Array();
				charaList = $.grep(cardList,
					function(elem, index) {
						return (elem[1] == character_num)
					});

				// 表示中のカードリストを削除
				$('#clist').empty();

				// カードリストを表示
        generateTag(charaList);
    });
});

$(function($){
    $("startScroll").click(function() {
 
        $('#clist').carouFredSel({
            responsive: false,
            direction: 'up',
            height: '100%',
            items: {
                start: 'random',
                height: 319,
                width: 481,
                visible: {
                    min: 3,
                    max: 3
                }
            },
            auto: {
                timeoutDuration: 0,
                pauseOnHover: false
            },
            scroll: {
                items: '1',
                fx: 'slide',
                easing: 'linear',
                duration: 0.09
            }
        });
         
    });
});

(function($){
    $(function() {
 
        $('#clist').carouFredSel({
            responsive: false,
            direction: 'up',
            height: '100%',
            items: {
                start: 'random',
                height: 319,
                width: 481,
                visible: {
                    min: 3,
                    max: 3
                }
            },
            auto: {
                timeoutDuration: 0,
                pauseOnHover: false
            },
            scroll: {
                items: '1',
                fx: 'slide',
                easing: 'linear',
                duration: 0.09
            }
        });
         
    });
})(jQuery);
