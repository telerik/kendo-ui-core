
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportReadTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TransportTag parent = (TransportTag)findParentWithClass(TransportTag.class);


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
        return "dataSource-transport-read";
    }

    public void setData(TransportReadDataFunctionTag value) {
        setEvent("data", value.getBody());
    }

    public void setUrl(TransportReadUrlFunctionTag value) {
        setEvent("url", value.getBody());
    }

    public boolean getCache() {
        return (boolean)getProperty("cache");
    }

    public void setCache(boolean value) {
        setProperty("cache", value);
    }

    public java.lang.String getContentType() {
        return (java.lang.String)getProperty("contentType");
    }

    public void setContentType(java.lang.String value) {
        setProperty("contentType", value);
    }

    public java.lang.Object getData() {
        return (java.lang.Object)getProperty("data");
    }

    public void setData(java.lang.Object value) {
        setProperty("data", value);
    }

    public java.lang.String getDataType() {
        return (java.lang.String)getProperty("dataType");
    }

    public void setDataType(java.lang.String value) {
        setProperty("dataType", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public java.lang.String getUrl() {
        return (java.lang.String)getProperty("url");
    }

    public void setUrl(java.lang.String value) {
        setProperty("url", value);
    }

//<< Attributes

}
