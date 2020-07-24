package com.revature.DataService.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.SimpleSkillSetDTO;
import com.revature.DataService.dtos.TotalSkillSetMatrixDTO;
import com.revature.DataService.dtos.TotalSupplyGraphDTO;
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

	public TotalSupplyGraphDTO getSkillsMatrix() {
		Date today = new Date(System.currentTimeMillis());
		TotalSupplyGraphDTO dto = new TotalSupplyGraphDTO();
		
		List<ClientDemand> demands = clientDemandRepo.findCurrentClientDemands(today.toLocalDate());

		for (ClientDemand demand : demands) {
			dto.setTotal_demand(dto.getTotal_demand() + demand.getQuantity());
		}

		dto.setCommitted(populateSkillMatrix(1,today));
		dto.setConfimred(populateSkillMatrix(2,today));
		
		return dto;

	}

	private TotalSkillSetMatrixDTO populateSkillMatrix(int batchStateId, Date today) {
		TotalSkillSetMatrixDTO dto = new TotalSkillSetMatrixDTO();
		Date tomorrow = new Date(today.getTime() + 86400000L);
		Date oneMonthFromToday = new Date(today.getTime() + 2629800000L);
		Date oneMonthOneDayFromToday = new Date(today.getTime() + 2716200000L);
		Date threeMonthsFromToday = new Date(today.getTime() + 7889400000L);
		

		dto.setTotal_currently_available(associateRepo.findByBatchEndDateLessThanEqualAndBatchStateId(today, batchStateId).size());
		dto.setTotal_1_month(associateRepo
				.findByBatchEndDateBetweenAndBatchStateId(tomorrow, oneMonthFromToday, batchStateId).size());
		dto.setTotal_3_months(associateRepo
				.findByBatchEndDateBetweenAndBatchStateId(oneMonthOneDayFromToday, threeMonthsFromToday, batchStateId)
				.size());
		dto.setTotal_supply(dto.getTotal_1_month() + dto.getTotal_3_months() + dto.getTotal_currently_available());
		return dto;
	}

	public List<SimpleSkillSetDTO> getAll() {
		List<SimpleSkillSetDTO> simplifiedSkillSets = new ArrayList<>();
		List<Skillset> skillSets = skillSetRepository.findAll(); 
		
		for(Skillset s : skillSets) 
			simplifiedSkillSets.add(new SimpleSkillSetDTO(s.getSkillSetId(),s.getSkillSetName()));
		
		return simplifiedSkillSets;
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
