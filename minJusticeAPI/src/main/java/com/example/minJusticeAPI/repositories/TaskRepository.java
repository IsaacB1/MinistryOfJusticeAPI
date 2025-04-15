package com.example.minJusticeAPI.repositories;

import com.example.minJusticeAPI.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
