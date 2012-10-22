<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <kendo:treeView name="treeview">
        <kendo:treeView-items>
            <kendo:treeView-item text="My Web Site" spriteCssClass="folder">
                <kendo:treeView-items>
                    <kendo:treeView-item text="images" spriteCssClass="folder">
                        <kendo:treeView-items>
                            <kendo:treeView-item text="logo.png" spriteCssClass="image" />
                            <kendo:treeView-item text="body-back.png" spriteCssClass="image" />
                            <kendo:treeView-item text="my-photo.jpg" spriteCssClass="image" />
                        </kendo:treeView-items>
                    </kendo:treeView-item>
                    <kendo:treeView-item text="resources" spriteCssClass="folder">
                        <kendo:treeView-items>
                            <kendo:treeView-item text="pdf" spriteCssClass="folder">
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

    <style scoped>
        .demo-section {
            width: 200px;
        }

        #treeview .k-sprite {
            background-image: url("../../resources/web/treeview/coloricons-sprite.png");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .html { background-position: 0 -48px; }
        .image { background-position: 0 -64px; }

    </style>
<demo:footer />
