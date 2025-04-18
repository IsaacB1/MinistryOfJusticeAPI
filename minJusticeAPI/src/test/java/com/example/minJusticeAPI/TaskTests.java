package com.example.minJusticeAPI;

import com.example.minJusticeAPI.controllers.TaskController;
import com.example.minJusticeAPI.models.Task;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TaskTests {

	@Autowired
	private TaskController taskController;
	private Task savedTask1;
	private Task savedTask2;

	@BeforeEach
	void setUp() {
		taskController.deleteAll(); 
		Task task1 = new Task();
		task1.setDesc("Test Task1");
		task1.setStatus(false);
		task1.setDueDate("20-04-2025");
		savedTask1 = taskController.createTask(task1);

		Task task2 = new Task();
		task2.setDesc("Test Task2");
		task2.setStatus(true);
		task2.setDueDate("21-05-2025");
		savedTask2 = taskController.createTask(task2);
	}


	@Test
	void findTaskById() {
		Task task_new = taskController.getTaskById(savedTask1.getId());
		assertEquals(savedTask1.getDesc(), task_new.getDesc());
		assertEquals(savedTask1.getStatus(), task_new.getStatus());
		assertEquals(savedTask1.getDueDate(), task_new.getDueDate());
		System.out.println(task_new.toString());
	}

	@Test 
	void getAllTasks(){
		assertEquals(taskController.getAllTasks().size(),2);
	}

	@Test 
	void deleteTask(){
		taskController.deleteTask(savedTask1.getId());
		assertEquals(taskController.getAllTasks().size(),1);
	}

	@Test void updateTitle(){
		taskController.updateTitle(savedTask1.getId(), "newTitle");
		assertEquals("newTitle", taskController.getTaskById(savedTask1.getId()).getTitle());
	}

	@Test void updateDesc(){
		taskController.updateDesc(savedTask1.getId(), "whole new desc");
		assertEquals("whole new desc", taskController.getTaskById(savedTask1.getId()).getDesc());
	}

	@Test void updateStatus(){
		taskController.updateStatus(savedTask1.getId(), true);
		assertEquals(true, taskController.getTaskById(savedTask1.getId()).getStatus());
	}

	@Test void updateDueDate(){
		taskController.updateDueDate(savedTask1.getId(), "13-04-2004");
		assertEquals("13-04-2004", taskController.getTaskById(savedTask1.getId()).getDueDate());
	}

}
