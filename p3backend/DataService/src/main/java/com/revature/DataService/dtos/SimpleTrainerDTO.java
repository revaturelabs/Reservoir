package com.revature.DataService.dtos;

public class SimpleTrainerDTO {
	private int trainer_id;
	private String firstName;
	private String lastName;
	private String email;
	public SimpleTrainerDTO() {
		super();
	}
	public SimpleTrainerDTO(int trainer_id, String firstName, String lastName, String email) {
		super();
		this.trainer_id = trainer_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	public int getTrainer_id() {
		return trainer_id;
	}
	public void setTrainer_id(int trainer_id) {
		this.trainer_id = trainer_id;
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
	
	
	
}
