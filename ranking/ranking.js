  $(function() {
function animateRankList() {
var count = $('#rank-list li').length;
var height = $('#rank-list li').height();

function step(index) {
$('#rank-list ol').delay(2000).animate({
top: -height * index,
}, 500, function() {
step((index + 1) % count);
});
} 

step(1);
}

window.yqlCallback = function(data) {
$(data.query.results.channel.data.naver.item).each(function(index, item) {
var text = item.rank + ' - ' + item.keyword + ' [' + item.upcount + ']';
$('#rank-list li a').eq(index).text(text);
});

animateRankList();
}

$('#rank-list li a').text('');

var url = 'http://bangabmoa.com/api/hitkeyword.php?type=xml';
var yql = 'SELECT * FROM xml WHERE url="' + url + '"';

$.ajax({
url: 'http://query.yahooapis.com/v1/public/yql?q=' + yql +
'&format=json&callback=yqlCallback',
dataType: 'script'
});
});
