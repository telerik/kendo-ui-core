
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportSignalrTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TransportTag parent = (TransportTag)findParentWithClass(TransportTag.class);


        parent.setSignalr(this);

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
        return "dataSource-transport-signalr";
    }

    public void setClient(com.kendoui.taglib.datasource.TransportSignalrClientTag value) {
        setProperty("client", value);
    }

    public void setServer(com.kendoui.taglib.datasource.TransportSignalrServerTag value) {
        setProperty("server", value);
    }

    public java.lang.Object getHub() {
        return (java.lang.Object)getProperty("hub");
    }

    public void setHub(java.lang.Object value) {
        setProperty("hub", value);
    }

    public java.lang.Object getPromise() {
        return (java.lang.Object)getProperty("promise");
    }

    public void setPromise(java.lang.Object value) {
        setProperty("promise", value);
    }

//<< Attributes

}
