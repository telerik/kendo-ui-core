<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<demo:header />

<c:url value="/web/upload/async/save" var="saveUrl" />
<c:url value="/web/upload/async/remove" var="removeUrl" />

<kendo:upload name="files" 
		      template="<span class='k-progress'></span><div class='file-wrapper'>
                    <span class='file-icon #=addExtensionClass(files[0].extension)#'></span>
                    <h4 class='file-heading file-name-heading'>Name: #=name#</h4>
                    <h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>
                    <button type='button' class='k-upload-action'></button>
                </div>">
	<kendo:upload-async  autoUpload="false" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
</kendo:upload>

<script>
	function addExtensionClass(extension) {
		switch (extension) {
		case '.jpg':
		case '.img':
		case '.png':
		case '.gif':
			return "img-file";
		case '.doc':
		case '.docx':
			return "doc-file";
		case '.xls':
		case '.xlsx':
			return "xls-file";
		case '.pdf':
			return "pdf-file";
		case '.zip':
		case '.rar':
			return "zip-file";
		default:
			return "default-file";
		}
	}
</script>

<style scoped>
	.file-icon {
		display: inline-block;
		float: left;
		width: 48px;
		height: 48px;
		margin-left: 10px;
		margin-top: 13.5px;
	}
	
	.img-file {
		background-image: url(../../resources/web/upload/jpg.png)
	}
	
	.doc-file {
		background-image: url(../../resources/web/upload/doc.png)
	}
	
	.pdf-file {
		background-image: url(../../resources/web/upload/pdf.png)
	}
	
	.xls-file {
		background-image: url(../../resources/web/upload/xls.png)
	}
	
	.zip-file {
		background-image: url(../../resources/web/upload/zip.png)
	}
	
	.default-file {
		background-image: url(../../resources/web/upload/default.png)
	}
	
	#example .file-heading {
		font-family: Arial;
		font-size: 1.1em;
		display: inline-block;
		float: left;
		width: 450px;
		margin: 0 0 0 20px;
		height: 25px;
		-ms-text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	#example .file-name-heading {
		font-weight: bold;
	}
	
	#example .file-size-heading {
		font-weight: normal;
		font-style: italic;
	}
	
	li.k-file .file-wrapper .k-upload-action {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	li.k-file div.file-wrapper {
		position: relative;
		height: 75px;
	}
</style>
<demo:footer />