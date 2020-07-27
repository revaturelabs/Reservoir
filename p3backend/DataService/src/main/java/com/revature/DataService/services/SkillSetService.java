package com.revature.DataService.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.SimpleSkillSetDTO;
import com.revature.DataService.dtos.SupplyDemandGraphDTO;
import com.revature.DataService.dtos.SupplyMetricsDTO;
import com.revature.DataService.models.Associate;
import com.revature.DataService.models.ClientDemand;
import com.revature.DataService.models.Skillset;
import com.revature.DataService.repositories.AssociateRepository;
import com.revature.DataService.repositories.BatchStateRepository;
import com.revature.DataService.repositories.ClientDemandRepo;
import com.revature.DataService.repositories.SkillSetRepository;
import com.revature.DataService.util.BatchStates;
import com.revature.DataService.util.Dates;

@Service
public class SkillSetService {

	@Autowired
	SkillSetRepository skillSetRepository;

	@Autowired
	AssociateRepository associateRepo;

	@Autowired
	ClientDemandRepo clientDemandRepo;
	
	@Autowired
	BatchStateRepository batchStateRepo;

	public SupplyDemandGraphDTO getGraphMetricsByClient(int clientId) {
		SupplyDemandGraphDTO dto = new SupplyDemandGraphDTO();
		List<Integer> skillSetIds = new ArrayList<>();
		Optional<List<ClientDemand>> demandOptional = clientDemandRepo
				.findByClientClientIdAndDeadlineGreaterThanEqual(clientId, Dates.getToday().toLocalDate());
		if (demandOptional.isPresent()) {
			dto.setTotal_demand(calcTotalClientDemand(demandOptional.get()));
			skillSetIds = populateSkillSetIds(demandOptional.get(), skillSetIds);
		}

		dto.setCommitted(populateSkillMatrix(batchStateRepo.findByState(BatchStates.COMMITTED).getId(), skillSetIds, true ));
		dto.setConfirmed(populateSkillMatrix(batchStateRepo.findByState(BatchStates.CONFIRMED).getId(), skillSetIds, false ));

		return dto;
	}

	public SupplyDemandGraphDTO getGraphMetricsByClient(int clientId, int skillsetId) {
		SupplyDemandGraphDTO dto = new SupplyDemandGraphDTO();
		List<Integer> skillsetIds = new ArrayList<>();
		skillsetIds.add(skillsetId);

		Optional<List<ClientDemand>> demandOptional = clientDemandRepo
				.findByClientClientIdAndDeadlineGreaterThanEqualAndClientDemandSkillsetSkillSetId(clientId,
						Dates.getToday().toLocalDate(), skillsetId);

		if (demandOptional.isPresent()) {
			dto.setTotal_demand(calcTotalClientDemand(demandOptional.get()));
		}

		dto.setCommitted(populateSkillMatrix(batchStateRepo.findByState(BatchStates.COMMITTED).getId(), skillsetIds, true));
		dto.setConfirmed(populateSkillMatrix(batchStateRepo.findByState(BatchStates.CONFIRMED).getId(), skillsetIds, false));

		return dto;
	}

	public SupplyDemandGraphDTO getGraphMetricsBySkillSet(int skillsetId) {
		SupplyDemandGraphDTO dto = new SupplyDemandGraphDTO();
		List<Integer> skillsetIds = new ArrayList<>();
		skillsetIds.add(skillsetId);

		List<ClientDemand> demands = clientDemandRepo
				.findByDeadlineGreaterThanEqualAndClientDemandSkillsetSkillSetId(Dates.getToday().toLocalDate(), skillsetId);

		dto.setTotal_demand(calcTotalClientDemand(demands));
	
		dto.setCommitted(populateSkillMatrix(batchStateRepo.findByState(BatchStates.COMMITTED).getId(), skillsetIds, true));
		dto.setConfirmed(populateSkillMatrix(batchStateRepo.findByState(BatchStates.CONFIRMED).getId(), skillsetIds, false));

		return dto;
	}

