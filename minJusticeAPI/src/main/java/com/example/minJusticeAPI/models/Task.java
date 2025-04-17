package com.example.minJusticeAPI.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Task {

    @Id
    @GeneratedValue private Long id;
    private String title;
    private String desc;
    private boolean status;
    private String dueDate;
    public Long getId() {return id;}
    public String getTitle() {return title;}
    public String getDesc() {return desc;}
    public boolean getStatus() {return status;}
    public String getDueDate() {return dueDate;}
    public void setId(Long newId){this.id = newId;}
    public void setTitle(String newTitle){this.title = newTitle;}
    public void setDesc(String newDesc){this.desc = newDesc;}
    public void setStatus(boolean newStatus){this.status= newStatus;}
    public void setDueDate(String newDueDate){this.dueDate = newDueDate;}

    @Override
    public String toString(){
        return "Task with id " + this.id + " title:" + this.title + " description - " + this.desc + " Status: " + this.status + " with a due date of " + this.dueDate;
    }
}
