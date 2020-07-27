package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.DataService.models.BatchDAO;
import com.revature.DataService.services.BatchDaoService;


@CrossOrigin
@RestController
public class BatchDAOController {
	 
	 
	 @Autowired
	 BatchDaoService serv;
	 
	 @GetMapping("/batchDAO")
	  public List<BatchDAO> getAllReviews()
	  {
		 return serv.getAllBatchs();
	  }
}
