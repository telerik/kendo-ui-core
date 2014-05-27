<%@ page pageEncoding="UTF-8" %>

<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/js/cultures/kendo.culture.en-US.min.js" var="enUS"/>
<c:url value="/resources/js/cultures/kendo.culture.en-GB.min.js" var="enGB"/>
<c:url value="/resources/js/cultures/kendo.culture.de-DE.min.js" var="deDE"/>
<c:url value="/resources/js/cultures/kendo.culture.fr-FR.min.js" var="frFR"/>
<c:url value="/resources/js/cultures/kendo.culture.bg-BG.min.js" var="bgBG"/>

<script type="text/javascript" src="${enUS}"></script>
<script type="text/javascript" src="${enGB}"></script>
<script type="text/javascript" src="${deDE}"></script>
<script type="text/javascript" src="${frFR}"></script>
<script type="text/javascript" src="${bgBG}"></script>

<div id="product-view" class="k-header">
   <div class="right">
       <label for="culture">Choose culture:</label>
       <kendo:dropDownList name="culture" dataTextField="text" dataValueField="value" change="changeCulture" value="en-US">
	       <kendo:dataSource data="${cultures}"></kendo:dataSource>
	   </kendo:dropDownList>  
   </div>

   <h2>Product promotion</h2>
   <ul id="fieldlist">
       <li>
           <label for="initial">Initial price:</label>
           <kendo:maskedTextBox name="initial" mask="9,999.99 $" value="1234.56"></kendo:maskedTextBox>
        </li>
    </ul>
</div>

   <style scoped>
       #example h2 {
           padding: 5px 0;
           font-weight: normal;
           border-bottom: 1px solid #999;
       }
       #product-view {
           border-radius: 10px 10px 10px 10px;
           border-style: solid;
           border-width: 1px;
           overflow: hidden;
           width: 500px;
           padding: 20px 20px 0 20px;
           margin: 30px auto;
           background-position: 0 -255px;
       }

       .right
       {
           float:right;
       }

       #fieldlist
       {
           width: 100%;
           float:left;
           margin:0;
           padding: 20px 0 20px 0;
       }

       #fieldlist li
       {
           list-style:none;
           padding:5px 0;
       }
       #fieldlist label {
           display: inline-block;
           text-align: right;
           margin-right: 5px;
       }

</style>

<script>
	function changeCulture() {
	    kendo.culture(this.value());
	
	    $("#initial").data("kendoMaskedTextBox").setOptions(initial.options);
	}
</script>

<demo:footer />
