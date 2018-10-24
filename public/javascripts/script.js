$(document).ready(function() {
    var type_input = $('a.active').attr("type_input");
    show_description('a.active', type_input);
    
    $('a.item').on('click', function active() {
        var type_input = $(this).attr("type_input");
        var option = $(this).html();
        var coordinates_element = $('.input-lat').length;
        var active_option = $('a.active').html();
        if (!coordinates_element && active_option != "Geographic coordinates") {
            $('div.input-fields').append('<div class="field"><label class="input-label label-lat"></label><input class="input-lat" type="number" name="input-lat" placeholder=""></div>');
            $('input.inpu').addClass('input-lon');
        } else if(option != "Geographic coordinates") {
            $('.label-lat').remove();
            $('.input-lat').remove();            
        }
        $('a.active').removeClass('active');
        $(this).addClass('active');
        show_description(this, type_input);
    });

    function show_description(identificator, type_input) {
        var type = $(identificator).html();
        $('h4.title').html('Please, fill the input with the ' + type.toLowerCase());
        $('.input-label').html(type);
        if (type == "Geographic coordinates") {
            $('.input-lat').attr('placeholder', 'Latitude');
            $('.input').attr('placeholder', 'Longitude');     
            $('.input-label').html('Longitude');       
            $('.label-lat').html("Latitude");
        } else {
            $('.input').attr("placeholder", type);
        }
        $('.input').attr("type", type_input);
    }
});