
$(document).ready(function(){
	$("div.selectTabs_first").each(function () {
		var tmp = $(this);
		console.log($(tmp).find(" .lineTabs li"));
		$(tmp).find(".lineTabs li").each(function (i) {
			$(tmp).find(".lineTabs li:eq("+i+") a").click(function(){
				var tab_id=i+1;
				$(tmp).find(".lineTabs li").removeClass("active");
				$(this).parent().addClass("active");
				$(tmp).find(".content div").stop(false,false).hide();
				$(tmp).find(".tab"+tab_id).stop(false,false).show();
				return false;
			});
		});
	});
});