package com.revature.DataService.dtos;

public class SupplyDemandGraphDTO {
	
	private int total_demand;
	
	private SupplyMetricsDTO committed;
	
	private SupplyMetricsDTO confirmed;

	public SupplyDemandGraphDTO() {
		super();
	}

	public SupplyDemandGraphDTO(int total_demand, SupplyMetricsDTO committed, SupplyMetricsDTO confirmed) {
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

	public SupplyMetricsDTO getCommitted() {
		return committed;
	}

	public void setCommitted(SupplyMetricsDTO committed) {
		this.committed = committed;
	}

	public SupplyMetricsDTO getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(SupplyMetricsDTO confirmed) {
		this.confirmed = confirmed;
	}
}
