package com.kendoui.spring.controllers.scheduler;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.TaskDao;

@Controller("scheduler-home-controller")
@RequestMapping(value="/web/scheduler/")
public class IndexController {
    @Autowired 
    private TaskDao task;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {        
        return "web/scheduler/index";
    }
    
    @RequestMapping(value = "/tasks", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult tasks(@RequestBody DataSourceRequest request) {

        return task.getList(request);
    }
}