// 맛집 상세 정보 표시
function displaycafeInfo(index) {
  var len, i, name="", type="", score="", region="", phone="", address="", memo="", pic="";

  // 맛집 상세 정보를 설정
  var mycafeRecord = recordSet.rows.item(index);
  varPosition = index;

  if(mycafeRecord.name != null) {          // 맛집 이름
    name = '<div class="ui-bar ui-bar-a"><h3>' + mycafeRecord.name + '</h3></div>';
  } else {
      name = '<p>이름 : 정보없음</p>';
  }
  if(mycafeRecord.name != null) {          // 유형
      type = '<p>유형 : ' + mycafeRecord.type + '</p>';
  } else {
      type = '<p>유형 : 정보없음</p>';
  }
  if(mycafeRecord.score != null) {          // 평점
      score = '<p>평점 : ' + mycafeRecord.score + '</p>';
  } else {
      score = '<p>평점 : 정보없음</p>';
  }
  if(mycafeRecord.region != null) {          // 지역
      region = '<p>지역 : ' + mycafeRecord.region + '</p>';
  } else {
      region = '<p>지역 : 정보없음</p>';
  }
  if(mycafeRecord.phone != null) {          // 전화번호
      phone = '<p>전화 : ' + mycafeRecord.phone + '</p>';
  } else {
      phone = '<p>전화 : 정보없음</p>';
  }
  if(mycafeRecord.address != null) {          // 주소
      address = '<p>주소 : ' + mycafeRecord.address + '</p>';
  } else {
      address = '<p>주소 : 정보없음</p>';
  }
  if(mycafeRecord.memo != null) {          // 메모
      memo = '<p>메모 : ' + mycafeRecord.memo + '</p>';
  } else {
      memo = '<p>메모 : 정보없음</p>';
  }

  $('#cafeInfoArea').html(name + type + score + region + phone + address + memo);
  $.mobile.changePage("#cafeInfoShowPage", "slide", false, true);
}

function getcafePic() {
  var myName = recordSet.rows.item(varPosition).name;
  var myPic = recordSet.rows.item(varPosition).pic;
  $('#picName').text(myName);
  $('#picArea').attr('src', myPic);
  $.mobile.changePage("#picShowDialog", "pop", false, true);
}

function getcafeRouteMap() {
  var myName = recordSet.rows.item(varPosition).address;
  $('#routeName').text(myName);
  $.mobile.changePage("#routeShowDialog", "pop", false, true);
  $('#routeArea').gmap('destroy');
  navigator.geolocation.getCurrentPosition(
      function(Position) {
          var lat = Position.coords.latitude ;
          var lng = Position.coords.longitude ;

          var start = new google.maps.LatLng(lat, lng);
          var end = recordSet.rows.item(varPosition).address;
          var mode = 'TRANSIT'
          var request = {
              origin:start,
              destination:end,
              travelMode: eval('google.maps.DirectionsTravelMode.'+mode)
          };
          $('#routeArea').gmap('displayDirections', request, function(result, status) {
              if ( status === 'OK' ) {
                  alert('성공');
              } else {
                  alert('실패 : ' + status);
              }
          });
      },
      function(posError) {
          alert('Error Code : ' + posError.code + ' / Error Message : ' + posError.message);
      }, { maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }
  );
}
