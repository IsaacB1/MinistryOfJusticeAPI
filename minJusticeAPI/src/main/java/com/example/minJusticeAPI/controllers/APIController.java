package com.example.minJusticeAPI.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api")
public class APIController {
    @GetMapping("/hello")
    public String hello(){
        return "Connected to API";
    }
}
