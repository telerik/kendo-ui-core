package com.kendoui.spring.controllers.diagram;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DiagramDataRepository;
import com.kendoui.spring.models.DiagramNode;

@Controller("dataviz-diagram-layout-controller")
@RequestMapping(value="/diagram/")
public class LayoutController {
    @RequestMapping(value = {"/layout"}, method = RequestMethod.GET)
    public String index() {
        return "/diagram/layout";
    }
    
    @RequestMapping(value = "/layout/read", method = RequestMethod.POST)
    public @ResponseBody List<DiagramNode> read() {
        return DiagramDataRepository.DiagramNodes();
    }
}
