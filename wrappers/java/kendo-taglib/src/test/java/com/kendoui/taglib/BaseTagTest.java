package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import org.junit.Before;
import org.junit.Test;
import org.junit.Rule;

import org.junit.rules.ExpectedException;

public class BaseTagTest {
    private BaseTag tag;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        tag = new BaseTagTestDouble();
    }

    @Test
    public void findParentWithClassThrowsJspException() throws JspException {
        thrown.expect(JspException.class);
        thrown.expectMessage("The <kendo:baseTestDouble> tag should be nested in a <kendo:widget> tag.");

        tag.findParentWithClass(WidgetTag.class);
    }

    @Test
    public void findParentWithClassThrowsJspExceptionAndAppendsExtraInfo() throws JspException {
        thrown.expect(JspException.class);
        thrown.expectMessage("The <kendo:baseTestDouble> tag should be nested in a <kendo:foo> or <kendo:bar> tag.");

        tag.findParentWithClass(WidgetTag.class, "<kendo:foo> or <kendo:bar> tag");
    }
}
