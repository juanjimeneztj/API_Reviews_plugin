/*
    gswebReviews.js - https://juanjimeneztj.com
    Licensed under the MIT license - http://opensource.org/licenses/MIT
    Copyright (c) 2020 Juan jimenez
    Sys Reviews API REST created by Juan Jiménez.
    API REST to deploy Reviews.
    Version     : 1.0.0
*/

(function( $ ){
    "use strict";
  
    $.fn.gswebReviews = function( options ) {
  
        // Defaults
        let settings = $.extend({
            'fixed'             : false,
            'API_url'           : 'https://juanjimeneztj.com/projects/ReviewsSys/public/api',
            'API_key'           : null
        }, options);
    
        let $this = $(this), $settings = settings, txt;

        let css="@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');#gsweb_Content_Reviews,#gsweb_Content_Reviews *{box-sizing: border-box;font-family: 'Roboto', sans-serif;}#gsweb_Content_Reviews{background: #fff;display: flex;flex-direction: column;margin: 0 auto;max-width: 600px;width: 100%;}#gsweb_Content_Reviews > .gsweb-Review-Item{display: block;border-bottom: 1px solid #ccc;padding: 20px;}#gsweb_Content_Reviews > .gsweb-Review-Item:last-of-type{border: none;}#gsweb_Content_Reviews > .gsweb-Review-Item > .stars{display: inline-block;text-align: left;vertical-align: middle;max-width: 100px;width: 100%;}#gsweb_Content_Reviews > .gsweb-Review-Item > .stars > img{height: auto!important;max-width: 16px!important;width: 100%!important;}#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-reviews-intro{display: inline-block;font-size: 14px;line-height: 16px;margin-left: 15px;font-style: italic;text-align: center;vertical-align: middle;}#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-reviews-intro a,#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-reviews-intro a:visited{text-decoration: none;}#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-reviews-intro a:hover{text-decoration: underline;}#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-review-item-description{font-size: 14px;line-height: 20px;}@media all and (max-width: 500px){#gsweb_Content_Reviews > .gsweb-Review-Item > .stars,#gsweb_Content_Reviews > .gsweb-Review-Item > .gsweb-reviews-intro{display: block;max-width: 100%;text-align: center;margin: 15px auto;}#gsweb_Content_Reviews > .gsweb-Review-Item > .stars{margin-top: 0;}}";
        
        let head = document.head || document.getElementsByTagName('head')[0],style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        $('head').append("<style>"+css+"</style>");

        $.ajax({
            url: $settings.API_url,
            type: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                API_key: $settings.API_key
            },
            success: function(data,textStatus,xhr){
                $this.html('<div id="gsweb_Content_Reviews"></div>');
                data['comments'].forEach(comment => {
                    txt='<div class="gsweb-Review-Item"><div class="stars">';
                    for(let n=0;n<comment.stars;n++){
                        txt+='<img src="https://juanjimeneztj.com/projects/ReviewsSys/public/img/star.png" alt="Star">';
                    }
                    txt+='</div><p class="gsweb-reviews-intro"><span class="gsweb-review-item-date">'+comment.date+'</span>';
                    if(comment.author != null){
                        txt+=' by <span class="gsweb-review-item-author">'+comment.author+'</span>';
                    }
                    if(comment.text_link != null){
                        txt+=' on <span class="gsweb-review-item-link"><a href="'+comment.text_link_url+'" target="_blank">'+comment.text_link+'</a></span>';
                    }
                    txt+='</p><div class="gsweb-review-item-description">'+comment.description+'</div></div>';
                    $('#gsweb_Content_Reviews').prepend(txt);
                });
            },
            error: function(xhr,textStatus,errorThrown){
                $this.html('Error Something');
            }
        });
    };
})( jQuery );