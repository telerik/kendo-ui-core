
package com.kendoui.taglib.treeview;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TreeViewTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeViewTag parent = (TreeViewTag)findParentWithClass(TreeViewTag.class);


        parent.setMessages(this);

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
        return "treeView-messages";
    }

    public java.lang.String getLoading() {
        return (java.lang.String)getProperty("loading");
    }

    public void setLoading(java.lang.String value) {
        setProperty("loading", value);
    }

    public java.lang.String getRequestFailed() {
        return (java.lang.String)getProperty("requestFailed");
    }

    public void setRequestFailed(java.lang.String value) {
        setProperty("requestFailed", value);
    }

    public java.lang.String getRetry() {
        return (java.lang.String)getProperty("retry");
    }

    public void setRetry(java.lang.String value) {
        setProperty("retry", value);
    }

//<< Attributes

}
