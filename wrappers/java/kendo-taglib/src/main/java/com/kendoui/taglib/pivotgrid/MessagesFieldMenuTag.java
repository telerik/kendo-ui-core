
package com.kendoui.taglib.pivotgrid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesFieldMenuTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setFieldMenu(this);

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
        return "pivotGrid-messages-fieldMenu";
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getClear() {
        return (java.lang.String)getProperty("clear");
    }

    public void setClear(java.lang.String value) {
        setProperty("clear", value);
    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public java.lang.String getFilterFields() {
        return (java.lang.String)getProperty("filterFields");
    }

    public void setFilterFields(java.lang.String value) {
        setProperty("filterFields", value);
    }

    public java.lang.String getInclude() {
        return (java.lang.String)getProperty("include");
    }

    public void setInclude(java.lang.String value) {
        setProperty("include", value);
    }

    public java.lang.String getInfo() {
        return (java.lang.String)getProperty("info");
    }

    public void setInfo(java.lang.String value) {
        setProperty("info", value);
    }

    public java.lang.String getOk() {
        return (java.lang.String)getProperty("ok");
    }

    public void setOk(java.lang.String value) {
        setProperty("ok", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

//<< Attributes

}
