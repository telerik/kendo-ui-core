
package com.kendoui.taglib;


import com.kendoui.taglib.splitter.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SplitterTag extends WidgetTag /* interfaces *//* interfaces */ {

    public SplitterTag() {
        super("Splitter");
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

    public void setCollapse(CollapseTag value) {
        setProperty("collapse", value.properties());
    }

    public void setContentLoad(ContentLoadTag value) {
        setProperty("contentload", value.properties());
    }

    public void setExpand(ExpandTag value) {
        setProperty("expand", value.properties());
    }

    public void setLayoutChange(LayoutChangeTag value) {
        setProperty("layoutchange", value.properties());
    }

    public void setResize(ResizeTag value) {
        setProperty("resize", value.properties());
    }

    public void setPanes(PanesTag value) {

        setProperty("panes", value.panes());

    }

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String value) {
        setProperty("orientation", value);
    }

    public String getCollapse() {
        return ((Function)getProperty("collapse")).getBody();
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getExpand() {
        return ((Function)getProperty("expand")).getBody();
    }

    public void setExpand(String value) {
        setProperty("expand", new Function(value));
    }

    public String getLayoutChange() {
        return ((Function)getProperty("layoutChange")).getBody();
    }

    public void setLayoutChange(String value) {
        setProperty("layoutChange", new Function(value));
    }

    public String getResize() {
        return ((Function)getProperty("resize")).getBody();
    }

    public void setResize(String value) {
        setProperty("resize", new Function(value));
    }

//<< Attributes

}
