package com.revature.DataService.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.dtos.BatchDTO;
import com.revature.DataService.dtos.DetailedBatchDTO;
import com.revature.DataService.dtos.SupplyMetricsDTO;
import com.revature.DataService.models.Associate;
import com.revature.DataService.models.Batch;
import com.revature.DataService.models.BatchState;
import com.revature.DataService.models.Consent;
import com.revature.DataService.models.Trainer;
import com.revature.DataService.repositories.AssociateRepository;
import com.revature.DataService.repositories.BatchRepository;
import com.revature.DataService.repositories.BatchStateRepository;
import com.revature.DataService.repositories.TrainerRepository;

@Service
public class BatchService {
	private final String UNCONFIRMED_STATE = "unconfirmed";
	private final String CONFIRMED_STATE = "confirmed";
	private final String COMMITTED_STATE = "committed";

	@Autowired
	BatchRepository batchRepository;

	@Autowired
	TrainerRepository trainerRepository;

	@Autowired
	BatchStateRepository batchStateRepo;

	@Autowired
	AssociateRepository associateRepo;

	@Autowired
	TrainerRepository trainerRepo;
	
	@Autowired
	SkillSetService skillsetService;

	
	public SupplyMetricsDTO getBatchSupplyMetricsById(int id) {	
		SupplyMetricsDTO dto = null;
		Optional<Batch> batchOptional = batchRepository.findById(id);
		
		Date today = new Date(System.currentTimeMillis());
		Date tomorrow = new Date(today.getTime() + 86400000L);
		Date oneMonthFromToday = new Date(today.getTime() + 2629800000L);
		Date oneMonthOneDayFromToday = new Date(today.getTime() + 2716200000L);
		Date threeMonthsFromToday = new Date(today.getTime() + 7889400000L);
				
		if(batchOptional.isPresent()) {
			dto = new SupplyMetricsDTO();
			Batch batch = batchOptional.get();
			if(batch.getEndDate().before(today) || batch.getEndDate().equals(today)) 
				dto.setTotal_currently_available(batch.getBatchCapacity());	
			 else if (batch.getEndDate().after(today) && batch.getEndDate().before(oneMonthFromToday)) 
				dto.setTotal_1_month(batch.getBatchCapacity());			
			 else if (batch.getEndDate().after(oneMonthOneDayFromToday) && batch.getEndDate().before(threeMonthsFromToday)) 
				dto.setTotal_3_months(batch.getBatchCapacity());		
			dto.setTotal_supply(dto.getTotal_1_month() + dto.getTotal_3_months() + dto.getTotal_currently_available());
		}	
		return dto;	
	}
	
	public Batch batchStateUnconfirmedToConfirmed(int id) {
		BatchState state = batchStateRepo.findByState(CONFIRMED_STATE);
		Optional<Batch> batch = batchRepository.findById(id);		
		if(batch.isPresent()) {
			batch.get().setState(state);
			return batchRepository.save(batch.get());
		}
		else
			return null;	
	}
	
	public void deleteBatchById(int id) {
		Optional<Batch> batchWrap = batchRepository.findById(id);
		if(batchWrap.isPresent())
		{
			Batch batch = batchWrap.get();
			for(Associate a : batch.getAssociates()) {
				a.setBatch(null);
			}
			
			if(batch.getConsent().size() > 0) {
				for(Consent c : batch.getConsent()) {
					c.setBatch(null);
				}
			}
		}		
		
		batchRepository.deleteById(id);
	}
		
