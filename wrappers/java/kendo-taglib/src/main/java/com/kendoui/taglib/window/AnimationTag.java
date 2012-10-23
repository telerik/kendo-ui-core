
package com.kendoui.taglib.window;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.WindowTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        WindowTag parent = (WindowTag)findParentWithClass(WindowTag.class);


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
        return "window-animation";
    }

    public Object getClose() {
        return (Object)getProperty("close");
    }

    public void setClose(Object value) {
        setProperty("close", value);
    }

    public Object getOpen() {
        return (Object)getProperty("open");
    }

    public void setOpen(Object value) {
        setProperty("open", value);
    }

//<< Attributes

}
