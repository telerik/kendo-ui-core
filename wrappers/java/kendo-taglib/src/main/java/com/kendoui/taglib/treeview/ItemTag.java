
package com.kendoui.taglib.treeview;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseItemTag;
import com.kendoui.taglib.treeview.ItemsTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends BaseItemTag /* interfaces */implements Items/* interfaces */ {
    
    @Override
    public void setItems(ItemsTag value) {
        items = value.items();
    }
    
    @Override
    protected List<?> items() {
        return items;
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Item parent = (Item)findParentWithClass(Item.class);

        parent.addItem(this);

//<< doEndTag

        return super.doEndTag();
    }
    
    private List<Map<String, Object>> items;
    
    @Override
    public void initialize() {
//>> initialize
//<< initialize
        items = new ArrayList<Map<String, Object>>();
        
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy
        items = new ArrayList<Map<String, Object>>();
        
        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "treeView-item";
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

//<< Attributes

}
