jQuery(function() {
   $("body").find(".prettyprint").not("[data-lang=pseudo]").each(function() {
        dojoApi.addButtons(this);
   });
});
