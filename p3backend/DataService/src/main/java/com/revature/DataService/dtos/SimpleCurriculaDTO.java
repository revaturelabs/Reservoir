package com.revature.DataService.dtos;

public class SimpleCurriculaDTO {
	
	private int curriculumId;
	private String name;
	public SimpleCurriculaDTO() {
		super();
	}
	public SimpleCurriculaDTO(int curriculumId, String name) {
		super();
		this.curriculumId = curriculumId;
		this.name = name;
	}
	public int getCurriculumId() {
		return curriculumId;
	}
	public void setCurriculumId(int curriculumId) {
		this.curriculumId = curriculumId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
