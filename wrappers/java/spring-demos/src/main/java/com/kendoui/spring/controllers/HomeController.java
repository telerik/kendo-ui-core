package com.kendoui.spring.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
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

import com.kendoui.spring.navigation.Example;
import com.kendoui.spring.navigation.Widget;

@Controller
@RequestMapping(value = "/")
public class HomeController {
    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "/")
    public String index(Model model) throws JsonParseException,
            JsonMappingException, IOException {
        ServletContext context = request.getSession().getServletContext();

        String path = context.getRealPath("/resources/nav.json");

        ObjectMapper mapper = new ObjectMapper(new JsonFactory());

        Widget[] navigation = mapper.readValue(new File(path),
                new TypeReference<Widget[]>() {
                });

        for (Widget widget : navigation) {
            List<Example> examples = new ArrayList<Example>();

            for (Example example : widget.getItems()) {
                path = context.getRealPath("WEB-INF/views/" + example.getUrl()
                        + ".jsp");

                if (new File(path).exists()) {
                    examples.add(example);
                }
            }

            widget.setItems(examples.toArray(new Example[examples.size()]));
        }

        model.addAttribute("navigation", navigation);
        return "index";
    }
}
