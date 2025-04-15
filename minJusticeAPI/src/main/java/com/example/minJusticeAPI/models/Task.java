package com.example.minJusticeAPI.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String desc;
    private boolean status;
    private String dueDate;
    public Long getId() {return id;}
    public String getDesc() {return desc;}
    public boolean getStatus() {return status;}
    public String getDueDate() {return dueDate;}
    public void setId(Long newId){this.id = newId;}
    public void setDesc(String newDesc){this.desc = newDesc;}
    public void setStatus(boolean newStatus){this.status= newStatus;}
    public void setDueDate(String newDueDate){this.dueDate = newDueDate;}
}
