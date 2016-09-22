//------------custom elements init------------


svg4everybody(); //initialize svg for IE


//custom scroll
function customScrollInit () {
    $(".js_custom_scroll").mCustomScrollbar({
        advanced:{
            updateOnContentResize: true
        },
        callbacks:{
            onScrollStart:function(){
                myCustomFn(this);
            }
        }
    });
}

customScrollInit();

//close datepicker in popup
function myCustomFn(scrollItem) {
    $( ".js_datepicker" ).datepicker( "hide" );
}

//horizontal scroll
function customScrollHorizontalInit () {
    $(".js_custom_scroll_horizontal").mCustomScrollbar({
        axis:"x",
        advanced:{
            updateOnContentResize: true
        }
    });
}

customScrollHorizontalInit();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





//custom select  

function customSelectInit () {
    $(".js_chosen_select").chosen({
        disable_search_threshold: 100,
        no_results_text: "Ничего не найдено",
        placeholder_text_single: " "
    });

    $('.js_chosen_select').on('chosen:showing_dropdown', function(e, params) {
        var el = params.chosen.container[0];
        $(el).find('li').wrapInner('<span></span>');
        if (!$(el).find('.js_custom_scroll').length) {
            $(el).find('.chosen-results').wrap('<div class="js_custom_scroll"></div>');
            customScrollInit();
        }
    });
}
customSelectInit();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// tooltips 
function tooltipInit () {
    $(".has_tooltip .tooltip").each(function(){
        var tooltip = $(this);
        var tooltipWidth = $(tooltip).outerWidth();
        tooltip.css({
          marginLeft: - ( tooltipWidth/ 2 ) + 'px'
        });
    });
}
tooltipInit();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//datepicker init
function datePicker() {
    $(".js_datepicker").datepicker( $.datepicker.regional[ "ru" ] );

    $(document).on('click','.js_datepicker_show',function(){      
        if (!$(this).siblings(".js_datepicker").prop('disabled')) {
            $(this).siblings(".js_datepicker").datepicker( "show" );
        }
    });
}
datePicker();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//$('.js_datepicker').datepicker('option', 'minDate', new Date(2016, 0, 20));



//dropdowns

//--prevent dropdown open
$(document).on('click','.js_dropdown_prevent',function(e){
    e.stopPropagation();
});



$(document).on('click','.js_dropdown_trigger',function(e){
    e.preventDefault();
    $('.js_dropdown_trigger').removeClass('opened');
    $('.js_dropdown_item').hide();
    $(this).toggleClass('opened');
    $(this).next('.js_dropdown_item').toggle();

});

