package com.kendoui.taglib;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;

import org.junit.Before;
import org.junit.Test;

import com.kendoui.taglib.html.Element;

public class BaseTagTest {
    private BaseTagTestDouble tag;
    private PageContext pageContext;

    @Before
    public void setUp() {
        tag = spy(new BaseTagTestDouble());

        pageContext = mock(PageContext.class);

        tag.setPageContext(pageContext);
    }

    @Test
    public void doEndTagWritesTheName() throws JspException {
        JspWriter out = mock(JspWriter.class);

        when(pageContext.getOut()).thenReturn(out);

        tag.doEndTag();

        verify(tag).getName();
    }

    @Test
    public void htmlReturnsElement() {
        assertTrue(tag.html() instanceof Element);
    }

    @Test
    public void scriptReturnsPluginInitializationStatement() throws IOException {
        tag.setName("foo");
        tag.setFoo("foo");

        assertEquals("jQuery(\"#foo\").kendoFoo({\"foo\":\"foo\"});", tag.script());
    }
}
