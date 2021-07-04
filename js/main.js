$(document).ready(function () {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }
    document.querySelectorAll('#menu > *').forEach((item) =>
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        })
    new WOW({animateClass: 'animate__animated '}).init();
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });
    $('.pizzaBig').magnificPopup({
        type: 'image'
    });
    let loader = $('#loader')
    $('#test-popup').hide();

    $('#button').click(function () {

        $('.input-info').hide();
        let name = $('#name');
        let address = $('#address');
        let number = $('#number');

        let error = false;

        if (!name.val()) {
            name.siblings('.input-info').show();
            name.css('border-color', 'red')
            error = true;
        } else {
            name.css('border-color', 'rgb(185, 145, 80)');
        }

        if (!address.val()) {
            address.siblings('.input-info').show();
            address.css('border-color', 'red')
            error = true;
        } else {
            address.css('border-color', 'rgb(185, 145, 80)');
        }

        if (!number.val()) {
            number.siblings('.input-info').show();
            number.css('border-color', 'red')
            error = true;
        } else {
            number.css('border-color', 'rgb(185, 145, 80)');
        }

        if (!error) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://itlogia.ru/test/checkout",
                data: {name: name.val(), address: address.val(), number: number.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    console.log(msg)
                    if (msg.success) {
                        $('#order-form').hide();
                        $('#block').show();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    })
});