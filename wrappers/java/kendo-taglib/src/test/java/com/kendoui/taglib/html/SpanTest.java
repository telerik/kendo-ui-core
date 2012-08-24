package com.kendoui.taglib.html;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class SpanTest {
    private Span span;

    @Before
    public void setUp() {
        span = new Span();
    }

    @Test
    public void outerHtmlOutputsInputElement() throws IOException {
        assertEquals("<span></span>", span.outerHtml());
    }
}
