$(function () {
    $('.black_box').hide();
    $('.loader_card').hide();
    var click = true;
//    write
    $('.write-button').on("click", function () {
        const cardForm = '<div class="write_div"><form name="write_card"><textarea autofocus="autofocus" maxlength="111" rows="1" placeholder="나만의 글귀를 작성해보세요" name="content" id="textarea" style="resize:none;height: 40px;width: 40%;"></textarea><span id="counter">###</span><input class="btn btn-default submit_card" type="submit" value="등록"/></form></div>';
        if (click == true) {
            $('#wrapBtn').after(cardForm);
            $('#textarea').on("keyup", function () {
                var content = $(this).val();
                $('#counter').html(content.length + '/111');
            });
            $('#textarea').keyup();
            click == false;
        } else {
            $('.write_div').remove();
            click == true;
        }
        $('form[name=write_card]').on("submit", function () {
            $('.black_box').show();
            $('.loader_card').show();
            const userId = $('#id').text();
            const content = $('#textarea').val();
            $.ajax({
                url: "/bookcard/write",
                type: "post",
                data: {
                    "userId": userId,
                    "content": content
                },
                success: function (e) {
                    if (e == "true") {
                        $('.black_box').hide();
                        $('.loader').hide();
                        location.replace("/bookcard/main");
                    } else {
                        $('.black_box').hide();
                        $('.loader_card_card').hide();
                        alert("오류가 발생했습니다. 재시도 해주세요.");
                        return false;
                    }
                },
                error: function () {
                    $('.black_box').hide();
                    $('.loader_card').hide();
                    alert("오류가 발생했습니다. 재시도 해주세요.");
                    return false;
                }
            });
            return false;
        });
    });
//    수정
    $('.edit').on("click", function () {
        $('.black-box').show();
        const div = $(this).parent().next();
        const inner = div.next().text();
        const div_form = '<div class="div_edit"><a class="exit"><span class="glyphicon glyphicon-remove"></span></a><form name="edit_card"><textarea autofocus="autofocus" maxlength="111" rows="1" name="content" id="textarea_edit">' + inner + '</textarea><span id="counter" style="float: right;">###</span><input class="btn btn-default submit_card" type="submit" value="수정"/></form></div>';
        $('.black-box').after(div_form);
        $('#textarea_edit').on("keyup", function () {
            var content = $(this).val();
            $('#counter').html(content.length + '/111');
        });
        $('#textarea_edit').keyup();

        $('form[name=edit_card]').on("submit", function () {
            console.log($(this));
            $('.loader').show();
            const content = $('#textarea_edit').val();
            const id = div.text();
            $.ajax({
                url: "/bookcard/edit",
                type: "post",
                data: {
                    "id": id,
                    "content": content
                },
                success: function (e) {
                    if (e == "true") {
                        $('.div_edit').remove();
                        $('.black-box').hide();
                        $('.loader').hide();
                        console.log(content);
                        div.text(content);
                        alert('수정 되었습니다!');
                    } else {
                        $('.loader').hide();
                        alert("오류가 발생했습니다. 재시도 해주세요.");
                        return false;
                    }
                },
                error: function () {
                    $('.loader').hide();
                    alert("오류가 발생했습니다. 재시도 해주세요.");
                    return false;
                }
            });
            return false;
        });

        $('.exit').on("click", function () {
            $('.div_edit').detach();
            $('.black-box').hide();
        });
    });
    // 삭제
    $('.delete').on("click", function () {
        if (confirm("정말 삭제하시겠습니까?")) {
            $('.black-box').show();
            $('.loader').show();
            const id = $(this).parent().next().text();
            $.ajax({
                url: "/bookcard/delete",
                type: "post",
                data: {
                    "id": id,
                },
                success: function (e) {
                    if (e == "true") {
                        $('.black-box').hide();
                        $('.loader').hide();
                        alert('삭제 되었습니다!');
                        location.replace("/bookcard/main");
                    } else {
                        $('.loader').hide();
                        alert("오류가 발생했습니다. 재시도 해주세요.");
                        return false;
                    }
                },
                error: function () {
                    $('.loader').hide();
                    alert("오류가 발생했습니다. 재시도 해주세요.");
                    return false;
                }
            }); //ajax end
            return false;
        } else {
            alert('취소 되었습니다.');
            return false;
        }
    });
    // 좋아요 기능
    $('.heart').on("click", function () {
        let like_dislike;
        const text = $(this).next().text();
        console.dir(text);
        const div = $(this).parent().parent().parent();
        const id = $(':nth-child(2)', div).eq(0).text();
        $(":first-child", $(this)).toggleClass('glyphicon-heart');
        $(":first-child", $(this)).toggleClass('glyphicon-heart-empty');

        if ($(":first-child", $(this)).hasClass('glyphicon-heart')) {
            like_dislike = 'like';
        } else if ($(":first-child", $(this)).hasClass('glyphicon-heart-empty')) {
            like_dislike = 'dislike';
        }
        console.log(id);
        console.log(like_dislike);

        $.ajax({
            url: "/bookcard/likes",
            type: "post",
            data: {
                "id": id,
                "likeCnt": like_dislike
            },
            success: function (like) {
            	console.log(like);
                if (like === "-1") {
                    alert("오류가 발생했습니다. 재시도 해주세요.");
                    return false;
                } else {
                	text.innerText = like;
                }
            },
            error: function () {
            	alert("에러");
                alert("오류가 발생했습니다. 재시도 해주세요.");
                return false;
            }
        }); //ajax end
        return false;
    });
});