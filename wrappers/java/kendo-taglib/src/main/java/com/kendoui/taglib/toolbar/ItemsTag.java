
package com.kendoui.taglib.toolbar;


import com.kendoui.taglib.ContentTag;



import com.kendoui.taglib.ToolBarTag;


import com.kendoui.taglib.editor.ToolTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemsTag extends ContentTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        ToolBarTag parent = (ToolBarTag)findParentWithClass(ToolBarTag.class);

        parent.setItems(this);
        parent.setProperty("items", this.items);
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
//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> items;

    public List<Map<String, Object>> items() {
        return items;
    }

    public static String tagName() {
        return "toolBar-items";
    }

    public void addItem(ItemTag value) {
        items.add(value.properties());
    }

//<< Attributes

}
