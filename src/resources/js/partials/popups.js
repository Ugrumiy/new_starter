var marginFlag = true;

function bodyStopScroll(popItem) {
     //Get real width of page scroll-bar
    var w1 = $(window).width();

    $('body').addClass('popup_show');

    var w2 = $(window).width();

    

    if (marginFlag) {
        $("<style type='text/css'>.popup_show_margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    }

    marginFlag = false;

    $('body, .js_popup_show_margin').addClass('popup_show_margin');

    var bodyHeight = $('body').height();
    var wrapHeight = $('.main_wrapper').outerHeight();
    if (wrapHeight > bodyHeight) {
        $(popItem).addClass('pop_scroll_lock');
    }
}

function bodyRemoveStopScroll(popItem) {
    $('body').removeClass('popup_show');
    $('body, .js_popup_show_margin').removeClass('popup_show_margin');
    $(popItem).removeClass('pop_scroll_lock');
}






//system popup
$(document).on('click','.js_system_pop',function(e){
    var popToShow = $(this).attr('data-popup');
    $(popToShow).fadeIn(300).addClass('show');;
    bodyStopScroll($(popToShow));
    e.preventDefault();
});

$(document).on('click','.js_system_pop_close',function(e){
    $('.system_pop').fadeOut(300,function(){
        bodyRemoveStopScroll($('.system_pop'));
        $(this).removeClass('show');
    });
    e.preventDefault();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




// POPUP height function
function popupScrollHeight(popItem) {
    var popIndent = 120;
    var popPadding = 60;

    var windowHeight = $(window).height();

    var popHeaderHeight = popItem.find('.popup_header').outerHeight();
    var popScrollContentHeight = popItem.find('.popup_content_inside').outerHeight();

    var popInsideIndent = popHeaderHeight + popIndent + popPadding;
   
    var popupMaxHeight = popScrollContentHeight + popInsideIndent;

    if (windowHeight < popupMaxHeight) {
        var popSetHeight = windowHeight - popInsideIndent;
        popItem.find('.popup_scroll_wrap').height(popSetHeight);
    }
    else {
        popItem.find('.popup_scroll_wrap').height("auto");
    }
}

$(window).resize(function(){
    if($('.popup:visible').find('.popup_scroll_wrap')) {
        popupScrollHeight($('.popup:visible'));
    }
});



//ordinary popup
$(document).on('click','.js_popup',function(e){
    var popToShow = $(this).attr('data-popup');
    $(popToShow).fadeIn(300).addClass('show');
    bodyStopScroll($(popToShow));

    if($(popToShow).find('.popup_scroll_wrap')) {
        popupScrollHeight($(popToShow));
    }

    if($(popToShow).find('.js_eq_height')) {
        eq_height();
    }
    
    e.preventDefault();
});

$(document).on('click','.js_popup_close',function(e){
    $(this).parents('.popup').fadeOut(300,function(){
        bodyRemoveStopScroll($('.popup'));
        $(this).removeClass('show');
    });
    e.preventDefault();
});

$(document).click( function(e){
    if(($(e.target).closest(".js_popup").length==0)&&
        ($(e.target).closest(".pop_content").length==0)&&
        ($(e.target).closest(".ui-datepicker").length==0)&&
        ($(e.target).closest(".ui-datepicker-next").length==0)&&
        ($(e.target).closest(".ui-datepicker-next").length==0)&&
        ($(e.target).closest(".ms-sel-item").length==0)&&
        ($(e.target).closest(".ms-res-item").length==0)) {
        $('.popup').fadeOut(300,function(){
            bodyRemoveStopScroll($('.popup'));
            $(this).removeClass('show');
        });
        
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~








//img popup view render

function ImgPopup(args) {
    var imgPop = args.imgPop,
        imgSrc = args.imgSrc,
        imgLink = args.imgLink,
        imgName = args.imgName,
        self = this;

    $(document).on('click','.js_img_pop_render', function() {
        var dataImgSrc = $(this).attr('data-img-src'),
            dataImgLink = $(this).attr('data-img-link'),
            dataImgName = $(this).attr('data-img-name');

        self.render(dataImgSrc, dataImgLink, dataImgName);
    });

    this.render = function(dataImgSrc, dataImgLink, dataImgName) {
        imgSrc.attr('src',dataImgSrc);
        imgLink.attr('href',dataImgLink);
        imgName.html(dataImgName);

        customScrollInit();
    }

}


var imgPopup = new ImgPopup({
    imgPop: $('.js_img_popup'),
    imgSrc: $('.js_img_popup').find('.js_img_src'),
    imgLink: $('.js_img_popup').find('.js_img_link'),
    imgName: $('.js_img_popup').find('.js_img_name')
});
