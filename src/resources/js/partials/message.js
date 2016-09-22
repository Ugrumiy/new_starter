class SystemMsg {

    constructor(options) {

        this.msgTimer = true;
      
        $(document).on('click','.js_mgs_close',function(){
            var msgBlock = $(this).parents('.message_block');
            $(msgBlock).fadeOut(300, function(){
                $(msgBlock).remove();
            });
            clearTimeout(this.msgTimer);
        });

        
    }

    show(text = "сообщение", alarm = false, delay = 0, id="", popup = false) {

        var msgBlock = document.createElement('div');

        msgBlock.className = "message_block pop";

        if (id) {
            msgBlock.id = id;
        }

        msgBlock.innerHTML = '<div class="inside_wrapper"><span href="#" class="close fl_right js_mgs_close"><svg class="icon icon_delete"><use xlink:href="/resources/img/sprite.svg#Delete"></svg></span><span class="message_text">'+`${text}`+'</span></div>';

        $('body').append(msgBlock);

        $(msgBlock).fadeIn(300);

        if (alarm) {
            $(msgBlock).addClass(alarm);
        }

        if (delay) {
            var self = this;
            this.msgTimer = setTimeout(function(){
                self.hideFade(msgBlock);
            }, delay * 1000);
        }

        if (popup) {
            $(msgBlock).addClass('over_popup');
        }

    }

    hideFade(elem) {
        $(elem).fadeOut(300, function(){
            $(elem).remove();
        });
    }

    hide(elem) {
        $(elem).hide();
        $(elem).remove();
    }

}



var systemMsg = new SystemMsg();

//примеры вызова
//systemMsg.show("Форма успешно сохранена");
//systemMsg.show("Форма заполнена неверно", "alarm", false, "hello");
//systemMsg.hide("#id");



