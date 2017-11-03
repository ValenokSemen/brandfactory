jQuery.noConflict()(function($){
"use strict";

var onReady = {
        init: function(){
            widgets.init();
        }
    };

var onLoad = {
        init: function(){
            widgets.charts();           
        }
};

var widgets = {
        init: function() {
            
            // CHARTS
                jQuery('.chart-shortcode').each(function(){
                    jQuery(this).easyPieChart({
                        animate: 1000,
                        lineCap: 'round',
                        lineWidth: jQuery(this).attr('data-linewidth'),
                        size: jQuery(this).attr('data-size'),
                        barColor: jQuery(this).attr('data-barcolor'),
                        trackColor: jQuery(this).attr('data-trackcolor'),
                        scaleColor: 'transparent'
                    });
                });
            
        },

        charts: function() {
            widgets.animateCharts();
        },
        animateCharts: function() {
            jQuery('.chart-shortcode').each(function(){
                var chart = jQuery(this);
                chart.appear(function() {
                    if (!jQuery(this).hasClass('animated')) {
                        jQuery(this).addClass('animated');
                        var animatePercentage = parseInt(jQuery(this).attr('data-animatepercent'), 10);
                        jQuery(this).data('easyPieChart').update(animatePercentage);
                    }
                });
            });
        }
};

/* Tabs */
jQuery('.shortcode_tabs').each(function(index) {
    var i = 1;
    jQuery('.shortcode_tab_item_title').each(function(
        index) {
        jQuery(this).addClass('it' + i);
        jQuery(this).attr('whatopen', 'body' + i);
        jQuery(this).addClass('head' + i);
        jQuery(this).parents('.shortcode_tabs').find(
            '.all_heads_cont').append(this);
        i++;
    });
    var i = 1;
    jQuery('.shortcode_tab_item_body').each(function(
        index) {
        jQuery(this).addClass('body' + i);
        jQuery(this).addClass('it' + i);
        jQuery(this).parents('.shortcode_tabs').find(
            '.all_body_cont').append(this);
        i++;
    });
});
jQuery('.shortcode_tabs .all_body_cont div:first-child')
    .addClass('active');
jQuery(
    '.shortcode_tabs .all_heads_cont div:first-child').addClass(
    'active');

jQuery('.shortcode_tab_item_title').on('click', function() {
    jQuery(this).parents('.shortcode_tabs').find(
        '.shortcode_tab_item_body').removeClass('active');
    jQuery(this).parents('.shortcode_tabs').find(
        '.shortcode_tab_item_title').removeClass('active');
    var whatopen = jQuery(this).attr('data-open');
    jQuery(this).parents('.shortcode_tabs').find('.' +
        whatopen).addClass('active');
    jQuery(this).addClass('active');
});
/* Tabs */

/* Tooltip  */
jQuery(function($) {
    $('.tooltip_s').tooltip()
});
/* Tooltip  */

/* Testimonials */
jQuery('.bxslider').bxSlider({
    mode: 'fade',
    touchEnabled: true,
    oneToOneTouch: true,
    pagerCustom: '.bx-pager',
    nextSelector: '.bx-next',
    prevSelector: '.bx-prev',
    auto: true
});

/* Testimonials */

/* Video Parallax */
$(document).ready(function() {
    $('a').nivoLightbox();
});
/* Video Parallax */

/* Portfolio & Portfolio Filter */
$(window).load(function() {
    $('.grid').isotope({
        // options...
        itemSelector: '.grid-item',
    });

    var $container = $('.js-isotope');
    $container.isotope({
        filter: '*',
        layoutMode: 'sloppyMasonry',
    });
    $('.filter-button-group div').on('click', function() {
        $('.filter-button-group .cbp-filter-item-active').removeClass('cbp-filter-item-active');
        $(this).addClass('cbp-filter-item-active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
});
/* Portfolio & Portfolio Filter */
jQuery(document).ready(onReady.init);
jQuery(window).load(onLoad.init);

});