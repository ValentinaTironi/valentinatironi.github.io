$(document).ready(function() {
    var type_input = $('a.active').attr("type_input");
    show_description('a.active', type_input);
    
    $('a.item').on('click', function active() {
        var type_input = $(this).attr("type_input");
        var option = $(this).html();
        var coordinates_element = $('.input-lat').length;
        var active_option = $('a.active').html();
        if (option == "Geographic coordinates" && !coordinates_element && active_option != "Geographic coordinates") {
            $('div.input-fields').append('<div class="field"><label class="input-label label-lat"></label><input class="input-lat" type="text" name="input-lat" placeholder=""></div>');
            $('input.inpu').addClass('input-lon');
        } else if(option != "Geographic coordinates") {
            $('.label-lat').remove();
            $('.input-lat').remove();            
        }
        $('a.active').removeClass('active');
        $(this).addClass('active');
        show_description(this, type_input);
    });

    //functions
    function show_description(identificator, type_input) {
        var type = $(identificator).html();
        var input_name = convert_name(type);
        $('h4.title').html('Please, fill the input with the ' + type.toLowerCase());
        $('.input-label').html(type);
        if (type == "Geographic coordinates") {
            set_inputs_coordinates();
        } else {
            $('.input').attr("placeholder", type);
            $('.input').attr("name", input_name);
        }
        $('.input').attr("type", type_input);
        $('form.form').attr('action', '/' + input_name)
    }

    function convert_name(name) {
       name = name.toLowerCase();
       var separate_name = name.split(' ');
       return separate_name.join('_');
    }

    function set_inputs_coordinates() {
        $('.input-lat')
            .attr('placeholder', 'Latitude')
            .attr('name', 'latitude');
        $('.input')
            .attr('placeholder', 'Longitude')
            .attr('name', 'longitude');  
        $('.input-label').html('Longitude');       
        $('.label-lat').html("Latitude");
    }

    //get current location
    var error;
    var current_position;

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    function success(position) {
        current_position = position;
        console.log(position);
    };
      
    function error(err) {
        error = err;
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    $('button.current_location').on('click', function() {
        navigator.geolocation.getCurrentPosition(success, error, options);
        console.log(current_position);
        
       if (position) {
           $('input.current_location').val(current_position);
       };
    })
});