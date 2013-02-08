
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

    public void setImageUrl(ImageBrowserTransportImageUrlFunctionTag value) {
        setEvent("imageUrl", value.getBody());
    }

    public String getCreate() {
        return (String)getProperty("create");
    }

    public void setCreate(String value) {
        setProperty("create", value);
    }

    public String getDestroy() {
        return (String)getProperty("destroy");
    }

    public void setDestroy(String value) {
        setProperty("destroy", value);
    }

    public String getImageUrl() {
        return (String)getProperty("imageUrl");
    }

    public void setImageUrl(String value) {
        setProperty("imageUrl", value);
    }

    public String getRead() {
        return (String)getProperty("read");
    }

    public void setRead(String value) {
        setProperty("read", value);
    }

    public String getThumbnailUrl() {
        return (String)getProperty("thumbnailUrl");
    }

    public void setThumbnailUrl(String value) {
        setProperty("thumbnailUrl", value);
    }

    public String getUploadUrl() {
        return (String)getProperty("uploadUrl");
    }

    public void setUploadUrl(String value) {
        setProperty("uploadUrl", value);
    }

//<< Attributes

}
