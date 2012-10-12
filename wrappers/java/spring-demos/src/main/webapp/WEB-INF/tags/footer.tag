<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
			</div>
			<div class="source">
				<a href="#" class="offline-button view selected">View</a>
				<a href="#" class="offline-button controller">Controller</a>
				<div class="code">
					<pre class="prettyprint view">${fn:escapeXml(view)}</pre>
					<pre class="prettyprint controller">controller</pre>
				</div>
			</div>
		</div>
		<script>
		 $(function() {
		        prettyPrint();

		        $(".source a").click(function(e) {
		            var showView = $(this).is(".view");

		            $(".source .code")
		                .find(".view").toggle(showView).end()
		                .find(".controller").toggle(!showView);

		            $(".source a").toggleClass("selected");

		            e.preventDefault();
		        });
		    });		
		</script>
	</body>
</html>