
package com.kendoui.taglib.toolbar;


import com.kendoui.taglib.BaseTag;




import com.kendoui.taglib.editor.ToolTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemMenuButtonsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        ItemTag parent = (ItemTag)findParentWithClass(ItemTag.class);

        parent.setMenuButtons(this);
        parent.setProperty("items", this.menuButtons);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        menuButtons = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> menuButtons;

    public List<Map<String, Object>> menuButtons() {
        return menuButtons;
    }

    public static String tagName() {
        return "toolBar-item-menuButtons";
    }

    public void addMenuButton(ItemMenuButtonTag value) {
        menuButtons.add(value.properties());
    }

//<< Attributes

}
