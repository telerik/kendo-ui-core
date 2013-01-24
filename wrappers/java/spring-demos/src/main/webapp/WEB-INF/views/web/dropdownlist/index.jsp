<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div id="cap-view" class="k-header">
    <h2>Customize your Kendo Cap</h2>
    <div id="cap" class="black-cap"></div>
    <div id="options">
    <h3>Cap Color</h3>
    <kendo:dropDownList name="color" dataTextField="text" dataValueField="value" change="change" value="1">
        <kendo:dataSource data="${colors}"></kendo:dataSource>
    </kendo:dropDownList>  

    <h3>Cap Size</h3>
    <kendo:dropDownList name="size">
        <kendo:dataSource data="${sizes}"></kendo:dataSource>
    </kendo:dropDownList>  
    
    <button class="k-button" id="get">Customize</button>
    </div>
</div>
<style scoped>
    #example h2 {
        font-weight: normal;
    }
    #cap-view {
        border-radius: 10px 10px 10px 10px;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        width: 500px;
        margin: 30px auto;
        padding: 20px 20px 0 20px;
    }
    #cap {
        float: left;
        width: 242px;
        height: 225px;
        margin: 30px 40px 30px 20px;
        background-image: url(<c:url value="/resources/web/dropdownlist/cap.png"/>);
        background-repeat: no-repeat;
        background-color: transparent;
    }
    .black-cap {
        background-position: 0 0;
    }
    .grey-cap {
        background-position: 0 -225px;
    }
    .orange-cap {
        background-position: 0 -450px;
    }
    #options {
        padding: 30px;
    }
    #options h3 {
        font-size: 1em;
        font-weight: bold;
        margin: 25px 0 8px 0;
    }
    #get {
        margin-top: 25px;
    }
</style>

<script>
    function change() {
        var value = $("#color").val();
        $("#cap")
                .toggleClass("black-cap", value == 1)
                .toggleClass("orange-cap", value == 2)
                .toggleClass("grey-cap", value == 3);
    };

    $(document).ready(function () {
        $("#get").click(function () {
            var color = $("#color").data("kendoDropDownList"),
                size = $("#size").data("kendoDropDownList");

            alert('Thank you! Your Choice is:\n\nColor ID: ' + color.value() + ' and Size: ' + size.value());
        });
    });
</script>
<demo:footer />