	// currently handles save and update.
	public Batch saveUnconfirmedBatch(Batch batch, DetailedBatchDTO detailedBatchDTO) {
		Optional<Batch> existingBatch = batchRepository.findById(batch.getBatchId());
		BatchState committedState = batchStateRepo.findByState(COMMITTED_STATE);
		if(existingBatch.isPresent())
			if(existingBatch.get().getState().getId() == committedState.getId()) 
				return null;
		BatchState state = batchStateRepo.findByState(UNCONFIRMED_STATE);
		batch.setState(state);
		if(existingBatch.isPresent()) {
			Optional<BatchState> bState = batchStateRepo.findById(existingBatch.get().getState().getId());
			if(bState.isPresent()) {
				batch.setState(bState.get());
			}
			List<Associate> associates = associateRepo.findByBatchBatchId(batch.getBatchId());
			for(int x = 0; x < associates.size(); x++) {
				if(!detailedBatchDTO.getAssociate_ids().contains(associates.get(x).getAssociateId())) {
					Associate a = associates.get(x);
					a.setBatch(null);
				}
			}
			
			for(int x = associates.size(); x > batch.getBatchCapacity();x-- ) {
				Associate a = associates.get(x-1);
				a.setBatch(null);
			}
		} 
		
		if (detailedBatchDTO.getAssociate_ids().size() > 0) {
			for (int x = 0; x < batch.getBatchCapacity() && x < detailedBatchDTO.getAssociate_ids().size(); x++) {
				Optional<Associate> a = associateRepo.findById(detailedBatchDTO.getAssociate_ids().get(x));
				if (a.isPresent()) {
					Associate as = a.get();
					as.setBatch(batch);
					batch.getAssociates().add(as);
				}
			}
		}

		if (detailedBatchDTO.getTrainer_ids().size() > 0) {
			for (int id : detailedBatchDTO.getTrainer_ids()) {
			  Optional<Trainer> t = trainerRepo.findById(id);
			  if(t.isPresent())
				  batch.getTrainers().add(t.get());
			}
		}
		return batchRepository.save(batch);
	}

	public List<BatchDTO> getUnconfirmedBatches() {
		List<Batch> batches = batchRepository.findByStateId(3);
		List<BatchDTO> unconfirmedBatches = new ArrayList<>();

		for (Batch batch : batches) {
			unconfirmedBatches.add(new BatchDTO(batch.getBatchId(), batch.getLocation().getLocationName(),
					batch.getStartDate(), batch.getCurriculum().getName(), batch.getBatchCapacity()));
		}
		return unconfirmedBatches;
	}
	
	public List<BatchDTO> getUnconfirmedBatchesBySkillsetId(int id) {
		int batchStateId = batchStateRepo.findByState(UNCONFIRMED_STATE).getId();
		List<Batch> batches = batchRepository.findByStateIdAndCurriculumCurriculumSkillsetSkillSetId(batchStateId,id);
		List<BatchDTO> unconfirmedBatches = new ArrayList<>();

		for (Batch batch : batches) {
			unconfirmedBatches.add(new BatchDTO(batch.getBatchId(), batch.getLocation().getLocationName(),
					batch.getStartDate(), batch.getCurriculum().getName(), batch.getBatchCapacity()));
		}
		return unconfirmedBatches;
	}

	public List<Batch> getAll() {
		try {
			return batchRepository.findAll();
		} catch (Exception e) {
			return null;
			// throw new Exception("Issue getting all batches "+e.getMessage());
		}
	}

	public Batch getById(Integer id) throws Exception {
		Optional<Batch> batch = batchRepository.findById(id);
		if (batch.isPresent()) {
			return batch.get();
		} else {
			throw new Exception("batch not found");
		}
	}

	public Batch updateBatch(Batch batch) throws Exception {
		Integer id = batch.getBatchId();

		BatchState committedState = batchStateRepo.findByState(COMMITTED_STATE);
		
		Optional<Batch> existingBatch = batchRepository.findById(id);
		if (existingBatch.isPresent()) {
			
			if(existingBatch.get().getState().getId() == committedState.getId()) 
				return null;
			return batchRepository.save(batch);
		} else {
			throw new Exception("batch failed to update");
		}
	}

	public List<Batch> getByInProgress(Date d) {
		return batchRepository.findByInProgress(d);
	}

	public List<Batch> getBatchByCurricula(Integer id) {

		List<Batch> existingBatch = batchRepository.getBatchByCurriculaJ(id);
		return existingBatch;

	}

	public List<Batch> getBatchByClientId(Integer id) {

		List<Batch> existingBatch = batchRepository.getBatchByClient(id);
		return existingBatch;

	}

	public Batch batchtrain(Integer trainerId, Integer batchId) throws Exception {

		Optional<Batch> existingBatch = batchRepository.findById(batchId);
		Optional<Trainer> trainer = trainerRepository.findById(trainerId);

		if (existingBatch.isPresent()) {
			Batch batch = existingBatch.get();
			if (trainer.isPresent()) {
				Trainer trainers = trainer.get();
				batch.setTrainerOne(trainers); // pushes a trainer into the list
			}
			return batchRepository.save(batch);

		} else {
			throw new Exception("batch failed to update");
		}

	}

	public List<Batch> getUncommitedBatchs() {
		return batchRepository.getBatchByState(3);
	}
}
