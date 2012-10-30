
package com.kendoui.taglib.treeview;


import com.kendoui.taglib.BaseItemTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends  BaseItemTag  /* interfaces */implements Items/* interfaces */ {
    
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

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public static String tagName() {
        return "treeView-item";
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

    public boolean getExpanded() {
        return (boolean)getProperty("expanded");
    }

    public void setExpanded(boolean value) {
        setProperty("expanded", value);
    }

//<< Attributes

}
