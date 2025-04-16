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
}
