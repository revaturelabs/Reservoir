package com.revature.DataService.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.revature.DataService.dtos.SimpleTrainerDTO;
import com.revature.DataService.exceptions.TrainerNotFoundException;
import com.revature.DataService.models.Batch;
import com.revature.DataService.models.Curriculum;
import com.revature.DataService.models.Skills;
import com.revature.DataService.models.Skillset;
// import com.revature.DataService.models.SkillsetSkills;
import com.revature.DataService.models.Trainer;
import com.revature.DataService.services.BatchService;
import com.revature.DataService.services.CurriculumService;
import com.revature.DataService.services.TrainerService;

@CrossOrigin
@RestController
public class TrainerController {

  @Autowired
  TrainerService trainerService;
  @Autowired
  BatchService batchService;
  @Autowired
  CurriculumService curriculumService;

  
  @GetMapping("/trainer/curriculum/{id}")
  public ResponseEntity<List<SimpleTrainerDTO>> getTrainersByCurriculumId(@PathVariable int id) {
	  List<SimpleTrainerDTO> trainers = trainerService.getTrainersByCurriculumId(id);
	  if(trainers.size() > 0)
		  return new ResponseEntity<List<SimpleTrainerDTO>>(trainers, HttpStatus.OK);
	  else
		  return new ResponseEntity<List<SimpleTrainerDTO>>(trainers, HttpStatus.NOT_FOUND);  
  }
  
  @GetMapping("/trainer")
  public List<Trainer> getAllTrainers() {
    return trainerService.getAll();
  }

  @GetMapping("/trainer/{id}")
  public Trainer getTrainerById(@PathVariable Integer id) {
    try {
      return trainerService.getById(id);
    } catch (TrainerNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/trainer/eligible/{batchId}")
  public List<Trainer> getTrainersByEligibility(@PathVariable Integer batchId) {

    try {
      Batch selectedBatch;
      List<Trainer> eligibleTrainers = new ArrayList<Trainer>();

      List<Trainer> trainers = trainerService.getAll();
      // System.out.println(trainer);
      selectedBatch = batchService.getById(batchId);
      // System.out.println(selectedBatch);
      Curriculum currentCurriculum = selectedBatch.getCurriculum();
      Skillset curriculumSkillset = currentCurriculum.getCurriculumSkillset();
      List<Skills> curriculumSkills = curriculumSkillset.getSkills();
      // List<Skillset> trainerSkillSet = trainer.getTrainerSkills();

      for (Trainer t : trainers) {
        List<Skillset> trainerSkillSet = t.getTrainerSkills();

        for (Skillset ss : trainerSkillSet) {

          List<Skills> trainerSkillsList = ss.getSkills();
          if (skillsComparison(trainerSkillsList, curriculumSkills)) {

            eligibleTrainers.add(t);
          }
        }
      }
      return eligibleTrainers;
    } catch (Exception e) {
      System.out.println(e);
      throw new RuntimeException(e);
    }
  }

  public boolean skillsComparison(List<Skills> tSkills, List<Skills> cSkills) {
    ArrayList<String> sharedSkills = new ArrayList<String>();
    for (Skills i : cSkills) {
      for (Skills x : tSkills) {
        if (x.getSkillName().equals(i.getSkillName()))
          sharedSkills.add(x.getSkillName());
      }
    }
    System.out.print("Shared Trainer Skills with Curriculum: ");
    for (String p : sharedSkills)
      System.out.print(p + " ");
    if (sharedSkills.size() / cSkills.size() == 1)
      return true;
    else
      return false;
  }


}
