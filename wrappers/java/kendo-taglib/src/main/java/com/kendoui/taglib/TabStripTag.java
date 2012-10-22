
package com.kendoui.taglib;


import com.kendoui.taglib.tabstrip.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TabStripTag extends WidgetWithItemsTag /* interfaces *//* interfaces */ {

    public TabStripTag() {
        super("TabStrip");
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
        return "tabStrip";
    }

    public void setActivate(ActivateTag value) {
        setProperty("activate", value.properties());
    }

    public void setContentLoad(ContentLoadTag value) {
        setProperty("contentload", value.properties());
    }

    public void setError(ErrorTag value) {
        setProperty("error", value.properties());
    }

    public void setSelect(SelectTag value) {
        setProperty("select", value.properties());
    }

    public void setAnimation(AnimationTag value) {
        setProperty("animation", value.properties());
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public boolean getCollapsible() {
        return (boolean)getProperty("collapsible");
    }

    public void setCollapsible(boolean value) {
        setProperty("collapsible", value);
    }

    public String getDataContentField() {
        return (String)getProperty("dataContentField");
    }

    public void setDataContentField(String value) {
        setProperty("dataContentField", value);
    }

    public String getDataContentUrlField() {
        return (String)getProperty("dataContentUrlField");
    }

    public void setDataContentUrlField(String value) {
        setProperty("dataContentUrlField", value);
    }

    public String getDataImageUrlField() {
        return (String)getProperty("dataImageUrlField");
    }

    public void setDataImageUrlField(String value) {
        setProperty("dataImageUrlField", value);
    }

    public String getDataSpriteCssClass() {
        return (String)getProperty("dataSpriteCssClass");
    }

    public void setDataSpriteCssClass(String value) {
        setProperty("dataSpriteCssClass", value);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String value) {
        setProperty("dataTextField", value);
    }

    public String getDataUrlField() {
        return (String)getProperty("dataUrlField");
    }

    public void setDataUrlField(String value) {
        setProperty("dataUrlField", value);
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String value) {
        setProperty("activate", new Function(value));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
