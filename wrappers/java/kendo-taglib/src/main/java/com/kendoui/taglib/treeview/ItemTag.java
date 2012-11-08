
package com.kendoui.taglib.treeview;


import com.kendoui.taglib.BaseItemTag;
import com.kendoui.taglib.TreeViewTag;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Span;






import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;

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
    
    private boolean rendersCheckboxes() {
        Tag parent = this.getParent();
        
        while (parent.getClass() != TreeViewTag.class) {
            parent = parent.getParent();
        }
        
        Object checkboxes = ((TreeViewTag)parent).getProperty("checkboxes");
        
        if (checkboxes == null) {
            return false;
        } else if (checkboxes.getClass() == boolean.class) {
            return (boolean)checkboxes;
        } else {
            return true;
        }
    }
    
    @Override
    protected void renderContents(Element<?> element) {
        
        if (this.rendersCheckboxes()) {
            Input checkbox = new Input();
            checkbox.attr("type", "checkbox");            
            element.append(checkbox);
        }
        
        super.renderContents(element);
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
