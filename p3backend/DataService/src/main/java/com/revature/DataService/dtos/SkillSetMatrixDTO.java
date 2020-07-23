package com.revature.DataService.dtos;

public class SkillSetMatrixDTO {
	
	private int client_demand;
	private int currently_available;
	private int available_1_month;
	private int available_3_months;
	public SkillSetMatrixDTO() {
		super();
	}
	public int getClient_demand() {
		return client_demand;
	}
	public void setClient_demand(int client_demand) {
		this.client_demand = client_demand;
	}
	public int getCurrently_available() {
		return currently_available;
	}
	public void setCurrently_available(int currently_available) {
		this.currently_available = currently_available;
	}
	public int getAvailable_1_month() {
		return available_1_month;
	}
	public void setAvailable_1_month(int available_1_month) {
		this.available_1_month = available_1_month;
	}
	public int getAvailable_3_months() {
		return available_3_months;
	}
	public void setAvailable_3_months(int available_3_months) {
		this.available_3_months = available_3_months;
	}
	
	
	
	

}
