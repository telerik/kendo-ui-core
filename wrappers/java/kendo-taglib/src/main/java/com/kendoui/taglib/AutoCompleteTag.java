package com.kendoui.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;

@SuppressWarnings("serial")
public class AutoCompleteTag extends BaseTag implements DataBoundWidget {

    public AutoCompleteTag() {
        super("AutoComplete");
    }

    @Override
    public int doEndTag() throws JspException {
        JspWriter writer = pageContext.getOut();

        try {
            writer.print("<input type=\"text\" value=\"it is works!!!\" />");
        } catch (IOException ex) {
            throw new JspTagException(ex);
        }

        return EVAL_PAGE;
    }

    @Override
    public void setDataSource(DataSource dataSource) {

    }

    @Override
    protected Element<?> createElement() {
        return new Input();
    }
}
