<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
			</div>
			<div class="source">
				<a href="#" class="offline-button view selected">JSP</a>
				<div class="code">
					<pre class="prettyprint view">${fn:escapeXml(view)}</pre>
					<pre class="prettyprint controller">controller</pre>
				</div>
			</div>
		</div>
		<script>
		 $(function() {
		        prettyPrint();

		        $(".source a").click(false);
		    });		
		</script>
	</body>
</html>