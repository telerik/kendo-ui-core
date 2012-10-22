package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import org.junit.Before;
import org.junit.Test;
import org.junit.Rule;

import org.junit.rules.ExpectedException;

import com.kendoui.taglib.datasource.SchemaTag;

public class BaseTagTest {
    private BaseTag tag;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        tag = new BaseTagTestDouble();
    }

    @Test
    public void findParentWithClassThrowsJspExceptionAndUsesTagNAme() throws JspException {
        thrown.expect(JspException.class);
        thrown.expectMessage("The <kendo:baseTagTestDouble> tag should be nested in a <kendo:dataSource-schema> tag.");

        tag.findParentWithClass(SchemaTag.class);
    }
}
