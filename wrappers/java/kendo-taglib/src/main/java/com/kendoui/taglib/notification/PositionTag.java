
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

    public java.lang.Object getBottom() {
        return (java.lang.Object)getProperty("bottom");
    }

    public void setBottom(java.lang.Object value) {
        setProperty("bottom", value);
    }

    public java.lang.Object getLeft() {
        return (java.lang.Object)getProperty("left");
    }

    public void setLeft(java.lang.Object value) {
        setProperty("left", value);
    }

    public boolean getPinned() {
        return (boolean)getProperty("pinned");
    }

    public void setPinned(boolean value) {
        setProperty("pinned", value);
    }

    public java.lang.Object getRight() {
        return (java.lang.Object)getProperty("right");
    }

    public void setRight(java.lang.Object value) {
        setProperty("right", value);
    }

    public java.lang.Object getTop() {
        return (java.lang.Object)getProperty("top");
    }

    public void setTop(java.lang.Object value) {
        setProperty("top", value);
    }

//<< Attributes

}
