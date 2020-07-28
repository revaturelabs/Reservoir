package com.revature.DataService.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "project3", name = "consent")
public class Consent {

	@Id
	@Column(name = "consent_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer consentId;

	@Column(name = "consent_approved")
	private Boolean isApprovedColumn;

	@JsonIgnoreProperties({ "consent", "trainers" })
	@ManyToOne
	@JoinColumn(name = "batch_id")
	private Batch batch;

	@JsonIgnoreProperties({ "consent", "batches" })
	@ManyToOne
	@JoinColumn(name = "trainerId")
	private Trainer trainer;

	public Consent() {
		super();

	}

	public Consent(Integer consentId, Boolean isApprovedColumn, Batch batch, Trainer trainer) {
		super();
		this.consentId = consentId;
		this.isApprovedColumn = isApprovedColumn;
		this.batch = batch;
		this.trainer = trainer;
	}

	public Integer getConsentId() {
		return consentId;
	}

	public void setConsentId(Integer consentId) {
		this.consentId = consentId;
	}

	public Boolean getIsApprovedColumn() {
		return isApprovedColumn;
	}

	public void setIsApprovedColumn(Boolean isApprovedColumn) {
		this.isApprovedColumn = isApprovedColumn;
	}

	public Batch getBatch() {
		return batch;
	}

	public void setBatch(Batch batch) {
		this.batch = batch;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	@Override
	public String toString() {
		return "Consent [consentId=" + consentId + ", isApprovedColumn=" + isApprovedColumn + ", batch=" + batch
				+ ", trainer=" + trainer + "]";
	}

}
