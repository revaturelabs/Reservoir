package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.DataService.dtos.SimpleCurriculaDTO;
import com.revature.DataService.services.CurriculumService;

@RequestMapping(path = "/curricula")
@RestController
public class CurriculumController {

  @Autowired
  CurriculumService curriculumService;

  @GetMapping
  public ResponseEntity<List<SimpleCurriculaDTO>> getAllCurricula() {
	  List<SimpleCurriculaDTO> curricula = curriculumService.getAll();
	  if(curricula.size() > 0)
		  return new ResponseEntity<List<SimpleCurriculaDTO>>(curricula, HttpStatus.OK);
	  return new ResponseEntity<List<SimpleCurriculaDTO>>(curricula,HttpStatus.NOT_FOUND);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SimpleCurriculaDTO> getCurriculumById(@PathVariable Integer id) {
	  SimpleCurriculaDTO dto = curriculumService.getSimpleById(id);
	  if(dto != null) 
		  return new ResponseEntity<SimpleCurriculaDTO>(dto, HttpStatus.OK);
	  return new ResponseEntity<SimpleCurriculaDTO>(dto,HttpStatus.NOT_FOUND);
  }
}
