
package com.kendoui.taglib;


import com.kendoui.taglib.splitter.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SplitterTag extends WidgetTag /* interfaces *//* interfaces */ {

    public SplitterTag() {
        super("Splitter");
    }

    @Override
    protected Element<?> createElement() {
        Element<?> element = super.createElement();

        element.html(body());

        return element;
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "splitter";
    }

    public void setPanes(PanesTag value) {

        setProperty("panes", value.panes());

    }

    public void setCollapse(CollapseFunctionTag value) {
        setEvent("collapse", value.getBody());
    }

    public void setContentLoad(ContentLoadFunctionTag value) {
        setEvent("contentLoad", value.getBody());
    }

    public void setExpand(ExpandFunctionTag value) {
        setEvent("expand", value.getBody());
    }

    public void setLayoutChange(LayoutChangeFunctionTag value) {
        setEvent("layoutChange", value.getBody());
    }

    public void setResize(ResizeFunctionTag value) {
        setEvent("resize", value.getBody());
    }

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String value) {
        setProperty("orientation", value);
    }

    public String getCollapse() {
        Function property = ((Function)getProperty("collapse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getContentLoad() {
        Function property = ((Function)getProperty("contentLoad"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getExpand() {
        Function property = ((Function)getProperty("expand"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExpand(String value) {
        setProperty("expand", new Function(value));
    }

    public String getLayoutChange() {
        Function property = ((Function)getProperty("layoutChange"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setLayoutChange(String value) {
        setProperty("layoutChange", new Function(value));
    }

    public String getResize() {
        Function property = ((Function)getProperty("resize"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResize(String value) {
        setProperty("resize", new Function(value));
    }

//<< Attributes

}
