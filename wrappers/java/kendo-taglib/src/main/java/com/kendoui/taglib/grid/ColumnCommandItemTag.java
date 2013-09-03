
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;





import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnCommandItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ColumnCommandTag parent = (ColumnCommandTag)findParentWithClass(ColumnCommandTag.class);

        parent.addCommandItem(this);

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
        return "grid-column-commandItem";
    }

    public void setClick(ColumnCommandItemClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public java.lang.String getClassName() {
        return (java.lang.String)getProperty("className");
    }

    public void setClassName(java.lang.String value) {
        setProperty("className", value);
    }

    public String getClick() {
        Function property = ((Function)getProperty("click"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClick(String value) {
        setProperty("click", new Function(value));
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

//<< Attributes

}
