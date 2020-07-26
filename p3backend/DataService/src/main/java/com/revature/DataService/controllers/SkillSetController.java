package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.DataService.dtos.SimpleSkillSetDTO;
import com.revature.DataService.dtos.SkillSetMatrixDTO;
import com.revature.DataService.dtos.SupplyDemandGraphDTO;
import com.revature.DataService.models.Skillset;
import com.revature.DataService.services.SkillSetService;

//ONLY MODIFY THIS FILE ON GEN_BRANCH FOR NOW
@CrossOrigin(origins = "*")
@RequestMapping(path = "/skillsets")
@RestController
public class SkillSetController {

	@Autowired
	SkillSetService skillSetService;

	@GetMapping
	public ResponseEntity<List<SimpleSkillSetDTO>> getAllSkillSets() {
		List<SimpleSkillSetDTO> dto = skillSetService.getAll();

		if (dto.size() > 0)
			return new ResponseEntity<List<SimpleSkillSetDTO>>(dto, HttpStatus.OK);
		return new ResponseEntity<List<SimpleSkillSetDTO>>(dto, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/{id}")
	public Skillset getSkillSetById(@PathVariable Integer id) {
		return skillSetService.getById(id);
	}

	@GetMapping("/matrix")
	public ResponseEntity<SupplyDemandGraphDTO> getSkillMatrix(@RequestParam(required = false) Integer clientid,
			@RequestParam(required = false) Integer skillsetid) {
		SupplyDemandGraphDTO dto = null;

		if (skillsetid != null && clientid == null) {
			dto = skillSetService.getGraphMetricsBySkillSet(skillsetid);
		} else if (skillsetid == null && clientid == null) {
			dto = skillSetService.getSkillsMatrix();
		} else if (skillsetid == null && clientid != null) {
			dto = skillSetService.getGraphMetricsByClient(clientid);
		} else if (skillsetid != null && clientid != null) {
			dto = skillSetService.getGraphMetricsByClient(clientid, skillsetid);
		}

		return new ResponseEntity<SupplyDemandGraphDTO>(dto, HttpStatus.OK);
	}

	@GetMapping("/matrix/{id}")
	public SkillSetMatrixDTO getSkillMatrix(@PathVariable int id) {
		return null;
	}
}
