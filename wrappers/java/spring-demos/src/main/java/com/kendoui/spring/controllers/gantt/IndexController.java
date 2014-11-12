package com.kendoui.spring.controllers.gantt;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.GanttDependency;
import com.kendoui.spring.models.GanttDependencyDao;
import com.kendoui.spring.models.GanttTask;
import com.kendoui.spring.models.GanttTaskDao;

@Controller("gantt-home-controller")
@RequestMapping(value="/gantt/")
public class IndexController {
    @Autowired 
    private GanttTaskDao taskDao;
    
    @Autowired 
    private GanttDependencyDao dependencyDao;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {        
        return "gantt/index";
    }
    
    @RequestMapping(value = "/tasks/read", method = RequestMethod.POST)
    public @ResponseBody List<GanttTask> read_tasks() {
        return taskDao.getList();
    }
    
    @RequestMapping(value = "/tasks/create", method = RequestMethod.POST)
    public @ResponseBody List<GanttTask> create_task(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttTask> newTasks = new ArrayList<GanttTask>();
        
        for (Map<String, Object> model : models) {
            GanttTask task = new GanttTask();
            
            task.setTitle((String)model.get("title"));
            
            SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));
            
            task.setStart(iso8601.parse((String)model.get("start")));
            task.setEnd(iso8601.parse((String)model.get("end")));
            task.setSummary((boolean)model.get("summary"));
            task.setExpanded((boolean)model.get("expanded"));
            task.setParentId((Integer)model.get("parentId"));
            task.setOrderId((int)model.get("orderId"));
            task.setPercentComplete(Double.parseDouble(model.get("percentComplete").toString()));
            
            newTasks.add(task);
        }
        
        taskDao.saveOrUpdate(newTasks);
        
        return newTasks;
    }
    
    @RequestMapping(value = "/tasks/update", method = RequestMethod.POST)
    public @ResponseBody List<GanttTask> update_task(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttTask> updatedTasks = new ArrayList<GanttTask>();
        
        for (Map<String, Object> model : models) {
            GanttTask task = new GanttTask();
            
            task.setId((int)model.get("id"));
            task.setTitle((String)model.get("title"));
            
            SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));
            
            task.setStart(iso8601.parse((String)model.get("start")));
            task.setEnd(iso8601.parse((String)model.get("end")));
            task.setSummary((boolean)model.get("summary"));
            task.setExpanded((boolean)model.get("expanded"));
            task.setParentId((Integer)model.get("parentId"));
            task.setOrderId((int)model.get("orderId"));
            task.setPercentComplete(Double.parseDouble(model.get("percentComplete").toString()));
            
            updatedTasks.add(task);
        }
        
        taskDao.saveOrUpdate(updatedTasks);
        
        return updatedTasks;
    }
    
    @RequestMapping(value = "/tasks/destroy", method = RequestMethod.POST)
    public @ResponseBody List<GanttTask> destroy_task(@RequestBody ArrayList<Map<String, Object>> models) {
        List<GanttTask> deletedTasks = new ArrayList<GanttTask>();
        
        for (Map<String, Object> model : models) {
            GanttTask task = new GanttTask();
            
            task.setId((int)model.get("id"));
            
            deletedTasks.add(task);
        }
        
        taskDao.delete(deletedTasks);
        
        return deletedTasks;
    } 
    
    @RequestMapping(value = "/dependencies/read", method = RequestMethod.POST)
    public @ResponseBody List<GanttDependency> read_dependencies() {
        return dependencyDao.getList();
    }
    
    @RequestMapping(value = "/dependencies/create", method = RequestMethod.POST)
    public @ResponseBody List<GanttDependency> create_dependency(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttDependency> newDependencies = new ArrayList<GanttDependency>();
        
        for (Map<String, Object> model : models) {
            GanttDependency dependency = new GanttDependency();
            
            dependency.setPredecessorId((int)model.get("predecessorId"));
            dependency.setSuccessorId((int)model.get("successorId"));
            dependency.setType((int)model.get("type"));
            
            newDependencies.add(dependency);
        }
        
        dependencyDao.saveOrUpdate(newDependencies);
        
        return newDependencies;
    }
    
    @RequestMapping(value = "/dependencies/update", method = RequestMethod.POST)
    public @ResponseBody List<GanttDependency> update_dependency(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
        List<GanttDependency> updatedDependencies = new ArrayList<GanttDependency>();
        
        for (Map<String, Object> model : models) {
            GanttDependency dependency = new GanttDependency();
            
            dependency.setId((int)model.get("id"));

            dependency.setPredecessorId((int)model.get("predecessorId"));
            dependency.setSuccessorId((int)model.get("successorId"));
            dependency.setType((int)model.get("type"));    
            
            updatedDependencies.add(dependency);
        }
        
        dependencyDao.saveOrUpdate(updatedDependencies);
        
        return updatedDependencies;
    }
    
    @RequestMapping(value = "/dependencies/destroy", method = RequestMethod.POST)
    public @ResponseBody List<GanttDependency> destroy_dependency(@RequestBody ArrayList<Map<String, Object>> models) {
        List<GanttDependency> deletedDependencies = new ArrayList<GanttDependency>();
        
        for (Map<String, Object> model : models) {
            GanttDependency dependency = new GanttDependency();
            
            dependency.setId((int)model.get("id"));
            
            deletedDependencies.add(dependency);
        }
        
        dependencyDao.delete(deletedDependencies);
        
        return deletedDependencies;
    } 
}