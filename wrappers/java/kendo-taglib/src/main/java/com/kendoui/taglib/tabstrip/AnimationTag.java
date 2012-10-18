
package com.kendoui.taglib.tabstrip;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces */implements Close, Open/* interfaces */ {

    
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

    public static String tagName() {
        return "tabStrip-animation";
    }

    @Override
    public void setClose(CloseTag value) {
        setProperty("close", value.properties());
    }

    @Override
    public void setOpen(OpenTag value) {
        setProperty("open", value.properties());
    }

//<< Attributes

}
