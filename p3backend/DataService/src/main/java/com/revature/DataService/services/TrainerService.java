package com.revature.DataService.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.SimpleTrainerDTO;
import com.revature.DataService.exceptions.TrainerNotFoundException;
import com.revature.DataService.models.Trainer;
import com.revature.DataService.repositories.TrainerRepository;

@Service
public class TrainerService {
  @Autowired
  TrainerRepository trainerRepository;

  public List<SimpleTrainerDTO> getTrainersByCurriculumId(int id) {
	  List<Trainer> trainers = trainerRepository.findByTrainerSkillsCurriculaCurriculumId(id);
	  List<SimpleTrainerDTO> simplifiedTrainers = new ArrayList<>();
	  
	  for(Trainer trainer : trainers) {
		  SimpleTrainerDTO dto = new SimpleTrainerDTO(trainer.getTrainerId(),trainer.getFirstName(), trainer.getLastName(),trainer.getEmail());
		  simplifiedTrainers.add(dto);
	  }
	  return simplifiedTrainers;
  }
  
  
  public List<Trainer> getAll() {
    return trainerRepository.findAll();
  }

  public Trainer getById(Integer id) {
    Optional<Trainer> trainer = trainerRepository.findById(id);
    if (trainer.isPresent()) {
      return trainer.get();
    } else {
      throw new TrainerNotFoundException();
    }
  }
  /*
   * public Trainer create(Trainer trainer) { trainer.setTrainerId(0); return
   * trainerRepository.save(trainer); }
   * 
   * public Trainer update(Trainer trainer) { Optional<Trainer> existingTrainer =
   * trainerRepository.findById(trainer.getTrainerId()); if(existingTrainer.isPresent()) { return
   * trainerRepository.save(trainer); }else { throw new TrainerNotFoundException(); } }
   */

}
