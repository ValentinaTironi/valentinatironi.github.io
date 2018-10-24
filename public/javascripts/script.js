$(document).ready(function() {
    $('a.item').on('click', function active() {
        $('a.active').removeClass('active');
        $(this).addClass('active');
    });
});