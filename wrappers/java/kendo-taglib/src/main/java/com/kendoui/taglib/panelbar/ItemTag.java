
package com.kendoui.taglib.panelbar;


import com.kendoui.taglib.BaseItemTag;
import com.kendoui.taglib.html.Anchor;
import com.kendoui.taglib.html.Element;
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
    protected void renderContents(Element<?> element) {
        boolean ajax = this.isSet("contentUrl") && !this.getContentUrl().isEmpty();
        Element<?> container = element;
        
        if (ajax) {
            Anchor a = new Anchor();
            a.attr("class", "k-link k-header");
            a.attr("href", this.getContentUrl());
            container.append(a);
            container = a;
        }        
        
        super.renderContents(container);
        
        if (ajax && body().isEmpty()) {
            appendContent(element, "");
        }
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

    public String getContentUrl() {
        return (String)getProperty("contentUrl");
    }

    public void setContentUrl(String value) {
        setProperty("contentUrl", value);
    }

    public boolean getSelected() {
        return (boolean)getProperty("selected");
    }

    public void setSelected(boolean value) {
        setProperty("selected", value);
    }

//<< Attributes

}
