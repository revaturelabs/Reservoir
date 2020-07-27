package com.revature.DataService.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.models.BatchState;
import com.revature.DataService.repositories.BatchStateRepository;

@Service
public class BatchStateService {
	
	@Autowired
	private BatchStateRepository batchStateRepo; 
	
	public BatchState getById(int id) {
		BatchState state = null;
		
		Optional<BatchState> stateOptional = batchStateRepo.findById(id);
		if(stateOptional.isPresent()) {
			state = stateOptional.get();
		}
		return state;
	}
}