//--hide dropdown on outer click
$(document).on('click',function(e){
    if( ($(e.target).closest('.js_dropdown_trigger').length==0)&&($(e.target).closest(".js_dropdown_item").length==0) ) {
        $('.js_dropdown_trigger').removeClass('opened');
        $('.js_dropdown_item').hide();
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//menu toggle inside dropdown
$(document).on('click','.js_submenu_trigger',function(e){
    e.preventDefault();
    $(this).toggleClass('opened');
    $(this).next('.js_submenu_item').slideToggle(300);

});


//switcher
$(document).on('click','.js_switch',function(e){
    $(this).addClass('active').siblings('.js_switch').removeClass('active');
    e.preventDefault();
});

$(document).on('click','.js_switch_content',function(e){
    var switchContent = $(this).attr('href');
    $(switchContent).addClass('active').siblings().removeClass('active');
    e.preventDefault();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//tabs
$(document).on('click','.js_tabs',function(e){
    $(this).addClass('active').siblings('.js_tabs').removeClass('active');
    e.preventDefault();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//check all checkboxes in table
$(document).on('change','.js_table_check_all',function(){
    if($(this).is(':checked')){
        $('.primary_table').find('.inp_checkbox input').prop('checked',true);
        $('.js_table_check_all').prop('checked',true);
    }
    else{
        $('.primary_table').find('.inp_checkbox input').removeAttr('checked');
        $('.js_table_check_all').removeAttr('checked');
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~






// fixed elements on horisontal scroll

function fixedElemsCorrection(elems) {
    elems.each(function(){
        var elemLeft = $(window).scrollLeft();
        $(this).css({left:'-'+elemLeft+'px'});
    });
}

fixedElemsCorrection($('.js_gorizont_scroll'));

$(window).scroll(function(){
   fixedElemsCorrection($('.js_gorizont_scroll'));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




// input mask
function maskedInput() {
    $(".js_date_mask").mask("99.99.9999");
    $(".js_phone_mask").mask("(999) 999-99-99");
}
maskedInput();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// preloader
//-- to call preloader use:
//-- Pace.restart();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





// spinner on file preview loading
function spinner() {
   var opts = {
     lines: 13, 
     length: 0, 
     width: 3, 
     radius: 10, 
     color: '#2274ac', 
     className: 'spinner',
     top: '50%',
     left: '0' // Left position relative to parent
   };
   var spinner = new Spinner(opts).spin();
   $('.js_spinner').html($(spinner.el)); 
}
spinner();

function spinner_big() {
    var opts_big = {
      lines: 13, // The number of lines to draw
      length: 0, // The length of each line
      width: 6, // The line thickness
      radius: 19, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var spinner = new Spinner(opts_big).spin();
    $('.js_spinner_big').html($(spinner.el));
}
spinner_big()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




// equal height of file preview title
function eq_height() {
   $('.js_eq_height_item').height('auto');

    $('.js_eq_height').each(function(){
        var common_h = 0;
        $(this).find('.js_eq_height_item').each(function(){
            var this_h = $(this).height();
            if (this_h > common_h) {
                common_h = this_h;
            }
        });
        $(this).find('.js_eq_height_item').height(common_h);
    })   
}

eq_height();  //init each time when load new file

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//autoNumeric
function numeric() {
    $('.js_numeric').autoNumeric('init',{
        aSep: ' ',
        aDec: ',',
        vMin: '0.00',
        vMax: '999999999999999999999999999.99'
    });
}
numeric();

//numeric without numbers after comma
function numericNoComma() {
    $('.js_numeric_nocomma').autoNumeric('init',{
        aSep: ' ',
        aPad: false,
        mDec: '0',
        vMin: '0.00',
        vMax: '999999999999999999999999999'
    });
}
numericNoComma();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~








//   http://twitter.github.io/typeahead.js/examples/
//   https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
function autoCompleteInit() {

    $('.js_autocomplete').each(function(){

        var self = $(this),
            dataUrl = self.attr('data-url'),
            data = new Bloodhound(self.attr('data-remote') ? {
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: dataUrl,
                remote: {
                  url: dataUrl + '?query=%QUERY',
                  wildcard: '%QUERY'
                }
            } : {
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: dataUrl            
            });

        self.typeahead({
            minLength: 1,
            highlight: true,
            hint: true
        },
        {
            name: 'data',
            source: data
        });
    });
   
}
autoCompleteInit();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





//fake select dropdown
$(document).on('click','.js_select_drop',function(e){
    if (!$(this).hasClass('disabled')) {
        $(this).addClass('focused');
        $(this).parent().find('.js_select_drop_item').toggle();
    }
    e.preventDefault();
});
//--hide dropdown on outer click
$(document).on('click',function(e){
    if( ($(e.target).closest('.js_select_drop_item').length==0)&&($(e.target).closest(".js_select_drop").length==0) ) {
        $('.js_select_drop_item').hide();
        $('.js_select_drop').removeClass('focused');
    }
});



//checkboxes select dropdown
$(document).on('change','.js_check_select input',function(){
    var data = $(this).val();
    
    var dataArr = [];
    var allData = $(this).parents('.js_check_select').find('input:checked').each(function() {
        var data = $(this).is('[data-title]') ? $(this).data('title') : $(this).val();
        dataArr.push(data);
    });

    var arrStr = dataArr.join(', ');

    $(this).parents('.js_check_select').prev('.js_check_select_result').find('.result_wrap').html(arrStr);
});



//filter open 
$(document).on('click','.js_filter_toggler',function(e){
    $(this).toggleClass('active');
    $('.js_filter').slideToggle(300);
    e.preventDefault();
})


$(document).on('click','.js_link_open',function(){
    var url = $(this).attr('data-url');
    window.location.href = url;
});

$(document).on('click','.js_link_open_stop',function(e){
    e.stopPropagation();
});



//accordion
$(document).on('click','.js_accor_toggler',function(){
    $(this).toggleClass('active').next('.js_accor_content').slideToggle(300);
});



var magicData = [
{"id":"Hello", "name":"<span>Hello</span>"}, 
{"id":"Kodix", "name":"<span>Kodix</span>"}, 
{"id":"Kodix1", "name":"<span>Kodix1</span>"}, 
{"id":"Kodix2", "name":"<span>Kodix one</span>"}, 
{"id":"Kodix3", "name":"<span>Kodix Kodix</span>"}, 
{"id":"Kodix4", "name":"<span>Hello Kodix</span>"},
{"id":"Kodix5", "name":"<span>Kodix5</span>"},
{"id":"Kodix6", "name":"<span>Kodix6</span>"},
{"id":"Kodix7", "name":"<span>Kodix7</span>"},
{"id":"Kodix8", "name":"<span>Kodix8</span>"}
];



function MagicSuggest(ms) {
    var ms = ms;
    ms = ms.magicSuggest({
        useCommaKey: false,
        noSuggestionText: '',
        maxSelection: '100',
        maxSuggestions: 5,
        hideTrigger: true,
        data: magicData
    });

    this.setVal = function(args){
        ms.setValue(args);
    }
}

var magicSuggest = new MagicSuggest($('.js_magicsuggest'));




//catalogue view switch
$(document).on('click','.js_catalogue_switch',function(){
    if ($(this).hasClass('catalogue_list')) {
        $(this).parents('.js_catalogue_view').addClass('list_view');
    } else {
        $(this).parents('.js_catalogue_view').removeClass('list_view')
    }
});

//range slider init
function slider_init() {
    $(".js_range_slider").dateRangeSlider({
        arrows:false,
        bounds:{
            min: new Date(2016, 3, 1),
            max: new Date(2016, 6, 1)
          },
        defaultValues:{
            min: new Date(2016, 3, 20),
            max: new Date(2016, 5, 16)
        }
    });
}
slider_init();



//accordion
function accortion_init() {
    $('.js_accordeon').find('ul').find('ul').hide();
    $('.js_accordeon a').on('click',function(){
        $(this).next('ul').slideToggle();
    });
}
accortion_init();



//folder select
$(document).on('click','.js_folder_item',function(e){
    var text = [];
    text.push($(this).text());
    $(this).parents('ul').each(function(){
        text.unshift($(this).siblings(".js_folder_item").text())
    })
    $(this).parents().siblings(".js_folder_select_result").find('.js_result_wrap').text(text.join('/')+"/");
    e.preventDefault();
});
