package com.kendoui.spring.controllers.diagram;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.OrgChartShape;
import com.kendoui.spring.models.OrgChartShapeDao;

@Controller("dataviz-diagram-home-controller")
@RequestMapping(value="/diagram/")
public class IndexController {
    @Autowired 
    private OrgChartShapeDao orgShape;   
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/diagram/index";
    }
    
    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartShape> read() {
        return orgShape.getList();
    }
    
    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartShape> readConnections() {
        return orgShape.getList();
    }
}
