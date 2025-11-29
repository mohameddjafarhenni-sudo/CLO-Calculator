var Clang = document.documentElement.lang;

var swiper_pioneer = new Swiper(".swiper-pioneer", {
    loop: true,
    slidesPerView: 1,
      spaceBetween: 30,
      /*
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },*/
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper_tabs = new Swiper(".swiper-tabs", {
    slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: true,
      /*
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },*/
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  swiper.on('slideChange', function () {
      myCallbackfunction(this);
  
    });
  
  function myCallbackfunction(data){
      console.log(data.realIndex);
      //console.log(data);
      var sideID = data.realIndex + 1;


        slideImg = $('#banner .slide_' + sideID).attr('data-img');
        var posx = $('#banner .slide_' + sideID).attr("data-x");
        var posy = $('#banner .slide_' + sideID).attr("data-y");
        console.log(sideID + '|' + slideImg);
        $('#banner .parallax-bg').css('background-image', '');
        $('#banner .parallax-bg').css('background-image', '' );
        $('#banner .parallax-bg').css('background-position', '');

        $('#banner .parallax-bg').css('background-image', 'url(' + slideImg + ')');
        $('#banner .parallax-bg').css('background-image', 'url(' + slideImg + ')' );
        $('#banner .parallax-bg').css('background-position', posx +' '+ posy);
        
  }

  var slideImg = $('#banner .swiper-slide-active').attr('data-img');
    var posx = $('#banner .swiper-slide-active').attr("data-x");
    var posy = $('#banner .swiper-slide-active').attr("data-y");
    $('#banner .parallax-bg').css('background-image', 'url(' + slideImg + ')' );
    $('#banner .parallax-bg').css('background-position', posx +' '+ posy);


if ($('#carouselExampleCaptions').length > 0) {
    //initial bg
    var slideImg = $('#banner .swiper-slide-active').attr('data-img');
    var posx = $('#banner .swiper-slide-active').attr("data-x");
    var posy = $('#banner .swiper-slide-active').attr("data-y");
    $('#banner .slideimg').css('background-image', 'url(' + slideImg + ')' );
    $('#banner .slideimg').css('background-position', posx +' '+ posy);

    //force first slide
    setTimeout(function () {
        $('#carouselExampleCaptions .carousel-control-next').click();
    }, 6000);

    $('#carouselExampleCaptions').on('slide.bs.carousel', function onSlide(ev) {


        var sideID = ev.to + 1;


        slideImg = $('#banner .slide_' + sideID).attr('data-img');
        var posx = $('#banner .slide_' + sideID).attr("data-x");
        var posy = $('#banner .slide_' + sideID).attr("data-y");
        console.log(sideID + '|' + slideImg);
        $('#banner .slideimg').css('background-image', '');
        $('#banner .slideimg').css('background-image', '' );
        $('#banner .slideimg').css('background-position', '');

        $('#banner .slideimg').css('background-image', 'url(' + slideImg + ')');
        $('#banner .slideimg').css('background-image', 'url(' + slideImg + ')' );
        $('#banner .slideimg').css('background-position', posx +' '+ posy);
    });
}

//Gallery
$(document).on('click', '.modal-image', function () {
    var source = $(this).find('img').attr("data-img");
    $("#modalImage").attr("src", '');
    $("#modalImage").attr("src", source);
    
    $("#modalText").text('');
    $("#modalText").text($(this).siblings()[0].value);

    //$("#modalImage").attr("src", $(this).attr("src").split('?')[0]);
    $("#imageModal").modal('show');
});

function galleryRefresh() {
$('#gallery .spinner').removeClass('d-none');


$.ajax({
        url: location.protocol + '//' + location.host,
        dataType: 'html',
        success: function (response) {

        setTimeout(function () {
            $('#gallery .spinner').addClass('d-none');
            $('#gallery .data-list').html(jQuery(response).find('#gallery .data-list').html());
        }, 500);
            
        }
    });


}


//Userinfo Card

$(document).on('click','.userinfocard .change-pwd', function() {
    var l = $(this);
    l.addClass('button--loading');
    var userinfocard = $(this).parents('.userinfocard');
    setTimeout(function(){
        l.removeClass('button--loading');
        userinfocard.find('.btn-slide').addClass('d-none');
        userinfocard.find('.pwd-slide').removeClass('d-none');
        userinfocard.find('.action-slide').removeClass('d-none');
    },500);
});
$(document).on('click','.userinfocard .change-mobile', function() {
    var l = $(this);
    l.addClass('button--loading');
    var userinfocard = $(this).parents('.userinfocard');
    setTimeout(function(){
        l.removeClass('button--loading');
        userinfocard.find('.btn-slide').addClass('d-none');
        userinfocard.find('.mobile-slide').removeClass('d-none');
        userinfocard.find('.action-slide').removeClass('d-none');
    },500);
});
$(document).on('click','.userinfocard .cancel', function() {
    var userinfocard = $(this).parents('.userinfocard');
    userinfocard.find('.btn-slide').removeClass('d-none');
    userinfocard.find('.pwd-slide,.mobile-slide').addClass('d-none');
    userinfocard.find('.action-slide').addClass('d-none');
});
$(document).on('click','.userinfocard .save', function() {
    var l = $(this);
    l.addClass('button--loading');
    var userinfocard = $(this).parents('.userinfocard');
    setTimeout(function(){
        l.removeClass('button--loading');
        userinfocard.find('.btn-slide').removeClass('d-none');
        userinfocard.find('.pwd-slide,.mobile-slide').addClass('d-none');
        userinfocard.find('.action-slide').addClass('d-none');
    },1500);
});


$(document).on('click','.content-review .title .btn.yes', function() {
    console.log('yes');
    $('.content-review form').removeClass('d-none');
    $('.content-review .fields.yes').removeClass('d-none');
    $('.content-review .fields.no').addClass('d-none');
    $('.content-review .fields.no input:checkbox').prop('checked', false); // Unchecks it
});

$(document).on('click','.userinfocard .change-mobile', function() {
    var l = $(this);
    l.addClass('button--loading');
    var userinfocard = $(this).parents('.userinfocard');
    setTimeout(function(){
        l.removeClass('button--loading');
        userinfocard.find('.btn-slide').addClass('d-none');
        userinfocard.find('.mobile-slide').removeClass('d-none');
        userinfocard.find('.action-slide').removeClass('d-none');
    },500);
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


function sharethis(platform) {
    let url = window.location;
    if(platform == 'twitter'){
        url = 'https://twitter.com/intent/tweet?url='+window.location;
    }
    if(platform == 'whatsup'){
        url = 'https://wa.me/?text='+window.location;
    }
    if(platform == 'facebook'){
        url = 'https://www.facebook.com/sharer/sharer.php?u='+window.location;
    }

    window.open(url, '_blank');
}
function copyurl(){
    let copyText = window.location;
    navigator.clipboard.writeText(copyText).then(() => {
    console.log("Copied to clipboard!");
    $('.copylink > .btn').toggleClass('d-none');

    setTimeout(function(){
        $('.copylink > .btn').toggleClass('d-none');
    },1000);

    }).catch(error => {
        console.error("Failed to copy: ", error);
    });
};

function applylink(targetclass=''){

    if(targetclass == 'reset'){
        $('.modal.apply .modal-body > div').addClass('hidden');
        $('.modal.apply .modal-body .Q1').removeClass('hidden');
        return;
    }

    $('.modal.apply .modal-body > div').addClass('hidden');
    $('.modal.apply .modal-body .'+targetclass).removeClass('hidden');

};

function sidemenuToggle(){
    var menucount = parseInt($('.side-colum').length);

    if(!menucount){
        $('.menu-toggle').addClass('d-none');
        return;
    }

    var w = window.innerWidth;
    if(w < 992){
        $('.side-colum').addClass('hidden');
        $('.menu-toggle').removeClass('d-none');
    }else{
        $('.side-colum').removeClass('hidden');
        $('.menu-toggle').addClass('d-none');
    }
};

$(document).on('click','.menu-toggle', function() {
    $('.side-colum').toggleClass('hidden');
});
$(document).ready(function(){
    sidemenuToggle();
});


var cw = window.innerWidth;
window.addEventListener('resize', event => {
    var nw = window.innerWidth;
    
    if(cw != nw ){

    
        setTimeout(function(){
            sidemenuToggle(event);
            console.log(cw +' | '+ nw);
        },200);
    }
  });

/********************************************************
					Accordion Menu
********************************************************/


(function($){
    $(document).ready(function(){
    $('.acc-menu li.active').parents('.has-sub').addClass('open')   
    $('.acc-menu li.active.has-sub').addClass('open').children('ul').show();
        $(document).on('click','.acc-menu li.has-sub>a', function() {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(200);
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown(200);
                element.siblings('li').children('ul').slideUp(200);
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(200);
            }
        });
    
    });
    })(jQuery);

/*
    $(window).scroll(function(){
        var scrollPos = $(document).scrollTop();
        console.log(scrollPos);
        var margin = 50 - scrollPos;
        if(scrollPos>50){
            margin = 0;
        }
        if(margin<0){
            margin = 0;
        }
        if(margin<50){
            $('.landing-page.extranav .firstNav').css({'z-index':1, 'overflow': 'hidden'});
            
            $('.landing-page.extranav #page-wrapper').css('margin-top',margin);
        }
        if(margin >= 50){
            
            setTimeout(function(){
                $('.landing-page.extranav .firstNav').css('z-index',9999);
                
            },250);
            $('.landing-page.extranav #page-wrapper').css('margin-top',margin+50);
        }
        $('.landing-page.extranav .navbar').css('margin-top',margin);
        
        

    });
*/


// Auto hide top header
    var lastScrollTop = 0;
    var run = true;
    var bottom = false;
    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.scrollHeight) {
            // you're at the bottom of the page
            console.log("you're at the bottom of the page");
             bottom = true;
        }else{
             bottom = false;
        }
    };
$(window).scroll(function(event){
    
    var scrollPos = $(document).scrollTop();
    if(!run || scrollPos < 150){
        return;
       }

   var st = $(this).scrollTop();
    var offset = st - lastScrollTop;
   if (st > lastScrollTop){
       // downscroll code
//console.log('st:'+st + 'lastScrollTop:'+ lastScrollTop);
//console.log('ot:'+ (offset));
    if(offset < 50){ // fix loop bug
        return;
    }
        run = false;
        
       
        $('.landing-page.extranav .navbar').css('margin-top',0);
        $('.landing-page.extranav .firstNav').css({ 'z-index':998, 'overflow': 'hidden'});
        $('.landing-page.extranav .navbar').css({ 'z-index':999});
        $('.landing-page.extranav #page-wrapper').css('margin-top',50);

        setTimeout(function(){
            console.log("downscroll");
            run = true;
        },100);
       
    
   } else {

    if(bottom){
        return;
    }
      // upscroll code
      
        run = false;
      
      

    $('.landing-page.extranav .navbar').css('margin-top',50);
    setTimeout(function(){
        $('.landing-page.extranav .navbar').css({ 'z-index':998});
        $('.landing-page.extranav .firstNav').css({ 'z-index':999, 'overflow': 'unset'});
        
    },100);
    $('.landing-page.extranav #page-wrapper').css('margin-top',100);
    setTimeout(function(){
        console.log("upscroll");
        run = true;
    },100);
      
   }
   lastScrollTop = st;
});

let numbersOfStudents = {
    "ar-SA": "عدد الخريجين: ", "en-US": "Number of Graduates: "
}

if ($('#student-map').length > 0) {
    if(Clang == 'ar-SA'){
        Datamap.prototype.worldTopo.objects.world = {
"type": "GeometryCollection",
"geometries": [{
    "type": "Polygon",
    "properties": {
        "name": "أفغانستان"
    },
    "id": "AFG",
    "arcs": [
        [0, 1, 2, 3, 4, 5]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "أنغولا"
    },
    "id": "AGO",
    "arcs": [
        [
            [6, 7, 8, 9]
        ],
        [
            [10, 11, 12]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ألبانيا"
    },
    "id": "ALB",
    "arcs": [
        [13, 14, 15, 16, 17]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الإمارات العربية المتحدة"
    },
    "id": "ARE",
    "arcs": [
        [18, 19, 20, 21, 22]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "الأرجنتين"
    },
    "id": "ARG",
    "arcs": [
        [
            [23, 24]
        ],
        [
            [25, 26, 27, 28, 29, 30]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "أرمينيا"
    },
    "id": "ARM",
    "arcs": [
        [31, 32, 33, 34, 35]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "أنتاركتيكا"
    },
    "id": "ATA",
    "arcs": [
        [
            [36]
        ],
        [
            [37]
        ],
        [
            [38]
        ],
        [
            [39]
        ],
        [
            [40]
        ],
        [
            [41]
        ],
        [
            [42]
        ],
        [
            [43]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "أراضي فرنسية جنوبية وأنتارتيكية"
    },
    "id": "ATF",
    "arcs": [
        [44]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "أستراليا"
    },
    "id": "AUS",
    "arcs": [
        [
            [45]
        ],
        [
            [46]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "النمسا"
    },
    "id": "AUT",
    "arcs": [
        [47, 48, 49, 50, 51, 52, 53]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "أذربيجان"
    },
    "id": "AZE",
    "arcs": [
        [
            [54, -35]
        ],
        [
            [55, 56, -33, 57, 58]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بوروندي"
    },
    "id": "BDI",
    "arcs": [
        [59, 60, 61]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بلجيكا"
    },
    "id": "BEL",
    "arcs": [
        [62, 63, 64, 65, 66]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بنين"
    },
    "id": "BEN",
    "arcs": [
        [67, 68, 69, 70, 71]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بوركينا فاسو"
    },
    "id": "BFA",
    "arcs": [
        [72, 73, 74, -70, 75, 76]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بنجلاديش"
    },
    "id": "BGD",
    "arcs": [
        [77, 78, 79]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بلغاريا"
    },
    "id": "BGR",
    "arcs": [
        [80, 81, 82, 83, 84, 85]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "البهاما"
    },
    "id": "BHS",
    "arcs": [
        [
            [86]
        ],
        [
            [87]
        ],
        [
            [88]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "البوسنة والهرسك"
    },
    "id": "BIH",
    "arcs": [
        [89, 90, 91]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "روسيا البيضاء"
    },
    "id": "BLR",
    "arcs": [
        [92, 93, 94, 95, 96]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بيليز"
    },
    "id": "BLZ",
    "arcs": [
        [97, 98, 99]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بوليفيا"
    },
    "id": "BOL",
    "arcs": [
        [100, 101, 102, 103, -31]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "البرازيل"
    },
    "id": "BRA",
    "arcs": [
        [-27, 104, -103, 105, 106, 107, 108, 109, 110, 111, 112]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بروناي دار السلام"
    },
    "id": "BRN",
    "arcs": [
        [113, 114]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بوتان"
    },
    "id": "BTN",
    "arcs": [
        [115, 116]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بوتسوانا"
    },
    "id": "BWA",
    "arcs": [
        [117, 118, 119, 120]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جمهورية إفريقيا الوسطى"
    },
    "id": "CAF",
    "arcs": [
        [121, 122, 123, 124, 125, 126, 127]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "كندا"
    },
    "id": "CAN",
    "arcs": [
        [
            [128]
        ],
        [
            [129]
        ],
        [
            [130]
        ],
        [
            [131]
        ],
        [
            [132]
        ],
        [
            [133]
        ],
        [
            [134]
        ],
        [
            [135]
        ],
        [
            [136]
        ],
        [
            [137]
        ],
        [
            [138, 139, 140, 141]
        ],
        [
            [142]
        ],
        [
            [143]
        ],
        [
            [144]
        ],
        [
            [145]
        ],
        [
            [146]
        ],
        [
            [147]
        ],
        [
            [148]
        ],
        [
            [149]
        ],
        [
            [150]
        ],
        [
            [151]
        ],
        [
            [152]
        ],
        [
            [153]
        ],
        [
            [154]
        ],
        [
            [155]
        ],
        [
            [156]
        ],
        [
            [157]
        ],
        [
            [158]
        ],
        [
            [159]
        ],
        [
            [160]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سويسرا"
    },
    "id": "CHE",
    "arcs": [
        [-51, 161, 162, 163]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "تشيلي"
    },
    "id": "CHL",
    "arcs": [
        [
            [-24, 164]
        ],
        [
            [-30, 165, 166, -101]
        ]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "الصين"
    },
    "id": "CHN",
    "arcs": [
        [
            [167]
        ],
        [
            [168, 169, 170, 171, 172, 173, -117, 174, 175, 176, 177, -4, 178, 179, 180, 181, 182, 183]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ساحل العاج"
    },
    "id": "CIV",
    "arcs": [
        [184, 185, 186, 187, -73, 188]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الكاميرون"
    },
    "id": "CMR",
    "arcs": [
        [189, 190, 191, 192, 193, 194, -128, 195]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جمهورية الكونغو الديمقراطية"
    },
    "id": "COD",
    "arcs": [
        [196, 197, -60, 198, 199, -10, 200, -13, 201, -126, 202]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الكونغو"
    },
    "id": "COG",
    "arcs": [
        [-12, 203, 204, -196, -127, -202]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كولومبيا"
    },
    "id": "COL",
    "arcs": [
        [205, 206, 207, 208, 209, -107, 210]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كوستاريكا"
    },
    "id": "CRI",
    "arcs": [
        [211, 212, 213, 214]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كوبا"
    },
    "id": "CUB",
    "arcs": [
        [215]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "شمال قبرص"
    },
    "id": "-99",
    "arcs": [
        [216, 217]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "قبرص"
    },
    "id": "CYP",
    "arcs": [
        [218, -218]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تشيكيا"
    },
    "id": "CZE",
    "arcs": [
        [-53, 219, 220, 221]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ألمانيا"
    },
    "id": "DEU",
    "arcs": [
        [222, 223, -220, -52, -164, 224, 225, -64, 226, 227, 228]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جيبوتي"
    },
    "id": "DJI",
    "arcs": [
        [229, 230, 231, 232]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "الدنمارك"
    },
    "id": "DNK",
    "arcs": [
        [
            [233]
        ],
        [
            [-229, 234]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جمهورية الدومينيكان"
    },
    "id": "DOM",
    "arcs": [
        [235, 236]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الجزائر"
    },
    "id": "DZA",
    "arcs": [
        [237, 238, 239, 240, 241, 242, 243, 244]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الاكوادور"
    },
    "id": "ECU",
    "arcs": [
        [245, -206, 246]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مصر"
    },
    "id": "EGY",
    "arcs": [
        [247, 248, 249, 250, 251]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إرتريا"
    },
    "id": "ERI",
    "arcs": [
        [252, 253, 254, -233]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إسبانيا"
    },
    "id": "ESP",
    "arcs": [
        [255, 256, 257, 258]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إستونيا"
    },
    "id": "EST",
    "arcs": [
        [259, 260, 261]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إثيوبيا"
    },
    "id": "ETH",
    "arcs": [
        [-232, 262, 263, 264, 265, 266, 267, -253]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "فنلندا"
    },
    "id": "FIN",
    "arcs": [
        [268, 269, 270, 271]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "فيجي"
    },
    "id": "FJI",
    "arcs": [
        [
            [272]
        ],
        [
            [273, 274]
        ],
        [
            [275, -275]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جزر فوكلاند"
    },
    "id": "FLK",
    "arcs": [
        [276]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "فرنسا"
    },
    "id": "FRA",
    "arcs": [
        [
            [277]
        ],
        [
            [278, -225, -163, 279, 280, -257, 281, -66]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غينيا الفرنسية"
    },
    "id": "GUF",
    "arcs": [
        [282, 283, 284, 285, -111]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الغابون"
    },
    "id": "GAB",
    "arcs": [
        [286, 287, -190, -205]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "المملكة المتحدة"
    },
    "id": "GBR",
    "arcs": [
        [
            [288, 289]
        ],
        [
            [290]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جورجيا"
    },
    "id": "GEO",
    "arcs": [
        [291, 292, -58, -32, 293]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غانا"
    },
    "id": "GHA",
    "arcs": [
        [294, -189, -77, 295]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غينيا"
    },
    "id": "GIN",
    "arcs": [
        [296, 297, 298, 299, 300, 301, -187]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جامبيا"
    },
    "id": "GMB",
    "arcs": [
        [302, 303]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غينيا بيساو"
    },
    "id": "GNB",
    "arcs": [
        [304, 305, -300]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غينيا الاستوائية"
    },
    "id": "GNQ",
    "arcs": [
        [306, -191, -288]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "اليونان"
    },
    "id": "GRC",
    "arcs": [
        [
            [307]
        ],
        [
            [308, -15, 309, -84, 310]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جرينلاند"
    },
    "id": "GRL",
    "arcs": [
        [311]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غواتيمالا"
    },
    "id": "GTM",
    "arcs": [
        [312, 313, -100, 314, 315, 316]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "غيانا"
    },
    "id": "GUY",
    "arcs": [
        [317, 318, -109, 319]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "هندوراس"
    },
    "id": "HND",
    "arcs": [
        [320, 321, -316, 322, 323]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كرواتيا"
    },
    "id": "HRV",
    "arcs": [
        [324, -92, 325, 326, 327, 328]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "هايتي"
    },
    "id": "HTI",
    "arcs": [
        [-237, 329]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "المجر"
    },
    "id": "HUN",
    "arcs": [
        [-48, 330, 331, 332, 333, -329, 334]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "إندونيسيا"
    },
    "id": "IDN",
    "arcs": [
        [
            [335]
        ],
        [
            [336, 337]
        ],
        [
            [338]
        ],
        [
            [339]
        ],
        [
            [340]
        ],
        [
            [341]
        ],
        [
            [342]
        ],
        [
            [343]
        ],
        [
            [344, 345]
        ],
        [
            [346]
        ],
        [
            [347]
        ],
        [
            [348, 349]
        ],
        [
            [350]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الهند"
    },
    "id": "IND",
    "arcs": [
        [-177, 351, -175, -116, -174, 352, -80, 353, 354]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إيرلندا"
    },
    "id": "IRL",
    "arcs": [
        [355, -289]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إيران"
    },
    "id": "IRN",
    "arcs": [
        [356, -6, 357, 358, 359, 360, -55, -34, -57, 361]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "العراق"
    },
    "id": "IRQ",
    "arcs": [
        [362, 363, 364, 365, 366, 367, -360]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "آيسلندا"
    },
    "id": "ISL",
    "arcs": [
        [368]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "فلسطين"
    },
    "id": "PSE",
    "arcs": [
        [369, 370, 371, -252, 372, 373, 374]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "إيطاليا"
    },
    "id": "ITA",
    "arcs": [
        [
            [375]
        ],
        [
            [376]
        ],
        [
            [377, 378, -280, -162, -50]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جامايكا"
    },
    "id": "JAM",
    "arcs": [
        [379]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الأردن"
    },
    "id": "JOR",
    "arcs": [
        [-370, 380, -366, 381, 382, -372, 383]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "اليابان"
    },
    "id": "JPN",
    "arcs": [
        [
            [384]
        ],
        [
            [385]
        ],
        [
            [386]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كازاخستان"
    },
    "id": "KAZ",
    "arcs": [
        [387, 388, 389, 390, -181, 391]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كينيا"
    },
    "id": "KEN",
    "arcs": [
        [392, 393, 394, 395, -265, 396]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "قرغيزستان"
    },
    "id": "KGZ",
    "arcs": [
        [-392, -180, 397, 398]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كمبوديا"
    },
    "id": "KHM",
    "arcs": [
        [399, 400, 401, 402]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كوريا الجنوبية"
    },
    "id": "KOR",
    "arcs": [
        [403, 404]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كوسوفو"
    },
    "id": "-99",
    "arcs": [
        [-18, 405, 406, 407]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الكويت"
    },
    "id": "KWT",
    "arcs": [
        [408, 409, -364]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "لاوس"
    },
    "id": "LAO",
    "arcs": [
        [410, 411, -172, 412, -401]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "لبنان"
    },
    "id": "LBN",
    "arcs": [
        [-374, 413, 414]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ليبيريا"
    },
    "id": "LBR",
    "arcs": [
        [415, 416, -297, -186]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ليبيا"
    },
    "id": "LBY",
    "arcs": [
        [417, -245, 418, 419, -250, 420, 421]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سريلانكا"
    },
    "id": "LKA",
    "arcs": [
        [422]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ليسوتو"
    },
    "id": "LSO",
    "arcs": [
        [423]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ليتوانيا"
    },
    "id": "LTU",
    "arcs": [
        [424, 425, 426, -93, 427]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "لوكسمبورغ"
    },
    "id": "LUX",
    "arcs": [
        [-226, -279, -65]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "لاتفيا"
    },
    "id": "LVA",
    "arcs": [
        [428, -262, 429, -94, -427]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "المغرب"
    },
    "id": "MAR",
    "arcs": [
        [-242, 430, 431],
        [-241, -458, 537, -431]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مولدوفا"
    },
    "id": "MDA",
    "arcs": [
        [432, 433]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مدغشقر"
    },
    "id": "MDG",
    "arcs": [
        [434]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "المكسيك"
    },
    "id": "MEX",
    "arcs": [
        [435, -98, -314, 436, 437]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مقدونيا الشمالية"
    },
    "id": "MKD",
    "arcs": [
        [-408, 438, -85, -310, -14]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مالي"
    },
    "id": "MLI",
    "arcs": [
        [439, -239, 440, -74, -188, -302, 441]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ميانمار"
    },
    "id": "MMR",
    "arcs": [
        [442, -78, -353, -173, -412, 443]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الجبل الأسود"
    },
    "id": "MNE",
    "arcs": [
        [444, -326, -91, 445, -406, -17]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "منغوليا"
    },
    "id": "MNG",
    "arcs": [
        [446, -183]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "موزمبيق"
    },
    "id": "MOZ",
    "arcs": [
        [447, 448, 449, 450, 451, 452, 453, 454]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "موريتانيا"
    },
    "id": "MRT",
    "arcs": [
        [455, 456, 457, -240, -440]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "مالاوي"
    },
    "id": "MWI",
    "arcs": [
        [-455, 458, 459]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "ماليزيا"
    },
    "id": "MYS",
    "arcs": [
        [
            [460, 461]
        ],
        [
            [-349, 462, -115, 463]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ناميبيا"
    },
    "id": "NAM",
    "arcs": [
        [464, -8, 465, -119, 466]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كاليدونيا الجديدة"
    },
    "id": "NCL",
    "arcs": [
        [467]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "النيجر"
    },
    "id": "NER",
    "arcs": [
        [-75, -441, -238, -418, 468, -194, 469, -71]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "نيجيريا"
    },
    "id": "NGA",
    "arcs": [
        [470, -72, -470, -193]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "نيكاراجوا"
    },
    "id": "NIC",
    "arcs": [
        [471, -324, 472, -213]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "هولندا"
    },
    "id": "NLD",
    "arcs": [
        [-227, -63, 473]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "النرويج"
    },
    "id": "NOR",
    "arcs": [
        [
            [474, -272, 475, 476]
        ],
        [
            [477]
        ],
        [
            [478]
        ],
        [
            [479]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "نيبال"
    },
    "id": "NPL",
    "arcs": [
        [-352, -176]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "نيوزيلندا"
    },
    "id": "NZL",
    "arcs": [
        [
            [480]
        ],
        [
            [481]
        ]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "سلطنة عمان"
    },
    "id": "OMN",
    "arcs": [
        [
            [482, 483, -22, 484]
        ],
        [
            [-20, 485]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "باكستان"
    },
    "id": "PAK",
    "arcs": [
        [-178, -355, 486, -358, -5]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بنما"
    },
    "id": "PAN",
    "arcs": [
        [487, -215, 488, -208]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بيرو"
    },
    "id": "PER",
    "arcs": [
        [-167, 489, -247, -211, -106, -102]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "الفلبين"
    },
    "id": "PHL",
    "arcs": [
        [
            [490]
        ],
        [
            [491]
        ],
        [
            [492]
        ],
        [
            [493]
        ],
        [
            [494]
        ],
        [
            [495]
        ],
        [
            [496]
        ]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "بابوا غينيا الجديدة"
    },
    "id": "PNG",
    "arcs": [
        [
            [497]
        ],
        [
            [498]
        ],
        [
            [-345, 499]
        ],
        [
            [500]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بولندا"
    },
    "id": "POL",
    "arcs": [
        [-224, 501, 502, -428, -97, 503, 504, -221]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "بورتوريكو"
    },
    "id": "PRI",
    "arcs": [
        [505]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "كوريا الشمالية"
    },
    "id": "PRK",
    "arcs": [
        [506, 507, -405, 508, -169]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "البرتغال"
    },
    "id": "PRT",
    "arcs": [
        [-259, 509]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "باراغواي"
    },
    "id": "PRY",
    "arcs": [
        [-104, -105, -26]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "قطر"
    },
    "id": "QAT",
    "arcs": [
        [510, 511]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "رومانيا"
    },
    "id": "ROU",
    "arcs": [
        [512, -434, 513, 514, -81, 515, -333]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "روسيا"
    },
    "id": "RUS",
    "arcs": [
        [
            [516]
        ],
        [
            [-503, 517, -425]
        ],
        [
            [518, 519]
        ],
        [
            [520]
        ],
        [
            [521]
        ],
        [
            [522]
        ],
        [
            [523]
        ],
        [
            [524]
        ],
        [
            [525]
        ],
        [
            [526, -507, -184, -447, -182, -391, 527, -59, -293, 528, 529, -95, -430, -261, 530, -269, -475, 531, -520]
        ],
        [
            [532]
        ],
        [
            [533]
        ],
        [
            [534]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "رواندا"
    },
    "id": "RWA",
    "arcs": [
        [535, -61, -198, 536]
    ]
}/*, {
    "type": "Polygon",
    "properties": {
        "name": *"الجمهورية الصحراوية الديمقراطية"
    },
    "id": "ESH",
    "arcs": [
        [-241, -458, 537, -431]
    ]
}*/, {
    "type": "Polygon",
    "properties": {
        "name": "المملكة العربية السعودية"
    },
    "id": "SAU",
    "arcs": [
        [538, -382, -365, -410, 539, -512, 540, -23, -484, 541]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "السودان"
    },
    "id": "SDN",
    "arcs": [
        [542, 543, -123, 544, -421, -249, 545, -254, -268, 546]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جنوب السودان"
    },
    "id": "SSD",
    "arcs": [
        [547, -266, -396, 548, -203, -125, 549, -543]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "السنغال"
    },
    "id": "SEN",
    "arcs": [
        [550, -456, -442, -301, -306, 551, -304]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "جزر سليمان"
    },
    "id": "SLB",
    "arcs": [
        [
            [552]
        ],
        [
            [553]
        ],
        [
            [554]
        ],
        [
            [555]
        ],
        [
            [556]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سيراليون"
    },
    "id": "SLE",
    "arcs": [
        [557, -298, -417]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "السلفادور"
    },
    "id": "SLV",
    "arcs": [
        [558, -317, -322]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الصومال"
    },
    "id": "SOM",
    "arcs": [
        [-397, -264, -263, -231, 559, 561]
                ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "صربيا"
    },
    "id": "SRB",
    "arcs": [
        [-86, -439, -407, -446, -90, -325, -334, -516]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سورينام"
    },
    "id": "SUR",
    "arcs": [
        [562, -285, 563, -283, -110, -319]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سلوفاكيا"
    },
    "id": "SVK",
    "arcs": [
        [-505, 564, -331, -54, -222]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سلوفينيا"
    },
    "id": "SVN",
    "arcs": [
        [-49, -335, -328, 565, -378]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "السويد"
    },
    "id": "SWE",
    "arcs": [
        [-476, -271, 566]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "إسواتيني"
    },
    "id": "SWZ",
    "arcs": [
        [567, -451]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "سوريا"
    },
    "id": "SYR",
    "arcs": [
        [-381, -375, -415, 568, 569, -367]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تشاد"
    },
    "id": "TCD",
    "arcs": [
        [-469, -422, -545, -122, -195]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "توغو"
    },
    "id": "TGO",
    "arcs": [
        [570, -296, -76, -69]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تايلاند"
    },
    "id": "THA",
    "arcs": [
        [571, -462, 572, -444, -411, -400]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "طاجيكستان"
    },
    "id": "TJK",
    "arcs": [
        [-398, -179, -3, 573]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تركمانستان"
    },
    "id": "TKM",
    "arcs": [
        [-357, 574, -389, 575, -1]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تيمور الشرقية"
    },
    "id": "TLS",
    "arcs": [
        [576, -337]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "ترينيداد وتوباغو"
    },
    "id": "TTO",
    "arcs": [
        [577]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تونس"
    },
    "id": "TUN",
    "arcs": [
        [-244, 578, -419]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "تركيا"
    },
    "id": "TUR",
    "arcs": [
        [
            [-294, -36, -361, -368, -570, 579]
        ],
        [
            [-311, -83, 580]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تايوان"
    },
    "id": "TWN",
    "arcs": [
        [581]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "تنزانيا"
    },
    "id": "TZA",
    "arcs": [
        [-394, 582, -448, -460, 583, -199, -62, -536, 584]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "أوغندا"
    },
    "id": "UGA",
    "arcs": [
        [-537, -197, -549, -395, -585]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "أوكرانيا"
    },
    "id": "UKR",
    "arcs": [
        [-530, 585, -514, -433, -513, -332, -565, -504, -96]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الأوروغواي"
    },
    "id": "URY",
    "arcs": [
        [-113, 586, -28]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "الولايات المتحدة الأمريكية"
    },
    "id": "USA",
    "arcs": [
        [
            [587]
        ],
        [
            [588]
        ],
        [
            [589]
        ],
        [
            [590]
        ],
        [
            [591]
        ],
        [
            [592, -438, 593, -139]
        ],
        [
            [594]
        ],
        [
            [595]
        ],
        [
            [596]
        ],
        [
            [-141, 597]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "أوزبكستان"
    },
    "id": "UZB",
    "arcs": [
        [-576, -388, -399, -574, -2]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "فنزويلا"
    },
    "id": "VEN",
    "arcs": [
        [598, -320, -108, -210]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "فيتنام"
    },
    "id": "VNM",
    "arcs": [
        [599, -402, -413, -171]
    ]
}, {
    "type": "MultiPolygon",
    "properties": {
        "name": "فانواتو"
    },
    "id": "VUT",
    "arcs": [
        [
            [600]
        ],
        [
            [601]
        ]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "الضفة الغربية وقطاع غزة"
    },
    "id": "PSE",
    "arcs": [
        [-384, -371]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "اليمن"
    },
    "id": "YEM",
    "arcs": [
        [602, -542, -483]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "جنوب أفريقيا"
    },
    "id": "ZAF",
    "arcs": [
        [-467, -118, 603, -452, -568, -450, 604],
        [-424]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "زامبيا"
    },
    "id": "ZMB",
    "arcs": [
        [-459, -454, 605, -120, -466, -7, -200, -584]
    ]
}, {
    "type": "Polygon",
    "properties": {
        "name": "زيمبابوي"
    },
    "id": "ZWE",
    "arcs": [
        [-604, -121, -606, -453]
    ]
}]
}


    }
    else{
        Datamap.prototype.worldTopo.objects.world.geometries[79].properties.name = "Palestine";
        Datamap.prototype.worldTopo.objects.world.geometries[79].id = "PSE";
        Datamap.prototype.worldTopo.objects.world.geometries[145] = {};   
        Datamap.prototype.worldTopo.objects.world.geometries[146].arcs = [[-397, -264, -263, -231, 559, 561]];  

    }

    // map
    var map = new Datamap({
        element: document.getElementById("student-map"),
        responsive: true,
        geographyConfig: {
            highlightFillColor: "#bc9b4b",
            highlightBorderWidth: 0,
            borderColor: '#ADB3BC',
            popupTemplate: function (geo, data) {
                return data
                    ? [
                        '<div class="hoverinfo"><h6>',
                        geo.properties.name,
                        "</h6><span>",
                        numbersOfStudents[Clang] + data.numberOfStudents,
                        "</span>",
                        "</div>",
                    ].join("")
                    : [
                        '<div class="hoverinfo"><h6>',
                        geo.properties.name,
                        "</h6><span>",
                        numbersOfStudents[Clang] + 0,
                        "</span>",
                        "</div>",
                    ].join("");
            },
        },
        fills: {
            defaultFill: '#dbdad6'
        },

        data: {
            SAU: {
                numberOfStudents: 47056
            },
            JOR: {
                numberOfStudents: 941
            },
            AFG: {
                numberOfStudents: 1357
            },
            ARE: {
                numberOfStudents: 192
            },
            IDN: {
                numberOfStudents: 3355
            },
            IRN: {
                numberOfStudents: 326
            },
            PAK: {
                numberOfStudents: 2368
            },
            BHR: {
                numberOfStudents: 344
            },
            BRN: {
                numberOfStudents: 5
            },
            BGD: {
                numberOfStudents: 1232
            },
            MMR: {
                numberOfStudents: 202
            },
            THA: {
                numberOfStudents: 886
            },
            TWN: {
                numberOfStudents: 19
            },
            SGP: {
                numberOfStudents: 1
            },
            SYR: {
                numberOfStudents: 950
            },
            LKA: {
                numberOfStudents: 538
            },
            CHN: {
                numberOfStudents: 1334
            },
            IRQ: {
                numberOfStudents: 423
            },
            OMN: {
                numberOfStudents: 355
            },
            PSE: {
                numberOfStudents: 497
            },
            SVR: {
                numberOfStudents: 98
            },
            PHL: {
                numberOfStudents: 1071
            },
            QAT: {
                numberOfStudents: 97
            },
            KHM: {
                numberOfStudents: 336
            },
            KOR: {
                numberOfStudents: 14
            },
            KWT: {
                numberOfStudents: 608
            },
            LBN: {
                numberOfStudents: 297
            },
            MDV: {
                numberOfStudents: 294
            },
            MYS: {
                numberOfStudents: 1073
            },
            NPL: {
                numberOfStudents: 437
            },
            IND: {
                numberOfStudents: 2165
            },
            JPN: {
                numberOfStudents: 9
            },
            YEM: {
                numberOfStudents: 2636
            },
            LAO: {
                numberOfStudents: 3
            },
            ETH: {
                numberOfStudents: 660
            },
            ERI: {
                numberOfStudents: 575
            },
            CAF: {
                numberOfStudents: 147
            },
            AGO: {
                numberOfStudents: 40
            },
            BEN: {
                numberOfStudents: 467
            },
            BFA: {
                numberOfStudents: 646
            },
            BDI: {
                numberOfStudents: 155
            },
            BWA: {
                numberOfStudents: 12
            },
            TCD: {
                numberOfStudents: 537
            },
            TZA: {
                numberOfStudents: 437
            },
            TGO: {
                numberOfStudents: 401
            },
            TUN: {
                numberOfStudents: 261
            },
            GAB: {
                numberOfStudents: 87
            },
            DZA: {
                numberOfStudents: 890
            },
            COM: {
                numberOfStudents: 520
            },
            ZAF: {
                numberOfStudents: 193
            },
            DJI: {
                numberOfStudents: 181
            },
            CPV: {
                numberOfStudents: 3
            },
            RWA: {
                numberOfStudents: 177
            },
            COD: {
                numberOfStudents: 85
            },
            RNR: {
                numberOfStudents: 58
            },
            ZWE: {
                numberOfStudents: 99
            },
            CIV: {
                numberOfStudents: 735
            },
            SDN: {
                numberOfStudents: 17
            },
            SEN: {
                numberOfStudents: 880
            },
            SYC: {
                numberOfStudents: 22
            },
            SLE: {
                numberOfStudents: 474
            },
            SOM: {
                numberOfStudents: 787
            },
            GMB: {
                numberOfStudents: 489
            },
            GHA: {
                numberOfStudents: 691
            },
            GIN: {
                numberOfStudents: 782
            },
            GNQ: {
                numberOfStudents: 11
            },
            GNB: {
                numberOfStudents: 214
            },
            CMR: {
                numberOfStudents: 176
            },
            KEN: {
                numberOfStudents: 800
            },
            LBY: {
                numberOfStudents: 394
            },
            LBR: {
                numberOfStudents: 183
            },
            LSO: {
                numberOfStudents: 14
            },
            MLI: {
                numberOfStudents: 1004
            },
            MWI: {
                numberOfStudents: 156
            },
            MDG: {
                numberOfStudents: 148
            },
            EGY: {
                numberOfStudents: 1068
            },
            MAR: {
                numberOfStudents: 810
            },
            MRT: {
                numberOfStudents: 695
            },
            MUS: {
                numberOfStudents: 119
            },
            MOZ: {
                numberOfStudents: 144
            },
            NAM: {
                numberOfStudents: 10
            },
            NER: {
                numberOfStudents: 331
            },
            NGA: {
                numberOfStudents: 2038
            },
            UGA: {
                numberOfStudents: 568
            },
            ARG: {
                numberOfStudents: 7
            },
            ESP: {
                numberOfStudents: 51
            },
            AUS: {
                numberOfStudents: 105
            },
            EST: {
                numberOfStudents: 4
            },
            AZE: {
                numberOfStudents: 118
            },
            ECU: {
                numberOfStudents: 2
            },
            ALB: {
                numberOfStudents: 211
            },
            DEU: {
                numberOfStudents: 115
            },
            URY: {
                numberOfStudents: 2
            },
            UZB: {
                numberOfStudents: 151
            },
            UKR: {
                numberOfStudents: 27
            },
            IRL: {
                numberOfStudents: 15
            },
            ITA: {
                numberOfStudents: 22
            },
            PRT: {
                numberOfStudents: 27
            },
            GBR: {
                numberOfStudents: 344
            },
            BEL: {
                numberOfStudents: 94
            },
            BGR: {
                numberOfStudents: 50
            },
            BHS: {
                numberOfStudents: 5
            },
            BIH: {
                numberOfStudents: 203
            },
            POL: {
                numberOfStudents: 6
            },
            BOL: {
                numberOfStudents: 5
            },
            PER: {
                numberOfStudents: 5
            },
            SRB: {
                numberOfStudents: 66
            },
            TKM: {
                numberOfStudents: 22
            },
            TUR: {
                numberOfStudents: 549
            },
            TTO: {
                numberOfStudents: 48
            },
            CZE: {
                numberOfStudents: 4
            },
            JAM: {
                numberOfStudents: 17
            },
            GTM: {
                numberOfStudents: 2
            },
            GEO: {
                numberOfStudents: 25
            },
            GUY: {
                numberOfStudents: 90
            },
            DNK: {
                numberOfStudents: 43
            },
            RUS: {
                numberOfStudents: 714
            },
            ROU: {
                numberOfStudents: 11
            },
            SVN: {
                numberOfStudents: 2
            },
            SUR: {
                numberOfStudents: 17
            },
            SWE: {
                numberOfStudents: 57
            },
            CHL: {
                numberOfStudents: 2
            },
            TJK: {
                numberOfStudents: 2
            },
            FRA: {
                numberOfStudents: 402
            },
            VEN: {
                numberOfStudents: 20
            },
            FIN: {
                numberOfStudents: 24
            },
            FJI: {
                numberOfStudents: 20
            },
            CYP: {
                numberOfStudents: 4
            },
            KGZ: {
                numberOfStudents: 308
            },
            KAZ: {
                numberOfStudents: 221
            },
            CAN: {
                numberOfStudents: 178
            },
            CUB: {
                numberOfStudents: 1
            },
            LVA: {
                numberOfStudents: 4
            },
            LUX: {
                numberOfStudents: 2
            },
            HUN: {
                numberOfStudents: 1
            },
            MKD: {
                numberOfStudents: 136
            },
            MEX: {
                numberOfStudents: 5
            },
            MNG: {
                numberOfStudents: 9
            },
            NOR: {
                numberOfStudents: 46
            },
            AUT: {
                numberOfStudents: 29
            },
            NIC: {
                numberOfStudents: 1
            },
            NZL: {
                numberOfStudents: 11
            },
            HTI: {
                numberOfStudents: 2
            },
            HND: {
                numberOfStudents: 1
            },
            NLD: {
                numberOfStudents: 152
            },
            USA: {
                numberOfStudents: 333
            },
            YUG: {
                numberOfStudents: 193
            },
            GRC: {
                numberOfStudents: 54
            },
            BRA: {
                numberOfStudents: 35
            },
            BLZ: {
                numberOfStudents: 2
            },
            DOM: {
                numberOfStudents: 2
            },
            LCA: {
                numberOfStudents: 1
            },
            REU: {
                numberOfStudents: 10
            },
            MYT: {
                numberOfStudents: 9
            },
            HRV: {
                numberOfStudents: 1
            },
            COL: {
                numberOfStudents: 10
            },
            XXK: {
                numberOfStudents: 163
            },
            MDA: {
                numberOfStudents: 2
            },
            BLR: {
                numberOfStudents: 8
            },
            MNE: {
                numberOfStudents: 27
            },
            SVK: {
                numberOfStudents: 1
            }
            ,
        }
    });
    map.legend();


}
/// footer
