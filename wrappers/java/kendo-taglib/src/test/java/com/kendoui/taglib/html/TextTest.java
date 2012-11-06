package com.kendoui.taglib.html;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.junit.Before;
import org.junit.Test;

public class TextTest {

    private Text text;

    @Before
    public void setUp() {
        text = new Text();
    }

    @Test
    public void writeOutputsTheValue() throws IOException {
        text.value("foo");

        Writer out = new StringWriter();

        text.write(out);

        assertEquals("foo", out.toString());
    }

    @Test
    public void valueReturnsSelf() {
        assertEquals(text, text.value("foo"));
    }

    @Test
    public void valueEncodesEntities() throws IOException {
        text.value("<a>&");

        Writer out = new StringWriter();

        text.write(out);

        assertEquals("&lt;a&gt;&amp;", out.toString());
    }
    
    @Test
    public void valuePreventsServerExceptionIfNullIsPassed() {
        Boolean thrown = false;
        try {
            text.value(null);
        } catch(Exception e) {
            thrown = true;
        }
        assertEquals(thrown, false);
    }
}
