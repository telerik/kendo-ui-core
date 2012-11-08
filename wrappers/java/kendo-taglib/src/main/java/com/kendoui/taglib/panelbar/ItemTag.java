
package com.kendoui.taglib.panelbar;


import com.kendoui.taglib.BaseItemTag;
import com.kendoui.taglib.html.Li;






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
    public void addAttributes(Li element) {
        if (this.isSet("expanded") && this.getExpanded()) {
            element.attr("class", "k-state-active");
        }
        
        super.addAttributes(element);
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
        return "panelBar-item";
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

    public String getImageUrl() {
        return (String)getProperty("imageUrl");
    }

    public void setImageUrl(String value) {
        setProperty("imageUrl", value);
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

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

//<< Attributes

}
