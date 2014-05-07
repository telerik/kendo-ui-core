<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
   
	<kendo:treeView name="treeview" class="demo-section"
		template="#: item.text# # if (!item.items) { # <a class='delete-link' href='\#'></a> # } #">
	    <kendo:dataSource data="${data}">                                      
	    </kendo:dataSource>
	</kendo:treeView>

	<script>
		$(document).on("click", ".delete-link", function(e) {
            e.preventDefault();
            var treeview = $("#treeview").data("kendoTreeView");
            treeview.remove($(this).closest(".k-item"));
        });
	</script>
	<style scoped>
		#treeview {
	        width: 300px;
	        margin: 0 auto;
	    }
	    
		#treeview .k-sprite {
		    background-image: url("../../resources/web/treeview/coloricons-sprite.png");
		}
		
		.rootfolder { background-position: 0 0; }
		.folder { background-position: 0 -16px; }
		.pdf { background-position: 0 -32px; }
		.html { background-position: 0 -48px; }
		.image { background-position: 0 -64px; }
		
		.delete-link {
	         width: 12px;
	         height: 12px;
	         background: transparent url("../../resources/web/treeview/close.png") no-repeat 50% 50%;
	         overflow: hidden;
	         display: inline-block;
	         font-size: 0;
	         line-height: 0;
	         vertical-align: top;
	         margin: 2px 0 0 3px;
	         -webkit-border-radius: 5px;
	         -mox-border-radius: 5px;
	         border-radius: 5px;
	     }
	</style>
<demo:footer />