function eventCalendar() {
    $.datepicker.setDefaults($.datepicker.regional[ "ru" ]); 

    $('.js_event_calendar').datepicker( {
        showOtherMonths: true,
        onChangeMonthYear: function(year,month, inst) {
            setEvents(month, $(this)); 
        }
    });

    var currentMonth = $( ".js_event_calendar" ).datepicker( "getDate" ).getMonth() + 1;
    setEvents(currentMonth, $('.js_event_calendar'));
}

//инициализация
if($('.js_event_calendar').length) {
    eventCalendar();
}

//добавляем события в календарь
function setEvents(month, thisItem) {
    $.ajax({
        url: 'temp/data/events.json',
        type: 'get',
        dataType: 'json',
        data: {'month': month},
        success: function(eventsData) {
            for (var i in eventsData) {
                var day = eventsData[i].day;
                var link =  eventsData[i].link;
                
                thisItem.find('a.ui-state-default').each(function(){
                    var calendarDay = $(this).text();
                    if(calendarDay == day) {
                        $(this).addClass('has_event');
                        $(this).attr('href',link)
                    }
                });
            }
            preventDatepicker(thisItem);
        }
    });
}

//предотвращаем выделеие даты в календаре
function preventDatepicker (thisItem) {
    var elems = thisItem.find('.ui-state-default').parents('.ui-datepicker-calendar');
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener("click", prevent, true);
    }
    function prevent(event) {
        var linkSource = event.target;
        if ($(linkSource).hasClass('has_event')) {
            var linkItem = $(linkSource).attr('href');
            //ручной переход по ссылке
            location.href = linkItem;
        }
        event.stopPropagation();
        event.preventDefault();
    }
}


