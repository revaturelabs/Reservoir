package com.revature.DataService.dtos;

import lombok.Data;

@Data
public class UpdateBatchDto {

	private int batchId;

	private int batchStateId;

	public UpdateBatchDto() {
		super();
	}

	public UpdateBatchDto(Integer batchId, Integer batchStateId) {
		super();
		this.batchId = batchId;
		this.batchStateId = batchStateId;
	}

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public int getBatchStateId() {
		return batchStateId;
	}

	public void setBatchStateId(int batchStateId) {
		this.batchStateId = batchStateId;
	}

}
