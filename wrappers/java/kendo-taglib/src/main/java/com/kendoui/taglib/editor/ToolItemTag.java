
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseItemTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolItemTag extends  BaseItemTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ToolItemsTag parent = (ToolItemsTag)findParentWithClass(ToolItemsTag.class);

        parent.addItem(this);

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
        return "editor-tool-item";
    }

    public java.lang.String getContext() {
        return (java.lang.String)getProperty("context");
    }

    public void setContext(java.lang.String value) {
        setProperty("context", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

    public java.lang.String getValue() {
        return (java.lang.String)getProperty("value");
    }

    public void setValue(java.lang.String value) {
        setProperty("value", value);
    }

//<< Attributes

    @Override
    protected String getSpriteCssClass() {
        return null;
    }

    @Override
    protected String getImageUrl() {
        return null;
    }

    @Override
    protected boolean getExpanded() {
        return false;
    }

    @Override
    protected boolean getEnabled() {
        return false;
    }

}
