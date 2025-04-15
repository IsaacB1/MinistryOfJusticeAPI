package com.example.minJusticeAPI.repositories;

import com.example.minJusticeAPI.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
