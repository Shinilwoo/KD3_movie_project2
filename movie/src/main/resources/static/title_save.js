$(function () {
    $(".confirm-movie").click(function (event) {
        event.preventDefault(); // 기본 동작을 막습니다.
        
        // 클릭된 요소의 인덱스 계산
        var movieIndex = $(this).closest('.slide_item').index() + 1; // index()는 0부터 시작하므로 +1을 해줍니다.
        var trueTitle = movieIndex.toString(); // 선택한 영화의 인덱스를 String으로 변환하여 trueTitle로 사용

        // 예측 제목 1, 2, 3 가져오기
        var predTitle1 = $('.slide_item').eq(0).find('.movie-title').text().trim(); // 첫 번째 영화의 예측 제목
        var predTitle2 = $('.slide_item').eq(1).find('.movie-title').text().trim(); // 두 번째 영화의 예측 제목
        var predTitle3 = $('.slide_item').eq(2).find('.movie-title').text().trim(); // 세 번째 영화의 예측 제목

        console.log(trueTitle);
        console.log(predTitle1);
        console.log(predTitle2);
        console.log(predTitle3);

        // Ajax를 사용하여 서버로 전송
        $.ajax({
            url: "/confirmMovie",
            async: true,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                index: movieIndex,
                predTitle1: predTitle1,
                predTitle2: predTitle2,
                predTitle3: predTitle3
            }),
            success: function (response) {
                console.log('영화가 성공적으로 저장되었습니다.');
                alert('영화가 성공적으로 저장되었습니다.');
                window.location.href = '/'; // 메인 화면으로 이동
            },
            error: function (xhr, status, error) {
                console.error('영화 저장에 실패했습니다.');
                alert('영화 저장에 실패했습니다.');
            }
        });
    });
});



/*
document.addEventListener('DOMContentLoaded', function() {
            // 각 영화 제목 추출
            var pred_title1 = document.querySelector('.movie-title:nth-of-type(1)').textContent.trim();
            var pred_title2 = document.querySelector('.movie-title:nth-of-type(2)').textContent.trim();
            var pred_title3 = document.querySelector('.movie-title:nth-of-type(3)').textContent.trim();

            console.log('pred_title1:', pred_title1);
            console.log('pred_title2:', pred_title2);
            console.log('pred_title3:', pred_title3);

            // "제가 찾는 영화가 맞습니다" 버튼 클릭 시 처리
            document.querySelectorAll('.confirm-movie').forEach(function(element) {
                element.addEventListener('click', function(event) {
                    event.preventDefault(); // 기본 동작을 막습니다.
                    var movieIndex = event.target.getAttribute('data-index');

                    // AJAX 요청을 보냅니다.
                    fetch('/confirmMovie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            index: movieIndex,
                            predTitle1: pred_title1,
                            predTitle2: pred_title2,
                            predTitle3: pred_title3
                        })
                    }).then(response => {
                        if (response.ok) {
                            alert('영화가 성공적으로 저장되었습니다.');
                            window.location.href = '/'; // 메인 화면으로 이동
                        } else {
                            alert('영화 저장에 실패했습니다.');
                        }
                    });
                });
            });
        });*/