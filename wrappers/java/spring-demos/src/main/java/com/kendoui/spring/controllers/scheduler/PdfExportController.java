package com.kendoui.spring.controllers.scheduler;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Task;
import com.kendoui.spring.models.TaskDao;

@Controller("scheduler-pdf-controller")
@RequestMapping(value = "/scheduler/")
public class PdfExportController {
    @Autowired
    private TaskDao task;

    @RequestMapping(value = { "/pdf-export" }, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        return "scheduler/pdf-export";
    }

    @RequestMapping(value = "/pdf-export/read", method = RequestMethod.POST)
    public @ResponseBody
    List<Task> read() {
        return task.getList();
    }

    @RequestMapping(value = "/pdf-export/create", method = RequestMethod.POST)
    public @ResponseBody
    List<Task> create(@RequestBody ArrayList<Map<String, Object>> models)
            throws ParseException {
        List<Task> tasks = new ArrayList<Task>();

        for (Map<String, Object> model : models) {
            Task task = new Task();

            task.setDescription((String) model.get("description"));
            task.setTitle((String) model.get("title"));

            SimpleDateFormat iso8601 = new SimpleDateFormat(
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

            task.setStart(iso8601.parse((String) model.get("start")));
            task.setEnd(iso8601.parse((String) model.get("end")));
            task.setIsAllDay((boolean) model.get("isAllDay"));
            task.setRecurrenceRule((String) model.get("recurrenceRule"));
            task.setRecurrenceException((String) model
                    .get("recurrenceException"));
            task.setRecurrenceId((Integer) model.get("recurrenceId"));
            task.setOwnerId((Integer) model.get("ownerId"));

            tasks.add(task);
        }

        task.saveOrUpdate(tasks);

        return tasks;
    }

    @RequestMapping(value = "/pdf-export/update", method = RequestMethod.POST)
    public @ResponseBody
    List<Task> update(@RequestBody ArrayList<Map<String, Object>> models)
            throws ParseException {
        List<Task> tasks = new ArrayList<Task>();

        for (Map<String, Object> model : models) {
            Task task = new Task();

            task.setTaskId((int) model.get("taskId"));
            task.setDescription((String) model.get("description"));
            task.setTitle((String) model.get("title"));

            SimpleDateFormat iso8601 = new SimpleDateFormat(
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

            task.setStart(iso8601.parse((String) model.get("start")));
            task.setEnd(iso8601.parse((String) model.get("end")));
            task.setIsAllDay((boolean) model.get("isAllDay"));
            task.setRecurrenceRule((String) model.get("recurrenceRule"));
            task.setRecurrenceException((String) model
                    .get("recurrenceException"));
            task.setRecurrenceId((Integer) model.get("recurrenceId"));
            task.setOwnerId((Integer) model.get("ownerId"));

            tasks.add(task);
        }

        task.saveOrUpdate(tasks);

        return tasks;
    }

    @RequestMapping(value = "/pdf-export/destroy", method = RequestMethod.POST)
    public @ResponseBody
    List<Task> destroy(@RequestBody ArrayList<Map<String, Object>> models) {
        List<Task> tasks = new ArrayList<Task>();

        for (Map<String, Object> model : models) {
            Task task = new Task();

            task.setTaskId((int) model.get("taskId"));

            tasks.add(task);
        }

        task.delete(tasks);

        return tasks;
    }

    @RequestMapping(value = "/pdf-export/save", method = RequestMethod.POST)
    public @ResponseBody
    void save(String fileName, String base64, String contentType,
            HttpServletResponse response) throws IOException {

        response.setHeader("Content-Disposition", "attachment;filename="
                + fileName);
        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }
}