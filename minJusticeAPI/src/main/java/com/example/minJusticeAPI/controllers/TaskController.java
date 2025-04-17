package com.example.minJusticeAPI.controllers;

import com.example.minJusticeAPI.models.Task;
import com.example.minJusticeAPI.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/tasks")
@RestController
public class TaskController {
    @Autowired
    private final TaskRepository taskRepository;

    TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id " + id));
    }
    //get all tasks
    @GetMapping("/all")
    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        if (tasks.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Tasks found");
        }
        return tasks;
    }
    // Create a new task
    @PostMapping("/create")
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
    @PatchMapping("/update/desc/{id}/{newDesc}")
    public void updateDesc(@PathVariable Long id, @PathVariable String newDesc){
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id " + id));
        task.setDesc(newDesc);
        taskRepository.save(task);
    }

    @PatchMapping("/update/dueDate/{id}/{newDueDate}")
    public void updateDueDate(@PathVariable Long id, @PathVariable String newDueDate){
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id " + id));
        task.setDueDate(newDueDate);
        taskRepository.save(task);
    }

    @PatchMapping("/update/status/{id}/{newStatus}")
    public void updateStatus(@PathVariable Long id, @PathVariable boolean newStatus){
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id " + id));
        task.setStatus(newStatus);
        taskRepository.save(task);
    }

}
