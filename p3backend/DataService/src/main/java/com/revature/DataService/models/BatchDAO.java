package com.revature.DataService.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(schema = "project3", name = "batch")
public class BatchDAO {

	@Id
	@Column(name = "batch_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer batchId;

	@Column(name = "start_date")
	private Date startDate;

	@Column(name = "end_date")
	private Date endDate;

	@Column(name = "state_id")
	private Integer state;

	@Column(name = "interview_score_lower")
	private Integer interviewScoreLower;

	@Column(name = "program_type")
	private String programType;

	@Column(name = "location_id")
	private Integer locationId;

	@Column(name = "curriculum_id")
	private Integer curiculum_id;

	@Column(name = "batch_capacity")
	private int batchCapacity;

	public int getBatchCapacity() {
		return batchCapacity;
	}

	public void setBatchCapacity(int batchCapacity) {
		this.batchCapacity = batchCapacity;
	}

	// Getters and setters
	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Integer getInterviewScoreLower() {
		return interviewScoreLower;
	}

	public void setInterviewScoreLower(Integer interviewScoreLower) {
		this.interviewScoreLower = interviewScoreLower;
	}

	public String getProgramType() {
		return programType;
	}

	public void setProgramType(String programType) {
		this.programType = programType;
	}

	public Integer getLocationId() {
		return locationId;
	}

	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}

	public Integer getCuriculum_id() {
		return curiculum_id;
	}

	public void setCuriculum_id(Integer curiculum_id) {
		this.curiculum_id = curiculum_id;
	}
}
