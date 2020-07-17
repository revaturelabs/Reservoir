package com.revature.DataService.models;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

	  @Column(name = "isconfirmed")
	  private Boolean isConfirmed;

	  @Column(name = "interview_score_lower")
	  private Integer interviewScoreLower;
	  
	  @Column(name="program_type")
	  private String programType;
	  
	  @Column(name="location_id")
	  private Integer locationId;
	  
	  @Column(name="curriculum_id")
	  private Integer curiculum_id;
	  
	  
	  //Getters and setters
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

	public Boolean getIsConfirmed() {
		return isConfirmed;
	}

	public void setIsConfirmed(Boolean isConfirmed) {
		this.isConfirmed = isConfirmed;
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
