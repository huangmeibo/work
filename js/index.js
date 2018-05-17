define(['jquery', 'hand'], function($, hand) {
    var html = $('#box').html();
    var fn = hand.compile(html);
    $.ajax({
        url: "/index",
        dataType: 'json',
        success: function(data) {
            console.log($('.wrap'));
            $('.wrap').html(fn(data));

        }
    })
})