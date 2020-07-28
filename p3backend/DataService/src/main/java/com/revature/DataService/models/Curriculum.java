package com.revature.DataService.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "project3", name = "curriculum")
public class Curriculum {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "curriculum_id")
	private Integer curriculumId;

	@Column(name = "name")
	private String name;

	@JsonIgnoreProperties({ "curriculum", "trainers", "location", "associates", "consent" })
	@OneToMany(mappedBy = "curriculum")
	private List<Batch> batch;

	@ManyToOne
	@JsonIgnoreProperties({ "curriculum", "curricula" })
	@JoinColumn(name = "curriculum_skillset_id")
	private Skillset curriculumSkillset;

	public Curriculum() {
		super();
	}

	public Curriculum(Integer curriculumId, String name, List<Batch> batch, Skillset curriculumSkillset) {
		super();
		this.curriculumId = curriculumId;
		this.name = name;
		this.batch = batch;
		this.curriculumSkillset = curriculumSkillset;
	}

	public Integer getCurriculumId() {
		return curriculumId;
	}

	public void setCurriculumId(Integer curriculumId) {
		this.curriculumId = curriculumId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Skillset getCurriculumSkillset() {
		return curriculumSkillset;
	}

	public void setCurriculumSkillset(Skillset curriculumSkillset) {
		this.curriculumSkillset = curriculumSkillset;
	}

	public List<Batch> getBatch() {
		return batch;
	}

	public void setBatch(List<Batch> batch) {
		this.batch = batch;
	}

	@Override
	public String toString() {
		return "Curriculum [curriculumId=" + curriculumId + ", name=" + name + ", batch=" + batch
				+ ", curriculumSkillset=" + curriculumSkillset + "]";
	}
}
