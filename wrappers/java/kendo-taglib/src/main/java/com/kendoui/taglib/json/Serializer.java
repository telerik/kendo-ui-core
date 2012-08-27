package com.kendoui.taglib.json;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import java.util.Map.Entry;

public class Serializer {

    private Map<String, Object> options(Object object) {
        Map<String, Object> options = new HashMap<String, Object>();

        try {
            for (PropertyDescriptor property : Introspector.getBeanInfo(object.getClass(), Object.class).getPropertyDescriptors()) {
                Method getter = property.getReadMethod();

                if (getter != null) {
                    options.put(property.getName(), getter.invoke(object));
                }
            }
        } catch (IntrospectionException e) {
        } catch (IllegalAccessException e) {
        } catch (IllegalArgumentException e) {
        } catch (InvocationTargetException e) {
        }

        return options;
    }

    public void serialize(Writer out, Object object) throws IOException {
        out.append("{");

        Map<String, Object> options = options(object);

        Iterator<Entry<String, Object>> iterator = options.entrySet().iterator();

        while (iterator.hasNext()) {
            Entry<String, Object> option = iterator.next();

            out.append("\"")
               .append(option.getKey())
               .append("\":");

            out.append(option.getValue().toString());

            if (iterator.hasNext()) {
                out.append(",");
            }
        }

        out.append("}");
    }

    public String json(Object object) throws IOException {
        StringWriter out = new StringWriter();

        serialize(out, object);

        return out.toString();
    }
}
