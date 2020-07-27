package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.DataService.models.Skills;
import com.revature.DataService.services.SkillsService;

@CrossOrigin
@RestController
@RequestMapping("/skills")
public class SkillsController {

  @Autowired
  SkillsService skillsService;



  // @GetMapping
  // public String hello() {
  // return "hello";
  // }

  @GetMapping
  public List<Skills> getAll() {
    return skillsService.getAll();
  }

  @PostMapping
  public Skills save(@RequestBody Skills skill) {
    System.out.println(skill);

    return skillsService.save(skill);
  }


  @PatchMapping
  public Skills update(@RequestBody Skills skill) {
    try {
      return skillsService.update(skill);
    } catch (RuntimeException e) {
      System.out.println(e);
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

  }

  @GetMapping("/{id}")
  public Skills getById(@PathVariable Integer id) {
    try {
      return skillsService.getbyId(id);
    } catch (RuntimeException e) {

      throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }


  }



}
