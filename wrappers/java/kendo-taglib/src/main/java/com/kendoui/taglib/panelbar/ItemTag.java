
package com.kendoui.taglib.panelbar;

import com.kendoui.taglib.BaseTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ItemsTag parent = (ItemsTag)findParentWithClass(ItemsTag.class);

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
        return "panelBar-item";
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

    public String getSpriteCssClass() {
        return (String)getProperty("spriteCssClass");
    }

    public void setSpriteCssClass(String value) {
        setProperty("spriteCssClass", value);
    }

//<< Attributes

}
