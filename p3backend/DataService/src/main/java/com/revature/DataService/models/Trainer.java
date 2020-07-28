package com.revature.DataService.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "project3", name = "trainer")
public class Trainer {

	@Id
	@Column(name = "trainer_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer trainerId;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "is_eligible")
	private boolean isEligible;

	@JsonIgnoreProperties({ "trainers", "curriculum", "clientDemand" })
	@ManyToMany(mappedBy = "trainers", cascade = CascadeType.ALL)
	private List<Skillset> trainerSkills;

	@JsonIgnoreProperties({ "trainer", "batch" })
	@OneToMany(mappedBy = "trainer")
	private List<Consent> consents;

	@JsonIgnoreProperties({ "batches", "trainers", "curriculum", "consent", "associates" })
	@ManyToMany(mappedBy = "trainers", cascade = CascadeType.ALL)
	private List<Batch> batches;

	public Trainer() {
		super();
	}

	public Trainer(Integer trainerId, String firstName, String lastName, String email, List<Skillset> trainerSkills,
			List<Batch> batches, boolean isEligible) {
		super();
		this.trainerId = trainerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.trainerSkills = trainerSkills;
		this.batches = batches;
		this.isEligible = isEligible;
	}

	public boolean getIsEligible() {
		return isEligible;
	}

	public void setIsEligible(boolean isEligible) {
		this.isEligible = isEligible;
	}

	public Integer getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(Integer trainerId) {
		this.trainerId = trainerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Skillset> getTrainerSkills() {
		return trainerSkills;
	}

	public void setTrainerSkills(List<Skillset> trainerSkills) {
		this.trainerSkills = trainerSkills;
	}

	public List<Batch> getBatches() {
		return batches;
	}

	public void setBatches(List<Batch> batches) {
		this.batches = batches;
	}

	public List<Consent> getConsent() {
		return consents;
	}

	public void setConsent(List<Consent> consent) {
		this.consents = consent;
	}

	@Override
	public String toString() {
		return "Trainer [trainerId=" + trainerId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", isEligible=" + isEligible + ", trainerSkills=" + trainerSkills + ", consents=" + consents
				+ ", batches=" + batches + "]";
	}
}
