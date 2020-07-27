package com.revature.DataService.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.models.BatchDAO;
import com.revature.DataService.repositories.BatchDAORepository;

@Service 
public class BatchDaoService 
{
	@Autowired
	BatchDAORepository repo;
	
	public List<BatchDAO> getAllBatchs()
	{
		return repo.findAll();
	}
	
	public BatchDAO saveBatch(BatchDAO b)
	{
		return repo.save(b);
	}
}
