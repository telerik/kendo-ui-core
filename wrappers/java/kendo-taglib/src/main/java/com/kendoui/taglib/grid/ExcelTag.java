
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ExcelTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setExcel(this);

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
        return "grid-excel";
    }

    public boolean getAllPages() {
        return (boolean)getProperty("allPages");
    }

    public void setAllPages(boolean value) {
        setProperty("allPages", value);
    }

    public java.lang.String getFileName() {
        return (java.lang.String)getProperty("fileName");
    }

    public void setFileName(java.lang.String value) {
        setProperty("fileName", value);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public boolean getForceProxy() {
        return (boolean)getProperty("forceProxy");
    }

    public void setForceProxy(boolean value) {
        setProperty("forceProxy", value);
    }

    public java.lang.String getProxyURL() {
        return (java.lang.String)getProperty("proxyURL");
    }

    public void setProxyURL(java.lang.String value) {
        setProperty("proxyURL", value);
    }

//<< Attributes

}
