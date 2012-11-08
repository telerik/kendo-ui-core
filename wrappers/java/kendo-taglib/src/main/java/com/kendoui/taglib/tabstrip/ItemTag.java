
package com.kendoui.taglib.tabstrip;

import java.io.IOException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Div;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends  BaseTag  /* interfaces */implements Items/* interfaces */ {
       
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ItemsTag parent = (ItemsTag)findParentWithClass(ItemsTag.class);

        parent.addItem(this);

//<< doEndTag
        
        return super.doEndTag();
    }
    
    public String getContent() throws IOException {
        String html = body();
        
        if (!html.isEmpty()) {               
            Div div = new Div();
            
            div.html(html);
            
            return div.outerHtml();
        }
        
        return "";
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
        return "tabStrip-item";
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
