package com.revature.DataService.dtos;

import java.sql.Date;

public class BatchDTO {

	private int batch_id;
	private String location;
	private Date start_date;
	private String curriculum_name;
	private String skillSetName;
	private int batch_capacity;
	
	
	public BatchDTO() {
		super();
	}
	
	public BatchDTO(int batch_id, String location, Date start_date, String curriculum_name, String skillSetName, int batch_capacity) {
		super();
		this.batch_id = batch_id;
		this.location = location;
		this.start_date = start_date;
		this.curriculum_name = curriculum_name;
		this.skillSetName = skillSetName;
		this.batch_capacity = batch_capacity;
	}

	public BatchDTO(int batch_id) {
		super();
		this.batch_id = batch_id;
	}
	public int getBatch_id() {
		return batch_id;
	}
	public void setBatch_id(int batch_id) {
		this.batch_id = batch_id;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public String getCurriculum_name() {
		return curriculum_name;
	}
	public void setCurriculum_name(String curriculum_name) {
		this.curriculum_name = curriculum_name;
	}
	public int getBatch_capacity() {
		return batch_capacity;
	}
	public void setBatch_capacity(int batch_capacity) {
		this.batch_capacity = batch_capacity;
	}
	
	
	
	
	
}
