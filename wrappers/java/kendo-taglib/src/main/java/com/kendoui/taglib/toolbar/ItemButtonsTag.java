
package com.kendoui.taglib.toolbar;


import com.kendoui.taglib.BaseTag;





import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemButtonsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag
        
        ItemTag parent = (ItemTag)findParentWithClass(ItemTag.class);

        parent.setButtons(this);
        parent.setProperty("items", this.buttons);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        buttons = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> buttons;

    public List<Map<String, Object>> buttons() {
        return buttons;
    }

    public static String tagName() {
        return "toolBar-item-buttons";
    }

    public void addButton(ItemButtonTag value) {
        buttons.add(value.properties());
    }

//<< Attributes

}
