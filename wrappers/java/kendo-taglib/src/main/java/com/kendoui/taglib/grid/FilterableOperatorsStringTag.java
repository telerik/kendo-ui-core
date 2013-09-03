
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableOperatorsStringTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableOperatorsTag parent = (FilterableOperatorsTag)findParentWithClass(FilterableOperatorsTag.class);


        parent.setString(this);

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
        return "grid-filterable-operators-string";
    }

    public java.lang.String getContains() {
        return (java.lang.String)getProperty("contains");
    }

    public void setContains(java.lang.String value) {
        setProperty("contains", value);
    }

    public java.lang.String getDoesnotcontain() {
        return (java.lang.String)getProperty("doesnotcontain");
    }

    public void setDoesnotcontain(java.lang.String value) {
        setProperty("doesnotcontain", value);
    }

    public java.lang.String getEndswith() {
        return (java.lang.String)getProperty("endswith");
    }

    public void setEndswith(java.lang.String value) {
        setProperty("endswith", value);
    }

    public java.lang.String getEq() {
        return (java.lang.String)getProperty("eq");
    }

    public void setEq(java.lang.String value) {
        setProperty("eq", value);
    }

    public java.lang.String getNeq() {
        return (java.lang.String)getProperty("neq");
    }

    public void setNeq(java.lang.String value) {
        setProperty("neq", value);
    }

    public java.lang.String getStartswith() {
        return (java.lang.String)getProperty("startswith");
    }

    public void setStartswith(java.lang.String value) {
        setProperty("startswith", value);
    }

//<< Attributes

}
