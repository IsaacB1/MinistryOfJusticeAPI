package com.example.minJusticeAPI.controllers;

import com.example.minJusticeAPI.models.Task;
import com.example.minJusticeAPI.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
public class TaskController {
    @Autowired
    private final TaskRepository taskRepository;

    TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Long id) {
       return taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id " + id));
    }
    // Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

}
