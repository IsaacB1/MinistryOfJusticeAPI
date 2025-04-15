package com.example.minJusticeAPI;

import com.example.minJusticeAPI.controllers.TaskController;
import com.example.minJusticeAPI.models.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TaskTests {

	@Autowired
	private TaskController taskController;
	private Task savedTask;

	@BeforeEach
	void setUp() {
		Task task = new Task();
		task.setDesc("Test Task");
		task.setStatus(false);
		task.setDueDate("20/04/2025");
		savedTask = taskController.createTask(task);
	}
	@Test
	void findTaskById() {
		Task task_new = taskController.getTaskById(1L);
		assertEquals(savedTask.getDesc(), task_new.getDesc());
		assertEquals(savedTask.getStatus(), task_new.getStatus());
		assertEquals(savedTask.getDueDate(), task_new.getDueDate());
		System.out.println(task_new.toString());
	}

}
