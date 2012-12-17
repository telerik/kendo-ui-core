
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImagebrowserTransportTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImagebrowserTag parent = (ImagebrowserTag)findParentWithClass(ImagebrowserTag.class);


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
        return "editor-imagebrowser-transport";
    }

    public void setImageUrl(ImageUrlFunctionTag value) {
        setEvent("imageUrl", value.getBody());
    }

    public Object getCreate() {
        return (Object)getProperty("create");
    }

    public void setCreate(Object value) {
        setProperty("create", value);
    }

    public Object getDestroy() {
        return (Object)getProperty("destroy");
    }

    public void setDestroy(Object value) {
        setProperty("destroy", value);
    }

    public String getImageUrl() {
        return (String)getProperty("imageUrl");
    }

    public void setImageUrl(String value) {
        setProperty("imageUrl", value);
    }

    public Object getRead() {
        return (Object)getProperty("read");
    }

    public void setRead(Object value) {
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
