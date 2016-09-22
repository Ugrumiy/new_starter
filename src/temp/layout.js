$('body').append('<div class="fix_nav">'+
    '<div class="title"><span>навигация</span></div>'+
    '<div class="hidden_nav">'+
        '<div class="hidden_nav_col">'+
        
            '<ul>'+
            '<li><a href="index.html">главная</a></li>'+
            '<li><a href="dwa.html">страница раздела dwa</a></li>'+
            '</ul>'+

            'авторизация:'+
            '<ul>'+
            '<li><a href="login.html">логин</a></li>'+
            '<li><a href="pass_restore.html">восстановление пароля</a></li>'+
            '<li><a href="registration.html">регистрация:</a>'+
                '<ul>'+
                '<li><a href="registration_dealer.html">дилер</a></li>'+
                '<li><a href="registration_agency.html">агентство</a></li>'+
                '<li><a href="registration_importer.html">импортер</a></li>'+
                '</li>'+
                '</ul>'+
            '<li><a href="reg_success.html">регистрация успешно</a></li>'+
            '</ul>'+


            'профиль:'+
            '<ul>'+
            '<li><a href="profile.html">личный профиль</a>'+
                '<ul>'+
                '<li><a href="profile_noimg.html">без фотографии</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="profile_edit.html">редактирование профиля</a></li>'+
            '<li><a href="profile_pass.html">изменение пароля</a></li>'+
            '</ul>'+

            'заявки:'+
            '<ul>'+
            '<li><a href="requests_list.html">список</a></li>'+
            '<li><a href="request.html">внутренняя</a></li>'+
            '<li><a href="request_comment.html">отказ комментарий</a></li>'+
            '<li><a href="request_success.html">успех сообщение</a></li>'+
            '<li><a href="request_deleted.html">статус отклонена</a></li>'+
            '<li><a href="request_approved.html">статус одобрен</a></li>'+
            '</ul>'+

            'пользователи:'+ 
            '<ul>'+
            '<li><a href="user_list.html">список</a></li>'+
            '<li><a href="user_inner.html">внутренняя</a></li>'+
            '<li><a href="user_delete_comment.html">удаление комментарий</a></li>'+
            '<li><a href="user_edit.html">редактирование</a></li>'+
            '</ul>'+

            'дилеры:'+ 
            '<ul>'+
            '<li><a href="dealer_list.html">список</a></li>'+
            '<li><a href="dealer_inner.html">внутренняя страница</a></li>'+
            '<li><a href="dealer_add.html">добав-е нового/редакт-е</a></li>'+
            '</ul>'+

            'дилер анкета:'+
            '<ul>'+
            '<li><a href="dealer_anketa.html">общее</a></li>' +
            '<li><a href="dealer_anketa_services.html">услуги</a></li>' +
            '<li><a href="dealer_anketa_links.html">ссылки</a></li>' +
            '<li><a href="dealer_anketa_departments.html">отделы</a></li>' +
            '</ul>'+

        '</div>'+

        '<div class="hidden_nav_col">'+

            'каталог:'+
            '<ul>'+
            '<li><a href="catalogue.html">каталог</a></li>'+
            '<li><a href="catalogue_admin.html">каталог админ</a></li>'+
            '<li><a href="material_detail.html">materail detail</a></li>'+
            '<li><a href="catalogue_popup.html">поп-ап быстрый просмотр</a></li>'+
            '<li><a href="catalogue_search.html">результаты поиска</a></li>'+
            '<li><a href="catalogue_last_files.html">новые документы</a></li>'+
            '<li><a href="catalogue_detail.html">детальная</a>'+
                '<ul>'+
                '<li><a href="catalogue_detail_noimg.html">без превью</a></li>'+
                '<li><a href="catalogue_detail_admin.html">админ</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="catalogue_cart.html">избранное (корзина)</a>'+
                '<ul>'+
                '<li><a href="catalogue_cart_chosen.html">файлы выбраны</a></li>'+
                '<li><a href="catalogue_cart_error.html">ошибка</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="catalogue_upload.html">загрузка файлов</a>'+
                '<ul>'+
                '<li><a href="catalogue_upload_popup.html">поп-ап выбор превью</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="catalogue_section.html">раздел каталога</a>'+
                '<ul>'+
                '<li><a href="catalogue_section_add.html">добавление раздела</a></li>'+
                '</ul>'+
            '</li>'+
            
            '</ul>'+


            'новости:'+
            '<ul>'+
            '<li><a href="news.html">список</a></li>' +
            '<li><a href="news_admin.html">список админ</a></li>' +
            '<li><a href="news_detail.html">детальная</a></li>' +
            '<li><a href="news_add.html">добавление</a></li>' +
            '</ul>'+


            'события:'+
            '<ul>'+
            '<li><a href="events.html">список</a></li>' +
            '<li><a href="events_calendar.html">календарь</a></li>' +
            '<li><a href="events_detail.html">детальная</a></li>' +
            '<li><a href="events_add.html">добавление</a></li>' +
            '</ul>'+

            'контакты:'+
            '<ul>'+
            '<li><a href="contacts.html">список контактов</a></li>' +
            '<li><a href="feedback.html">обратная связь</a></li>' +
            '</ul>'+


            '<br>' +
            'системные:'+
            '<ul>'+
            '<li><a href="preloader.html">preloader</a></li>' +
            '<li><a href="404.html">страница 404</a></li>' +
            '<li><a href="layout.html">layout page</a></li>' +
            
            '</ul>'+


        

        '</div>'+
    '</div></div>');


$('.fix_nav .title').click(function(){
    $('.fix_nav .hidden_nav').slideToggle(300);
});

if ( $('.popup').hasClass('verstka_show') ) {
    $('.popup').addClass('show');
    popupScrollHeight($('.popup'));
    bodyStopScroll($('.popup'));
}


$('.show_preloader').click(function(){
    Pace.restart();
});


//show(text = "сообщение", alarm = false, delay = 0*1000, id="", popup = false)
$('.show_msg').click(function(){
    systemMsg.show("Форма успешно сохранена - закрывается", false, 3);
});

$('.show_msg_nothide').click(function(){
    systemMsg.show("Форма успешно сохранена - не закрывается", null, false, "hello");
});

$('.show_msg_alarm').click(function(){
    systemMsg.show("Форма заполнена неверно - ошибка", "alarm", 3);
});

$('.show_msg_over_popup').click(function(){
    console.log("hello");
    systemMsg.show("Сообщение поверх поп-апа", false, 3, false, true);
});

if ($('.js_verstka_filter_open').length) {
    $('.js_filter_toggler, .js_filter').addClass('active');
    magicSuggest.setVal(["Caddy","Multivan"]);
}