/**
* quickBox 0.3.0
* Nazar Tokar / Ukraine
* dedushka.org/tag/quickbox
* Copyright 2012-2013
**/

(function QuickBox(){
	function imgShow(url, ttl, crnt) {
		jQuery("#sshow_imgs a").removeClass("sshow_act");
		jQuery("a[rel='"+crnt+"']").addClass("sshow_act");	
		img = new Image();
		img.src = url;
		
		jQuery(img).load(function(){
			imgLoaded(url, ttl);
			img_width = img.width + 30;
			img_height = img.height + 70;		
			var nx_x = ((jQuery(window).width()) - img_width)/2;		
			jQuery("#sshow_img").attr("rel", crnt);		
			jQuery("#sshow").animate({marginLeft:nx_x, width: img_width},300);
			jQuery("#sshow").css("height", img_height);
		});
	}

	function imgLoaded(url, ttl) {
		jQuery("#sshow_img").fadeOut("fast", function(){
			jQuery('#sshow_img').html('<img src="'+url+'">');
			jQuery('#sshow_img').fadeIn('fast');
		});	
		if (ttl) {
			jQuery('#sshow_dscr p').html(ttl);
		} else {
			jQuery('#sshow_dscr p').html("&nbsp;");
		}
	}

	jQuery(document).ready(function(){

	jQuery(document).on("click", "#sshow_img img", function(){ //click on img
		jQuery("#sshow_right").click(); 
	});

	//click on a pic

	jQuery(document).on("click", "a.quickbox", function(){
		window.scrollTo(0, 0);
		jQuery('<div>', {id: 'sshow_overlay'}).prependTo('body');
		jQuery('<div>', {id: 'sshow'}).prependTo('body');
		jQuery('<div>', {id: 'sshow_wrap'}).appendTo('#sshow');
		jQuery('<div>', {id: 'sshow_art'}).appendTo('#sshow_wrap');
		jQuery('<div>', {id: 'sshow_top'}).appendTo('#sshow_art');
		jQuery('<div>', {id: 'sshow_close', 'class': 'sshow_ani', html:'<u>Закрыть</u> (Esc)'}).appendTo('#sshow_top');
		jQuery('<div>', {id: 'sshow_imglist', html:''}).appendTo('#sshow_top'); //<p>
		jQuery('<div>', {id: 'sshow_imgs'}).appendTo('#sshow_imglist');
		jQuery("<div class=clear></div>").after("#sshow_imgs");
		jQuery('<div>', {id: 'sshow_inside'}).appendTo('#sshow_art');
		jQuery('<div>', {id: 'sshow_dscr', html: '<p> </p>'}).appendTo('#sshow_art');
		jQuery('<div>', {id: 'sshow_img', rel: '0'}).appendTo('#sshow_inside');
		jQuery('<div>', {id: 'sshow_right', 'class': 'sshow_ani', html:'&rarr;'}).appendTo('#sshow_dscr');
		jQuery('<div>', {id: 'sshow_ct', text:'Листать'}).appendTo('#sshow_dscr');
		jQuery('<div>', {id: 'sshow_left', 'class': 'sshow_ani', html:'&larr;'}).appendTo('#sshow_dscr');

		jQuery("#sshow_overlay").fadeIn("fast");
		
		var url = jQuery(this).attr("href");
		var ttl = jQuery(this).attr("title");

		ss_url = [];
		ss_ttl = [];
		
		jQuery("a.quickbox").each(function() { //building menu
			ss_url.push(jQuery(this).attr('href'));
			ss_ttl.push(jQuery(this).attr('title'));
		});
		
		if (ss_url.length > 1) {
		
		for (i in ss_url) { //creating links in menu
			var ii = parseInt(i)+1;
			jQuery('<a>',  {href: ss_url[i], rel: i, 'class': 'sshow_ani', title: ss_ttl[i], html: ii}).appendTo("#sshow_imgs");
		}} else {
			jQuery("#sshow_imgs").html("&nbsp;");
			jQuery("#sshow_imglist").html("&nbsp;");
			jQuery("#sshow_right").remove();
			jQuery("#sshow_left").remove();
			jQuery("#sshow_ct").remove();
		}
		
		var crnt = jQuery.inArray(url, ss_url);
		imgShow(url, ttl, crnt);
		return false;
	});

	//link next

	jQuery(document).on("click", "#sshow_right", function(){
		var crnt = parseInt( jQuery("#sshow_img").attr("rel") );
		var max = ss_url.length-1;	
		if (crnt < max) { 
			nxt = crnt + 1; 
		} else { 
			nxt = 0; 
		}
		imgShow(ss_url[nxt], ss_ttl[nxt], nxt);
		return false;
	});

	//link previous

	jQuery(document).on("click", "#sshow_left", function(){
		var crnt = parseInt( jQuery("#sshow_img").attr("rel") );
		var max = ss_url.length-1;	
		if (crnt != 0) { 
			nxt = crnt - 1; 
		} else { 
			nxt = max; 
		}
		imgShow(ss_url[nxt], ss_ttl[nxt], nxt);
		return false;
	});

	//href click in images menu

	jQuery(document).on("click", "#sshow_imgs a", function(){
		var url = jQuery(this).attr("href");
		var ttl = jQuery(this).attr("title");
		var crnt= jQuery(this).attr("rel");
		imgShow(url, ttl, crnt);
		return false;
	});

	//remove everything

	jQuery(document).on("click", "#sshow_overlay", function(){
		jQuery("#sshow").fadeOut("fast", function(){
			jQuery(this).remove();
		});	
		
		jQuery("#sshow_overlay").fadeOut("slow", function(){
			jQuery(this).remove();
		});
	});

	//close click

	jQuery(document).on("click", "#sshow_close", function(){ 
		jQuery("#sshow_overlay").click(); 
	});

	// transparency animation

	jQuery(document).on("mouseover", ".sshow_ani", function(){
		jQuery('.sshow_ani').each(function(){
			jQuery(this).mouseover(function(){
				jQuery(this).stop().animate({opacity:'0.5'},120);
			}).mouseout(function(){
				jQuery(this).stop().animate({opacity:'1.0'},120);
			});
		});		
	});
	});

	jQuery(document).keydown(function(e) { // navigate
		if (jQuery("#sshow_overlay").is(":visible")){
			if (e.keyCode == 37) { //left
				jQuery("#sshow_left").click();
			}
		if (e.keyCode == 39) { //right
				jQuery("#sshow_right").click();
			}
		if (e.keyCode == 27) { //esc
				jQuery("#sshow_overlay").click(); 
			}
		}
	});

})();