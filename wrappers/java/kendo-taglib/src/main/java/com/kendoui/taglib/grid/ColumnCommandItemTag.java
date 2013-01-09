
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;





import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnCommandItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ColumnCommandTag parent = (ColumnCommandTag)findParentWithClass(ColumnCommandTag.class);

        parent.addCommandItem(this);

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
        return "grid-column-commandItem";
    }

    public void setClick(ColumnCommandItemClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public String getClassName() {
        return (String)getProperty("className");
    }

    public void setClassName(String value) {
        setProperty("className", value);
    }

    public String getClick() {
        Function property = ((Function)getProperty("click"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClick(String value) {
        setProperty("click", new Function(value));
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

//<< Attributes

}
