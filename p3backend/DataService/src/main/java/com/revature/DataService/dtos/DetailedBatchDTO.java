package com.revature.DataService.dtos;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class DetailedBatchDTO {

	@Transient 
	private final transient String notNull = "Can't be null";
	
	
	@NotNull(message = notNull)
	private int batch_id;
	
	@NotNull(message = notNull)
	@Positive 
	private int curriculum_id;
	
	@NotNull(message = notNull)
	@Positive
	private int location_id;
	
	@NotNull(message = notNull)
	private Date start_date;
	
	private Date end_date;
	
	@Positive
	@NotNull(message = notNull)
	private int batch_duration;
	
	@NotNull(message = notNull)
	@Positive
	private int batch_capacity;
	
	@Positive
	@NotNull(message = notNull)
	private int required_score;
	
	private List<Integer> associate_ids;
	private List<Integer> trainer_ids;
	
	public DetailedBatchDTO() {
		super();
		associate_ids = new ArrayList<>();
		trainer_ids = new ArrayList<>();
	}

	public DetailedBatchDTO(int batch_id, int curriculum_id, int location_id, Date start_date, Date end_date,
			int batch_duration, int batch_capacity, int required_score) {
		super();
		this.batch_id = batch_id;
		this.curriculum_id = curriculum_id;
		this.location_id = location_id;
		this.start_date = start_date;
		this.end_date = end_date;
		this.batch_duration = batch_duration;
		this.batch_capacity = batch_capacity;
		this.required_score = required_score;
		associate_ids = new ArrayList<>();
		trainer_ids = new ArrayList<>();
	}

	public int getBatch_id() {
		return batch_id;
	}

	public void setBatch_id(int batch_id) {
		this.batch_id = batch_id;
	}

	public int getCurriculum_id() {
		return curriculum_id;
	}

	public void setCurriculum_id(int curriculum_id) {
		this.curriculum_id = curriculum_id;
	}

	public int getLocation_id() {
		return location_id;
	}

	public void setLocation_id(int location_id) {
		this.location_id = location_id;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public int getBatch_duration() {
		return batch_duration;
	}

	public void setBatch_duration(int batch_duration) {
		this.batch_duration = batch_duration;
	}

	public int getBatch_capacity() {
		return batch_capacity;
	}

	public void setBatch_capacity(int batch_capacity) {
		this.batch_capacity = batch_capacity;
	}

	public int getRequired_score() {
		return required_score;
	}

	public void setRequired_score(int required_score) {
		this.required_score = required_score;
	}

	public List<Integer> getAssociate_ids() {
		return associate_ids;
	}

	public void setAssociate_ids(List<Integer> associate_ids) {
		this.associate_ids = associate_ids;
	}

	public List<Integer> getTrainer_ids() {
		return trainer_ids;
	}

	public void setTrainer_ids(List<Integer> trainer_ids) {
		this.trainer_ids = trainer_ids;
	}	
}
