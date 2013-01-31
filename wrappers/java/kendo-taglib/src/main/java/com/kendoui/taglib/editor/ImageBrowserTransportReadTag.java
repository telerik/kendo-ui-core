
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserTransportReadTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImageBrowserTransportTag parent = (ImageBrowserTransportTag)findParentWithClass(ImageBrowserTransportTag.class);


        parent.setRead(this);

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
        return "editor-imageBrowser-transport-read";
    }

    public void setData(ImageBrowserTransportReadDataFunctionTag value) {
        setEvent("data", value.getBody());
    }

    public void setUrl(ImageBrowserTransportReadUrlFunctionTag value) {
        setEvent("url", value.getBody());
    }

    public String getContentType() {
        return (String)getProperty("contentType");
    }

    public void setContentType(String value) {
        setProperty("contentType", value);
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public String getDataType() {
        return (String)getProperty("dataType");
    }

    public void setDataType(String value) {
        setProperty("dataType", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getUrl() {
        return (String)getProperty("url");
    }

    public void setUrl(String value) {
        setProperty("url", value);
    }

//<< Attributes

}
