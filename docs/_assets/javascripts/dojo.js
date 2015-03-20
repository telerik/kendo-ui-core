jQuery(function() {
   $("body").find(".prettyprint").each(function() {
       dojoApi.showHintButton(this, "Edit this example");
   });

   $("body").on("click", ".dojo-submit-button", function(e) {
       e.preventDefault();
       var snippet = $(this).next().text();
       dojoApi.post(snippet);
   });
});
