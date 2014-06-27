<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:toolBar name="toolbar">
	<kendo:toolBar-items>
		<kendo:toolBar-item type="button" text="Button"></kendo:toolBar-item>
		<kendo:toolBar-item type="button" togglable="true" text="Toggle Button"></kendo:toolBar-item>
		<kendo:toolBar-item type="splitButton" text="Insert">
			<kendo:toolBar-item-menuButtons>
				<kendo:toolBar-item-menuButton text="Insert Above" icon="insert-n"></kendo:toolBar-item-menuButton>
				<kendo:toolBar-item-menuButton text="Insert Between" icon="insert-m"></kendo:toolBar-item-menuButton>
				<kendo:toolBar-item-menuButton text="Insert below" icon="insert-u"></kendo:toolBar-item-menuButton>
			</kendo:toolBar-item-menuButtons>
		</kendo:toolBar-item>
		<kendo:toolBar-item type="separator"></kendo:toolBar-item>
		<kendo:toolBar-item template="<label>Format:</label>"></kendo:toolBar-item>
		<kendo:toolBar-item template="<input id='dropdown' style='width: 150px' />" overflow="never"></kendo:toolBar-item>
		<kendo:toolBar-item type="separator"></kendo:toolBar-item>
		
		<kendo:toolBar-item type="buttonGroup">
			<kendo:toolBar-item-buttons>
				<kendo:toolBar-item-button text="Left" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyLeft"></kendo:toolBar-item-button>
				<kendo:toolBar-item-button text="Center" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyCenter"></kendo:toolBar-item-button>
				<kendo:toolBar-item-button text="Right" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyRight"></kendo:toolBar-item-button>
			</kendo:toolBar-item-buttons>
		</kendo:toolBar-item>
		<kendo:toolBar-item type="buttonGroup">
			<kendo:toolBar-item-buttons>
				<kendo:toolBar-item-button text="Bold" togglable="true" showText="overflow" spriteCssClass="k-tool-icon k-bold"></kendo:toolBar-item-button>
				<kendo:toolBar-item-button text="Italic" togglable="true" showText="overflow" spriteCssClass="k-tool-icon k-italic"></kendo:toolBar-item-button>
				<kendo:toolBar-item-button text="Underline" togglable="true" showText="overflow" spriteCssClass="k-tool-icon k-underline"></kendo:toolBar-item-button>
			</kendo:toolBar-item-buttons>
		</kendo:toolBar-item>
		<kendo:toolBar-item type="button" text="Action" overflow="always"></kendo:toolBar-item>
		<kendo:toolBar-item type="button" text="Another Action" overflow="always"></kendo:toolBar-item>
		<kendo:toolBar-item type="button" text="Something else here" overflow="always"></kendo:toolBar-item>
	</kendo:toolBar-items>
</kendo:toolBar>

<script>
	$(document).ready(function() {
	    $("#dropdown").kendoDropDownList({
	        optionLabel: "Paragraph",
	        dataTextField: "text",
	        dataValueField: "value",
	        dataSource: [
	            { text: "Heading 1", value: 1 },
	            { text: "Heading 2", value: 2 },
	            { text: "Heading 3", value: 3 },
	            { text: "Title", value: 4 },
	            { text: "Subtitle", value: 5 }
	        ]
	    });
	});
</script>

<demo:footer />