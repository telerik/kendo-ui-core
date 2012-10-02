
package com.kendoui.taglib.panelbar;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces */implements Close, Open/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Animation parent = (Animation)findParentWithClass(Animation.class);

        parent.setAnimation(this);

        return EVAL_PAGE;
    }

    @Override
    public void setClose(CloseTag value) {
        setProperty("close", value);
    }

    @Override
    public void setOpen(OpenTag value) {
        setProperty("open", value);
    }

//<< Attributes
}
