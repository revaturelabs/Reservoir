package com.revature.DataService.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.models.BatchState;
import com.revature.DataService.repositories.BatchStateRepository;

@Service
public class BatchStateService {
	
	@Autowired
	private BatchStateRepository batchStateRepo; 
	
	public BatchState getById(int id) {
		return batchStateRepo.getOne(id);
	}
	
	
}