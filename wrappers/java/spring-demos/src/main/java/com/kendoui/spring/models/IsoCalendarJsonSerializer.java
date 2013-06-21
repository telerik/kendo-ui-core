package com.kendoui.spring.models;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class IsoCalendarJsonSerializer extends JsonSerializer<Calendar> {  
    @Override
    public void serialize(Calendar value, JsonGenerator gen, SerializerProvider sp) throws 
        IOException, JsonProcessingException {      

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        
        String formattedDate = formatter.format(value.getTime());

        gen.writeString(formattedDate);
    }
}