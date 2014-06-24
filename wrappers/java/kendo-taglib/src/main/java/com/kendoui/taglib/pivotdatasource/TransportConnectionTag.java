
package com.kendoui.taglib.pivotdatasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportConnectionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TransportTag parent = (TransportTag)findParentWithClass(TransportTag.class);


        parent.setConnection(this);

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
        return "pivotDataSource-transport-connection";
    }

    public java.lang.String getCatalog() {
        return (java.lang.String)getProperty("catalog");
    }

    public void setCatalog(java.lang.String value) {
        setProperty("catalog", value);
    }

    public java.lang.String getCube() {
        return (java.lang.String)getProperty("cube");
    }

    public void setCube(java.lang.String value) {
        setProperty("cube", value);
    }

//<< Attributes

}
