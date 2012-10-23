
package com.kendoui.taglib.treeview;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.TreeViewTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeViewTag parent = (TreeViewTag)findParentWithClass(TreeViewTag.class);


        parent.setAnimation(this);

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

//>> Attributes

    public static String tagName() {
        return "treeView-animation";
    }

    public void setCollapse(CollapseTag value) {
        setProperty("collapse", value);
    }

    public void setExpand(ExpandTag value) {
        setProperty("expand", value);
    }

//<< Attributes

}
