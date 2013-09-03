
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserTransportTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImageBrowserTag parent = (ImageBrowserTag)findParentWithClass(ImageBrowserTag.class);


        parent.setTransport(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "editor-imageBrowser-transport";
    }

    public void setCreate(com.kendoui.taglib.editor.ImageBrowserTransportCreateTag value) {
        setProperty("create", value);
    }

    public void setDestroy(com.kendoui.taglib.editor.ImageBrowserTransportDestroyTag value) {
        setProperty("destroy", value);
    }

    public void setRead(com.kendoui.taglib.editor.ImageBrowserTransportReadTag value) {
        setProperty("read", value);
    }

    public void setThumbnailUrl(ImageBrowserTransportThumbnailUrlFunctionTag value) {
        setEvent("thumbnailUrl", value.getBody());
    }

    public void setImageUrl(ImageBrowserTransportImageUrlFunctionTag value) {
        setEvent("imageUrl", value.getBody());
    }

    public java.lang.String getCreate() {
        return (java.lang.String)getProperty("create");
    }

    public void setCreate(java.lang.String value) {
        setProperty("create", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public java.lang.String getImageUrl() {
        return (java.lang.String)getProperty("imageUrl");
    }

    public void setImageUrl(java.lang.String value) {
        setProperty("imageUrl", value);
    }

    public java.lang.String getRead() {
        return (java.lang.String)getProperty("read");
    }

    public void setRead(java.lang.String value) {
        setProperty("read", value);
    }

    public java.lang.String getThumbnailUrl() {
        return (java.lang.String)getProperty("thumbnailUrl");
    }

    public void setThumbnailUrl(java.lang.String value) {
        setProperty("thumbnailUrl", value);
    }

    public java.lang.String getUploadUrl() {
        return (java.lang.String)getProperty("uploadUrl");
    }

    public void setUploadUrl(java.lang.String value) {
        setProperty("uploadUrl", value);
    }

//<< Attributes

}
