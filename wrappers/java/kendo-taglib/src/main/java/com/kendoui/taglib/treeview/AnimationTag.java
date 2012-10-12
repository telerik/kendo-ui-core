
package com.kendoui.taglib.treeview;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces */implements Collapse, Expand/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Animation parent = (Animation)findParentWithClass(Animation.class);

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

    @Override
    public void setCollapse(CollapseTag value) {
        setProperty("collapse", value.properties());
    }

    @Override
    public void setExpand(ExpandTag value) {
        setProperty("expand", value.properties());
    }

//<< Attributes

}
