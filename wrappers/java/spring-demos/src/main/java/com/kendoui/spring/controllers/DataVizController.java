package com.kendoui.spring.controllers;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kendoui.spring.navigation.Widget;

@Controller
@RequestMapping(value="/dataviz/")
public class DataVizController {
    @Autowired
    private HttpServletRequest request;
    
    @RequestMapping(value="/")
    public String index(Model model) throws JsonParseException, JsonMappingException, IOException {
        
        String path = request.getSession().getServletContext().getRealPath("/resources/dataviz.nav.json");
        
        ObjectMapper mapper = new ObjectMapper(new JsonFactory());
        
        HashMap<String, Widget[]> navigation = mapper.readValue(new File(path), new TypeReference<HashMap<String,Widget[]>>() {}); 
        
        navigation.remove("Sample Dashboards");
        
        model.addAttribute("navigation", navigation);
        
        return "dataviz/index";
    }
}
