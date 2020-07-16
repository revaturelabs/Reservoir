package com.revature.DataService.models;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.revature.DataService.models.Trainer;

@Entity
@Table(schema = "project3", name = "batch")
public class Batch implements Serializable {

	private static final long serialVersionUID = -6203909294638399555L;

	@Id
	@Column(name = "batch_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer batchId;

	@Column(name = "start_date")
	private Date startDate;

	@Column(name = "end_date")
	private Date endDate;

	@Column(name = "interview_score_lower")
	private Integer interviewScoreLower;

	@JsonIgnoreProperties({ "batches", "consent", "trainerSkills" })

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "trainerbatch", schema = "project3", joinColumns = @JoinColumn(name = "batch_id"), inverseJoinColumns = @JoinColumn(name = "trainer_id"))
	private List<Trainer> trainers;

	// Batch to location
	@JsonIgnoreProperties({ "batches" })
	@ManyToOne
	@JoinColumn(name = "location_id")
	private Location location;

	// Batch to curriculum
	@JsonIgnoreProperties({ "batch", "curriculum", "trainers" })
	@ManyToOne
	@JoinColumn(name = "curriculum_id")
	private Curriculum curriculum;

	// Batch to associates
	@JsonIgnoreProperties({ "batch" })
	@OneToMany(mappedBy = "batch", cascade = CascadeType.MERGE)
	private List<Associate> associates;

	@Column(name = "program_type")
	private String programType;

	// WORKING
	// Batch to consent
	// Getting rid of this at Nick's request

	@JsonIgnoreProperties({ "batch", "trainerSkills" })
	@OneToMany(mappedBy = "batch")
	private List<Consent> consent;

	@JsonIgnoreProperties({ "batches" })
	@ManyToOne(fetch = FetchType.EAGER)
	private BatchState state;

	public Batch() {
		super();

	}

	public Batch(Integer batchId, Date startDate, Date endDate, Integer interviewScoreLower, List<Trainer> trainers,
			Location location, Curriculum curriculum, List<Associate> associates, String programType) {
		super();
		this.batchId = batchId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.interviewScoreLower = interviewScoreLower;
		this.trainers = trainers;
		this.location = location;
		this.curriculum = curriculum;
		this.associates = associates;
		this.programType = programType;
	}

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

	public Integer getInterviewScoreLower() {
		return interviewScoreLower;
	}

	public void setInterviewScoreLower(Integer interviewScoreLower) {
		this.interviewScoreLower = interviewScoreLower;
	}

	public List<Trainer> getTrainers() {
		return trainers;
	}

	public void setTrainers(List<Trainer> trainers) {
		this.trainers = trainers;
	}

	public void setTrainerOne(Trainer trainer) {
		trainers.add(trainer);
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Curriculum getCurriculum() {
		return curriculum;
	}

	public void setCurriculum(Curriculum curriculum) {
		this.curriculum = curriculum;
	}

	public List<Associate> getAssociates() {
		return associates;
	}

	public void setAssociates(List<Associate> associates) {
		this.associates = associates;
	}

	public String getProgramType() {
		return programType;
	}

	public void setProgramType(String programType) {
		this.programType = programType;
	}

	public List<Consent> getConsent() {
		return consent;
	}

	public void setConsent(List<Consent> consent) {
		this.consent = consent;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((batchId == null) ? 0 : batchId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Batch other = (Batch) obj;
		if (batchId == null) {
			if (other.batchId != null)
				return false;
		} else if (!batchId.equals(other.batchId))
			return false;
		return true;
	}

}
