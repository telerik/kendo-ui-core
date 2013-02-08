
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

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

    public String getValue() {
        return (String)getProperty("value");
    }

    public void setValue(String value) {
        setProperty("value", value);
    }

//<< Attributes

}
