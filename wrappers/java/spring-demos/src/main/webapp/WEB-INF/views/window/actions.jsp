<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/resources/web/window/kubus-armchair.png" var="armchair" />

<demo:header />
	<kendo:window name="window" title="About Josef Hoffmann" draggable="true" 
			resizable="true" width="600" close="onClose"
			actions="<%=new String[] { \"Custom\", \"Minimize\", \"Maximize\", \"Close\" } %>">  		
		<kendo:window-content>
			<div class="armchair">
				<img src="${armchair }"
			              alt="Josef Hoffmann - Kubus Armchair" />
			      Josef Hoffmann - Kubus Armchair
			</div>
	
	        <p>
	            Josef Hoffmann studied architecture at the Academy of Fine Arts in Vienna,
	            Austria, under Art Nouveau architect Otto Wagner, whose theories of functional,
	            modern architecture profoundly influenced his works, and in 1896 he joined his office.
	        </p>
	
	        <p>
	            In 1898, he established his own practice in Vienna. In 1897, inspired by Mackintosh
	            and the Glasgow School, he was one of the founding members with Gustav Klimt, of an
	            association of revolutionary artists and architects, the Vienna Secession.
	        </p>
	
	        <p>
	            In 1903, he founded with architects Koloman Moser and Joseph Maria Olbrich, the Wiener
	            Werksttte for decorative arts.
	        </p>
	
	        <p>
	            They aspired to the renaissance of the arts and crafts and to bring more abstract and
	            purer forms to the designs of buildings and furniture, glass and metalwork, following
	            the concept of total work of art. Hoffman's works combined functionality and simplicity
	            of craft production with refined and innovative ornamental details and geometric
	            elements. He is an important precursor of the Modern Movement and Art Deco.
	        </p>
	
	        <p>
	            Source:
	            <a href="http://www.senses-artnouveau.com/biography.php?artist=hof" title="About Josef Hoffmann">http://www.senses-artnouveau.com/</a>
	        </p>
		</kendo:window-content>	
	</kendo:window>    
	
	<span id="undo" style="display:none" class="k-button">Click here to open the window.</span>

	<script>
	    function onClose() {
	        $("#undo").show();
	    }
	
	    $(document).ready(function() {
	        $("#undo").bind("click", function() {
                $("#window").data("kendoWindow").open();
                $("#undo").hide();
            });
	        
	        $("#window").data("kendoWindow").wrapper.find(".k-i-custom").click(function(e) {
	        	 alert("Custom action button clicked");
                 e.preventDefault();
	        });	        
	    });	    
	</script>	
	
	<style scoped="scoped">
         #example 
         {
             min-height:500px;
         }

         #undo {
             text-align: center;
             position: absolute;
             white-space: nowrap;
             padding: 1em;
             cursor: pointer;
         }
         .armchair {
         	float: left;
         	margin: 30px 30px 120px 30px;
         	text-align: center;
         }
         .armchair img {
             display: block;
             margin-bottom: 10px;
         }
     </style>
<demo:footer />
