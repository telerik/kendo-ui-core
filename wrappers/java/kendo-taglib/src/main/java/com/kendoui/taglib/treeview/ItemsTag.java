
package com.kendoui.taglib.treeview;


import com.kendoui.taglib.ContentTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemsTag extends ContentTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        Items parent = (Items)findParentWithClass(Items.class);


        parent.setItems(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        items = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        items = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> items;

    public List<Map<String, Object>> items() {
        return items;
    }

    public static String tagName() {
        return "treeView-items";
    }

    public void addItem(ItemTag value) {
        items.add(value.properties());
    }

//<< Attributes

}
