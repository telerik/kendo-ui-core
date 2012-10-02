
package com.kendoui.taglib.treeview;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces */implements Collapse, Expand/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Animation parent = (Animation)findParentWithClass(Animation.class);

        parent.setAnimation(this);

        return EVAL_PAGE;
    }

    @Override
    public void setCollapse(CollapseTag value) {
        setProperty("collapse", value);
    }

    @Override
    public void setExpand(ExpandTag value) {
        setProperty("expand", value);
    }

//<< Attributes
}
