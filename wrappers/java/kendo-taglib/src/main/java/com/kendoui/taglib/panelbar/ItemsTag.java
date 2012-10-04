
package com.kendoui.taglib.panelbar;

import com.kendoui.taglib.BaseTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemsTag extends BaseTag /* interfaces */implements Item/* interfaces */ {

    @Override
    public int doStartTag() {
        return EVAL_BODY_INCLUDE;
    }
    
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

    @Override
    public void addItem(ItemTag value) {
        items.add(value.properties());
    }

//<< Attributes

}
