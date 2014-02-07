
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportSignalrServerTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TransportSignalrTag parent = (TransportSignalrTag)findParentWithClass(TransportSignalrTag.class);


        parent.setServer(this);

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
        return "dataSource-transport-signalr-server";
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

    public java.lang.String getRead() {
        return (java.lang.String)getProperty("read");
    }

    public void setRead(java.lang.String value) {
        setProperty("read", value);
    }

    public java.lang.String getUpdate() {
        return (java.lang.String)getProperty("update");
    }

    public void setUpdate(java.lang.String value) {
        setProperty("update", value);
    }

//<< Attributes

}
