package com.kendoui.taglib.json;

import java.io.IOException;
import java.io.Writer;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

import static org.mockito.Mockito.*;

public class SerializerTest {
    Serializer serializer;

    @Before
    public void setUp() {
        serializer = new Serializer();
    }

    @Test
    public void serializeOutputsOpeningBrace() throws IOException {
        Writer out = mock(Writer.class);

        serializer.serialize(out, new Object());

        verify(out).append("{");
    }

    @Test
    public void serializeOutputsClosingBrace() throws IOException {
        Writer writer = mock(Writer.class);

        serializer.serialize(writer, new Object());

        verify(writer).append("}");
    }

    @Test
    public void jsonReturnsSerializedObject() throws IOException {
        assertEquals("{}", serializer.json(new Object()));
    }

    @Test
    public void jsonSerializesKeyValuePairForGetter() throws IOException {
        assertEquals("{\"foo\":1}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public int getFoo() {
                return 1;
            }
        }));
    }

    @Test
    public void jsonSerializesCommaSeparatedKeyValuePairsForTheGetters() throws IOException {
        assertEquals("{\"foo\":1,\"bar\":2}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public int getFoo() {
                return 1;
            }

            @SuppressWarnings("unused")
            public int getBar() {
                return 2;
            }
        }));
    }
}
