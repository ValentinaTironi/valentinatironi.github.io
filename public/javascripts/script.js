$(document).ready(function() {
    var type_input = $('a.active').attr("type_input");
    show_description('a.active', type_input);

    $('a.item').on('click', function active() {
        $('a.active').removeClass('active');
        $(this).addClass('active');
        var type_input = $(this).attr("type_input");
        show_description(this, type_input);
    });

    function show_description(identificator, type_input) {
        var type = $(identificator).html();
        $('h4.title').html('Please, fill the input with the ' + type.toLowerCase());
        $('.input-label').html(type);
        $('.input').attr("placeholder", type);
        $('.input').attr("type", type_input);
    }

    function create_input(){
        $('form.form').append('<div class="field"><label class="input-label"></label><input class="input" type="text" name="first-name" placeholder=""></div>')
    }
});