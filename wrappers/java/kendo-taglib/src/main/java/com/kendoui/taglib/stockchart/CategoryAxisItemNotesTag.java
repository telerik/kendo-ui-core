
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemNotesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemTag parent = (CategoryAxisItemTag)findParentWithClass(CategoryAxisItemTag.class);


        parent.setNotes(this);

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
        return "stockChart-categoryAxisItem-notes";
    }

    public void setData(CategoryAxisItemNotesDataTag value) {

        setProperty("data", value.data());

    }

    public void setIcon(com.kendoui.taglib.stockchart.CategoryAxisItemNotesIconTag value) {
        setProperty("icon", value);
    }

    public void setLabel(com.kendoui.taglib.stockchart.CategoryAxisItemNotesLabelTag value) {
        setProperty("label", value);
    }

    public void setLine(com.kendoui.taglib.stockchart.CategoryAxisItemNotesLineTag value) {
        setProperty("line", value);
    }

//<< Attributes

}
