<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <div class="treeview-back">
    	<h3>TreeView with images</h3>
    	
        <kendo:treeView name="treeview-images">
            <kendo:treeView-items>
                <kendo:treeView-item text="Inbox" imageUrl="../../resources/web/treeview/mail.png">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Read Mail" imageUrl="../../resources/web/treeview/readmail.png" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
                <kendo:treeView-item text="Drafts" imageUrl="../../resources/web/treeview/edit.png" />
                <kendo:treeView-item text="Search Folders" imageUrl="../../resources/web/treeview/search.png" expanded="true">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Categorized Mail" imageUrl="../../resources/web/treeview/search.png" />
                        <kendo:treeView-item text="Large Mail" imageUrl="../../resources/web/treeview/search.png" />
                        <kendo:treeView-item text="Unread Mail" imageUrl="../../resources/web/treeview/search.png" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
           		<kendo:treeView-item text="Settings" imageUrl="../../resources/web/treeview/settings.png" />
            </kendo:treeView-items>
        </kendo:treeView>
    </div>
    
    <div class="treeview-back">
    	<h3>TreeView with sprites</h3>
    	
	    <kendo:treeView name="treeview-sprites">
	        <kendo:treeView-items>
	            <kendo:treeView-item text="My Web Site" spriteCssClass="folder" expanded="true">
	                <kendo:treeView-items>
	                    <kendo:treeView-item text="images" spriteCssClass="folder" expanded="true">
	                        <kendo:treeView-items>
	                            <kendo:treeView-item text="logo.png" spriteCssClass="image" />
	                            <kendo:treeView-item text="body-back.png" spriteCssClass="image" />
	                            <kendo:treeView-item text="my-photo.jpg" spriteCssClass="image" />
	                        </kendo:treeView-items>
	                    </kendo:treeView-item>
	                    <kendo:treeView-item text="resources" spriteCssClass="folder" expanded="true">
	                        <kendo:treeView-items>
	                            <kendo:treeView-item text="pdf" spriteCssClass="folder" expanded="true">
	                                <kendo:treeView-items>
	                                    <kendo:treeView-item text="brochure.pdf" spriteCssClass="pdf" />
	                                    <kendo:treeView-item text="prices.pdf" spriteCssClass="pdf" />
	                                </kendo:treeView-items>
	                            </kendo:treeView-item>
	                            <kendo:treeView-item text="zip" spriteCssClass="folder" />
	                        </kendo:treeView-items>
	                    </kendo:treeView-item>
	                    <kendo:treeView-item text="about.html" spriteCssClass="html" />
	                    <kendo:treeView-item text="contacts.html" spriteCssClass="html" />
	                    <kendo:treeView-item text="index.html" spriteCssClass="html" />
	                    <kendo:treeView-item text="portfolio.html" spriteCssClass="html" />
	                </kendo:treeView-items>
	            </kendo:treeView-item>
	        </kendo:treeView-items>
	    </kendo:treeView>
    </div>

    <style scoped>
        .treeview-back
        {
            float: left;
            width: 220px;
            margin: 30px;
            padding: 20px;
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
            box-shadow: 0 1px 2px rgba(0,0,0,0.45), inner 0 0 30px rgba(0,0,0,0.07);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
        }

        #treeview-sprites .k-sprite {
            background-image: url("../../resources/web/treeview/coloricons-sprite.png");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .html { background-position: 0 -48px; }
        .image { background-position: 0 -64px; }

    </style>
<demo:footer />
