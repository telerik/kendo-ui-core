
package com.kendoui.taglib.notification;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.NotificationTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PositionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NotificationTag parent = (NotificationTag)findParentWithClass(NotificationTag.class);


        parent.setPosition(this);

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
        return "notification-position";
    }

    public float getBottom() {
        return (float)getProperty("bottom");
    }

    public void setBottom(float value) {
        setProperty("bottom", value);
    }

    public float getLeft() {
        return (float)getProperty("left");
    }

    public void setLeft(float value) {
        setProperty("left", value);
    }

    public boolean getPinned() {
        return (boolean)getProperty("pinned");
    }

    public void setPinned(boolean value) {
        setProperty("pinned", value);
    }

    public float getRight() {
        return (float)getProperty("right");
    }

    public void setRight(float value) {
        setProperty("right", value);
    }

    public float getTop() {
        return (float)getProperty("top");
    }

    public void setTop(float value) {
        setProperty("top", value);
    }

//<< Attributes

}
