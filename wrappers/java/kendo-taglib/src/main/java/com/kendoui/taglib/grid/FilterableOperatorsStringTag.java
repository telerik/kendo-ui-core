
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

    public String getContains() {
        return (String)getProperty("contains");
    }

    public void setContains(String value) {
        setProperty("contains", value);
    }

    public String getDoesnotcontain() {
        return (String)getProperty("doesnotcontain");
    }

    public void setDoesnotcontain(String value) {
        setProperty("doesnotcontain", value);
    }

    public String getEndswith() {
        return (String)getProperty("endswith");
    }

    public void setEndswith(String value) {
        setProperty("endswith", value);
    }

    public String getEq() {
        return (String)getProperty("eq");
    }

    public void setEq(String value) {
        setProperty("eq", value);
    }

    public String getNeq() {
        return (String)getProperty("neq");
    }

    public void setNeq(String value) {
        setProperty("neq", value);
    }

    public String getStartswith() {
        return (String)getProperty("startswith");
    }

    public void setStartswith(String value) {
        setProperty("startswith", value);
    }

//<< Attributes

}
