package com.revature.DataService.dtos;

public class TotalSupplyGraphDTO {
	
	private int total_demand;
	
	private TotalSkillSetMatrixDTO committed;
	
	private TotalSkillSetMatrixDTO confirmed;

	public TotalSupplyGraphDTO() {
		super();
	}

	public TotalSupplyGraphDTO(int total_demand, TotalSkillSetMatrixDTO committed, TotalSkillSetMatrixDTO confirmed) {
		super();
		this.total_demand = total_demand;
		this.committed = committed;
		this.confirmed = confirmed;
	}

	public int getTotal_demand() {
		return total_demand;
	}

	public void setTotal_demand(int total_demand) {
		this.total_demand = total_demand;
	}

	public TotalSkillSetMatrixDTO getCommitted() {
		return committed;
	}

	public void setCommitted(TotalSkillSetMatrixDTO committed) {
		this.committed = committed;
	}

	public TotalSkillSetMatrixDTO getConfimred() {
		return confirmed;
	}

	public void setConfimred(TotalSkillSetMatrixDTO confirmed) {
		this.confirmed = confirmed;
	}
}
