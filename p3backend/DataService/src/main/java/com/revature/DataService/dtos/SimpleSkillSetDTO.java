package com.revature.DataService.dtos;

public class SimpleSkillSetDTO {
	private int skillSetId;
	private String name;
	public SimpleSkillSetDTO() {
		super();
	}
	public SimpleSkillSetDTO(int skillSetId, String name) {
		super();
		this.skillSetId = skillSetId;
		this.name = name;
	}
	public int getSkillSetId() {
		return skillSetId;
	}
	public void setSkillSetId(int skillSetId) {
		this.skillSetId = skillSetId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
