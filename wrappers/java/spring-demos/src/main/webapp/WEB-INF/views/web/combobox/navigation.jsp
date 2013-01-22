<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<div class="demo-section">
	<h3>T-shirt Size</h3>
	<kendo:comboBox name="fabric" filter="contains" placeholder="Select size..." index="3" suggest="true" 
	                dataTextField="text" dataValueField="value" accesskey="w">
	          <kendo:dataSource data="${sizes}"></kendo:dataSource>
	</kendo:comboBox>
</div>
	
	<ul class="keyboard-legend">
         <li>
             <span class="button-preview">
                 <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
                 +
                 <span class="key-button">w</span>
             </span>
             <span class="button-descr">
                 focuses the widget
             </span>
         </li>
     </ul>

     <ul class="keyboard-legend">
         <li>
             <span class="button-preview">
                 <span class="key-button wide leftAlign">up arrow</span>
             </span>
             <span class="button-descr">
                 highlights previous item
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button wider leftAlign">down arrow</span>
             </span>
             <span class="button-descr">
                 highlights next item
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button wider rightAlign">enter</span>
             </span>
             <span class="button-descr">
                 selects highlighted item
             </span>
         </li>
        <li>
             <span class="button-preview">
                 <span class="key-button">esc</span>
             </span>
             <span class="button-descr">
                 closes the popup
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">alt</span>
                 <span class="key-button wider leftAlign">down arrow</span>
             </span>
             <span class="button-descr">
                 opens the popup
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">alt</span>
                 <span class="key-button wide leftAlign">up arrow</span>
             </span>
             <span class="button-descr">
                 closes the popup
             </span>
         </li>
     </ul>
	
	
	 <style scoped>
         div.demo-section
         {
             width: 204px;
             margin: 0px auto 25px auto;
         }
      </style>
<demo:footer />