package com.kendoui.spring.controllers.treemap;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.PopulationUSA;
import com.kendoui.spring.models.TreeMapDataRepository;

@Controller("dataviz-treemap-home-controller")
@RequestMapping(value="/treemap/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/treemap/index";
    }
    
    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
    public @ResponseBody List<PopulationUSA> read() {
        return TreeMapDataRepository.PopulationUSAData();
    }
}