	public SupplyDemandGraphDTO getSkillsMatrix() {
		Date today = new Date(System.currentTimeMillis());
		SupplyDemandGraphDTO dto = new SupplyDemandGraphDTO();

		List<ClientDemand> demands = clientDemandRepo.findByDeadlineGreaterThanEqual(today.toLocalDate());

		dto.setTotal_demand(calcTotalClientDemand(demands));

		dto.setCommitted(populateSkillMatrix(batchStateRepo.findByState(BatchStates.COMMITTED).getId(), true));
		dto.setConfirmed(populateSkillMatrix(batchStateRepo.findByState(BatchStates.CONFIRMED).getId(), false));

		return dto;

	}

	public List<SimpleSkillSetDTO> getAll() {
		List<SimpleSkillSetDTO> simplifiedSkillSets = new ArrayList<>();
		List<Skillset> skillSets = skillSetRepository.findAll();

		for (Skillset s : skillSets)
			simplifiedSkillSets.add(new SimpleSkillSetDTO(s.getSkillSetId(), s.getSkillSetName()));

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
	
	private SupplyMetricsDTO populateSkillMatrix(int batchStateId, boolean isCommittedBatch) {
		SupplyMetricsDTO dto = new SupplyMetricsDTO();
		List<Associate> current = associateRepo.findByBatchEndDateLessThanEqualAndBatchStateId(Dates.getToday(), batchStateId);
		
		List<Associate> oneMonth = associateRepo
				.findByBatchEndDateBetweenAndBatchStateId(Dates.getTomorrow(), Dates.getOneMonthFromToday(), batchStateId);
		
		List<Associate> threeMonths = associateRepo
				.findByBatchEndDateBetweenAndBatchStateId(Dates.getOneMonthAndOneDayFromToday(), Dates.getThreeMonthsFromToday(), batchStateId);
		
		if (isCommittedBatch) {
			dto.setTotal_currently_available(calcCommittedSupply(current));
			dto.setTotal_1_month(calcCommittedSupply(oneMonth));
			dto.setTotal_3_months(calcCommittedSupply(threeMonths));
		} else {
			dto.setTotal_currently_available(current.size());
			dto.setTotal_1_month(oneMonth.size());
			dto.setTotal_3_months(threeMonths.size());
		}
		dto.setTotal_supply(dto.getTotal_1_month() + dto.getTotal_3_months() + dto.getTotal_currently_available());
		return dto;
	}
	
	private SupplyMetricsDTO populateSkillMatrix(int batchStateId, List<Integer> skillSetIds, boolean isCommittedBatch) {
		SupplyMetricsDTO dto = new SupplyMetricsDTO();

		List<Associate> current = associateRepo
				.findByBatchEndDateLessThanEqualAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetIdIn(
						Dates.getToday(), batchStateId, skillSetIds);
		List<Associate> oneMonth = associateRepo
				.findByBatchEndDateBetweenAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetIdIn(
						Dates.getTomorrow(), Dates.getOneMonthFromToday(), batchStateId, skillSetIds);
		List<Associate> threeMonths = associateRepo
				.findByBatchEndDateBetweenAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetIdIn(
						Dates.getOneMonthAndOneDayFromToday(), Dates.getThreeMonthsFromToday(), batchStateId,
						skillSetIds);

		if (isCommittedBatch) {
			dto.setTotal_currently_available(calcCommittedSupply(current));
			dto.setTotal_1_month(calcCommittedSupply(oneMonth));
			dto.setTotal_3_months(calcCommittedSupply(threeMonths));
		} else {
			dto.setTotal_currently_available(current.size());
			dto.setTotal_1_month(oneMonth.size());
			dto.setTotal_3_months(threeMonths.size());
		}
		dto.setTotal_supply(dto.getTotal_1_month() + dto.getTotal_3_months() + dto.getTotal_currently_available());
		return dto;
	}
	
	private int calcCommittedSupply(List<Associate> associates) {
		int total = 0;
		for(Associate a : associates)
			if(a.isActive())
				total++;
		return total;
	}

	private int calcTotalClientDemand(List<ClientDemand> demands) {
		int total = 0;
		for (ClientDemand demand : demands)
			total += demand.getQuantity();
		return total;
	}

	private List<Integer> populateSkillSetIds(List<ClientDemand> demands, List<Integer> skillSetIds) {
		for (ClientDemand demand : demands)
			skillSetIds.add(demand.getClientDemandSkillset().getSkillSetId());
		return skillSetIds;

	}
}
