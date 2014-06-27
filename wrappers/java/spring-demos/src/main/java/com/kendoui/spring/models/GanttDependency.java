package com.kendoui.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GanttDependencies")
public class GanttDependency {
    private int id;
    private int predecessorId;
    private int successorId;
    private int type;
    
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id ) {
        this.id = id ;
    }

    @Column(name="PredecessorID")
    public int getPredecessorId() {
        return predecessorId;
    }

    public void setPredecessorId(int predecessorId) {
        this.predecessorId = predecessorId;
    }

    @Column(name="SuccessorID")
    public int getSuccessorId() {
        return successorId;
    }

    public void setSuccessorId(int successorId) {
        this.successorId = successorId;
    }

    @Column(name="Type")
    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
