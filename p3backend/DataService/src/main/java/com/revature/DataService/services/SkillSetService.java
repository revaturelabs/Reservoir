package com.revature.DataService.services;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.TotalSkillSetMatrixDTO;
import com.revature.DataService.models.ClientDemand;
import com.revature.DataService.models.Skillset;
import com.revature.DataService.repositories.AssociateRepository;
import com.revature.DataService.repositories.ClientDemandRepo;
import com.revature.DataService.repositories.SkillSetRepository;

@Service
public class SkillSetService {

	@Autowired
	SkillSetRepository skillSetRepository;

	@Autowired
	AssociateRepository associateRepo;

	@Autowired
	ClientDemandRepo clientDemandRepo;

	public TotalSkillSetMatrixDTO getSkillsMatrix() {
		
		int batchStateId = 2;
		TotalSkillSetMatrixDTO dto = new TotalSkillSetMatrixDTO();
		
		Date today = new Date(System.currentTimeMillis());
		Date tomorrow = new Date(today.getTime() + 86400000L);
		Date oneMonthFromToday = new Date(today.getTime() + 2629800000L);
		Date oneMonthOneDayFromToday = new Date(today.getTime() + 2716200000L);
		Date threeMonthsFromToday = new Date(today.getTime() + 7889400000L);
		
		List<ClientDemand> demands = clientDemandRepo.findCurrentClientDemands(today.toLocalDate());

		dto.setTotal_currently_available(associateRepo.findByBatchEndDateAndBatchStateId(today, batchStateId).size());
		dto.setTotal_1_month(associateRepo.findByBatchEndDateBetweenAndBatchStateId(tomorrow, oneMonthFromToday, batchStateId).size());
		dto.setTotal_3_months(associateRepo.findByBatchEndDateBetweenAndBatchStateId(oneMonthOneDayFromToday, threeMonthsFromToday, batchStateId).size());
		dto.setTotal_supply(dto.getTotal_1_month() + dto.getTotal_3_months() + dto.getTotal_currently_available());

		for (ClientDemand demand : demands) {
			dto.setTotal_demand(dto.getTotal_demand() + demand.getQuantity());
		}

		return dto;

	}

	public List<Skillset> getAll() {
		return skillSetRepository.findAll();
	}

	public Skillset getById(Integer id) {
		Optional<Skillset> skillset = skillSetRepository.findById(id);
		if (skillset.isPresent()) {
			return skillset.get();
		} else {
			return null;
		}
	}
}
