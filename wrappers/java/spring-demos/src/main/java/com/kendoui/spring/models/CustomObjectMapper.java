package com.kendoui.spring.models;


import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig.Feature;
import org.codehaus.jackson.map.module.SimpleModule;

public class CustomObjectMapper extends ObjectMapper {

    public CustomObjectMapper(){
        super();
        
        SimpleModule module = new SimpleModule("JsonModule", new Version(1 , 0, 0, null));
        
        module.addSerializer(Date.class, new IsoDateJsonSerializer());
        
        registerModule(module);
    }
}