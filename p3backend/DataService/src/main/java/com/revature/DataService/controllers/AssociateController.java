package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.revature.DataService.models.Associate;
import com.revature.DataService.services.AssociateService;

@CrossOrigin(origins = "*")
@RestController

@RequestMapping(path = "/associates")

public class AssociateController
{
  @Autowired
  AssociateService associateService;
  
  @GetMapping("/{score}/score/{capacity}/capacity")
  public ResponseEntity<List<Associate>> getAvailableAssociatesWithMinimumRequiredScore(@PathVariable double score, @PathVariable int capacity){
	  List<Associate> associates = associateService.getAvailableAssociatesWithMinimumRequiredScore(score, capacity);
	  System.out.println(associates.size());
	  if(associates.size() > 0)
		  return new ResponseEntity<List<Associate>>(associates, HttpStatus.OK);
	 return new ResponseEntity<List<Associate>>(associates, HttpStatus.NOT_FOUND);
  }
  
  @CrossOrigin(origins = "*")
  @GetMapping
  public List<Associate> getAssociate()
  {

    return associateService.getAll();
  }

  @GetMapping("/get-active")
  public List<Associate> getActiveAssociates()
  {
    return associateService.getAllActive();
  }


  @GetMapping("/{id}")
  public Associate getAssociateById(@PathVariable Integer id)
  {
    try
    {
      return associateService.getById(id);
    } catch (Exception e)
    {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @PatchMapping
  public String updateAssociate(@RequestBody Associate a) {
    return associateService.updateAssociate(a);
  }



}
