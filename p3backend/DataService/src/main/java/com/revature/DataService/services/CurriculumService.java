package com.revature.DataService.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.SimpleCurriculaDTO;
import com.revature.DataService.models.Curriculum;
import com.revature.DataService.repositories.CurriculumRepository;

@Service
public class CurriculumService {

	@Autowired
	CurriculumRepository curriculumRepository;

	public List<SimpleCurriculaDTO> getAll() {
		List<Curriculum> curricula = curriculumRepository.findAll();
		List<SimpleCurriculaDTO> simplifiedCurricula = new ArrayList<>();
		for (Curriculum c : curricula) {
			simplifiedCurricula.add(new SimpleCurriculaDTO(c.getCurriculumId(), c.getName()));
		}
		return simplifiedCurricula;
	}

	public SimpleCurriculaDTO getSimpleById(Integer id) {
		SimpleCurriculaDTO dto = null;
		Optional<Curriculum> curriculum = curriculumRepository.findById(id);
		if (curriculum.isPresent()) {
			Curriculum c = curriculum.get();
			return new SimpleCurriculaDTO(c.getCurriculumId(), c.getName());
		} else {
			return dto;
		}
	}
	
	public Curriculum getById(Integer id) {
		Optional<Curriculum> curriculum = curriculumRepository.findById(id);
		if (curriculum.isPresent()) {
			return curriculum.get();
		} else {
			return null;
		}
	}

}
