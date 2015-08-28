jQuery(function() {
   $("body").find(".prettyprint").not("[lang='pseudo']").each(function() {
        dojoApi.addButtons(this);
   });
});
