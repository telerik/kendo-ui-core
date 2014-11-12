package com.kendoui.spring.controllers.gantt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;


import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.GanttAssignment;
import com.kendoui.spring.models.GanttAssignmentDao;
import com.kendoui.spring.models.GanttResource;
import com.kendoui.spring.models.GanttResourceDao;

@Controller("gantt-resources-controller")
@RequestMapping(value="/gantt/")
public class ResourcesController {
    @Autowired
    private GanttResourceDao resourcesDao;
    
    @Autowired
    private GanttAssignmentDao assignmentsDao;
    
    @RequestMapping(value = {"/resources"}, method = RequestMethod.GET)
    public String resources(Locale locale, Model model) {        
        return "gantt/resources";
    }
    
    @RequestMapping(value = "/resources/read", method = RequestMethod.POST)
    public @ResponseBody List<GanttResource> read_resources() {
        return resourcesDao.getList();
    }
    
    @RequestMapping(value = "/assignments/read", method = RequestMethod.POST)
    public @ResponseBody List<GanttAssignment> read_assignments() {
        return assignmentsDao.getList();
    }
    
    @RequestMapping(value = "/assignments/create", method = RequestMethod.POST)
    public @ResponseBody List<GanttAssignment> create_assignment(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttAssignment> newAssignments = new ArrayList<GanttAssignment>();
        
        for (Map<String, Object> model : models) {
            GanttAssignment assignment = new GanttAssignment();            
            
            assignment.setId((int)model.get("id"));
            assignment.setTaskId((int)model.get("taskId"));
            assignment.setResourceId((int)model.get("resourceId"));
            assignment.setUnits(Double.parseDouble(model.get("units").toString()));
            
            newAssignments.add(assignment);
        }
        
        assignmentsDao.saveOrUpdate(newAssignments);
        
        return newAssignments;
    }
    
    @RequestMapping(value = "/assignments/update", method = RequestMethod.POST)
    public @ResponseBody List<GanttAssignment> update_assignment(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttAssignment> updatedAssignments = new ArrayList<GanttAssignment>();
        
        for (Map<String, Object> model : models) {
            GanttAssignment assignment = new GanttAssignment();
            
            assignment.setId((int)model.get("id"));
            assignment.setTaskId((int)model.get("taskId"));
            assignment.setResourceId((int)model.get("resourceId"));
            assignment.setUnits(Double.parseDouble(model.get("units").toString()));
            
            updatedAssignments.add(assignment);
        }
        
        assignmentsDao.saveOrUpdate(updatedAssignments);
        
        return updatedAssignments;
    }
    
    @RequestMapping(value = "/assignments/destroy", method = RequestMethod.POST)
    public @ResponseBody List<GanttAssignment> destroy_assignment(@RequestBody ArrayList<Map<String, Object>> models) {
        List<GanttAssignment> deletedAssignments = new ArrayList<GanttAssignment>();
        
        for (Map<String, Object> model : models) {
            GanttAssignment assignment = new GanttAssignment();
            
            assignment.setId((int)model.get("id"));
            
            deletedAssignments.add(assignment);
        }
        
        assignmentsDao.delete(deletedAssignments);
        
        return deletedAssignments;
    } 
}
