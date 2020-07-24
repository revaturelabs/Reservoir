package com.revature.DataService.dtos;

public class TotalSkillSetMatrixDTO {
	
	private int total_supply;
	private int total_currently_available;
	private int total_1_month;
	private int total_3_months;
	public TotalSkillSetMatrixDTO() {
		super();
	}
	
	public int getTotal_supply() {
		return total_supply;
	}
	public void setTotal_supply(int total_supply) {
		this.total_supply = total_supply;
	}
	public int getTotal_currently_available() {
		return total_currently_available;
	}
	public void setTotal_currently_available(int total_currently_available) {
		this.total_currently_available = total_currently_available;
	}
	public int getTotal_1_month() {
		return total_1_month;
	}
	public void setTotal_1_month(int total_1_month) {
		this.total_1_month = total_1_month;
	}
	public int getTotal_3_months() {
		return total_3_months;
	}
	public void setTotal_3_months(int total_3_months) {
		this.total_3_months = total_3_months;
	}
}
