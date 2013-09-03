
package com.kendoui.taglib.tabstrip;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Div;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends  BaseTag  /* interfaces */implements Items/* interfaces */ {
    
    protected List<Map<String,Object>> items;
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ItemsTag parent = (ItemsTag)findParentWithClass(ItemsTag.class);

        parent.addItem(this);

//<< doEndTag
        
        try {
            this.setProperty("content", getContent());
        } catch (IOException e) {
            e.printStackTrace();
        }
        
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
        items = new ArrayList<Map<String,Object>>();
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy
        items = null;
        super.destroy();
    }       

//>> Attributes
    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public static String tagName() {
        return "tabStrip-item";
    }

    public java.lang.String getContentUrl() {
        return (java.lang.String)getProperty("contentUrl");
    }

    public void setContentUrl(java.lang.String value) {
        setProperty("contentUrl", value);
    }

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

    public java.lang.String getImageUrl() {
        return (java.lang.String)getProperty("imageUrl");
    }

    public void setImageUrl(java.lang.String value) {
        setProperty("imageUrl", value);
    }

    public boolean getSelected() {
        return (boolean)getProperty("selected");
    }

    public void setSelected(boolean value) {
        setProperty("selected", value);
    }

    public java.lang.String getSpriteCssClass() {
        return (java.lang.String)getProperty("spriteCssClass");
    }

    public void setSpriteCssClass(java.lang.String value) {
        setProperty("spriteCssClass", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

//<< Attributes
  

}
