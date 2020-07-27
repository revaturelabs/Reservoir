package com.revature.DataService.controllers;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.revature.DataService.dtos.BatchDTO;
import com.revature.DataService.dtos.BatchTrainerJoin;
import com.revature.DataService.dtos.DetailedBatchDTO;
import com.revature.DataService.dtos.SupplyMetricsDTO;
import com.revature.DataService.dtos.UpdateBatchDto;
import com.revature.DataService.models.Batch;
import com.revature.DataService.models.BatchState;
import com.revature.DataService.models.Curriculum;
import com.revature.DataService.models.Location;
import com.revature.DataService.repositories.BatchStateRepository;
import com.revature.DataService.services.BatchService;
import com.revature.DataService.services.BatchStateService;
import com.revature.DataService.services.CurriculumService;
import com.revature.DataService.services.LocationService;

@CrossOrigin
@RestController
@RequestMapping("/batches")
public class BatchController {	
	@Autowired
	BatchService batchService;

	@Autowired
	BatchStateService batchStateService;
	
	@Autowired
	LocationService locationService;
	
	@Autowired
	CurriculumService curriculumService;
	
	@Autowired
	BatchStateRepository batchStateRepo;
	
	
	@GetMapping("/detailed-batch-dto")
	public DetailedBatchDTO getDetailedBatchDTO() {
		return new DetailedBatchDTO();
	}
	
	@GetMapping("/{id}/confirm")
	public ResponseEntity<HttpStatus> BatchStateUnconfirmedToConfirmed(@PathVariable int id) {
		Batch batch = batchService.batchStateUnconfirmedToConfirmed(id);
		
		if(batch != null) 
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		else
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/{id}")
	public void deleteBatchById(@PathVariable int id){
		batchService.deleteBatchById(id);
	}

	@PostMapping
	public ResponseEntity<DetailedBatchDTO> postNewUnconfirmedBatch(@RequestBody @Valid DetailedBatchDTO detailedBatchDTO, Errors errors) {	
		Curriculum curriculum = curriculumService.getById(detailedBatchDTO.getCurriculum_id());
		Location location = locationService.getById(detailedBatchDTO.getLocation_id());
		
		if(errors.hasErrors() | curriculum == null | location == null ){
			return new ResponseEntity<DetailedBatchDTO>(detailedBatchDTO, HttpStatus.BAD_REQUEST);
		}
		
		Batch batch = new Batch(detailedBatchDTO.getBatch_id(),
				detailedBatchDTO.getStart_date(),
				detailedBatchDTO.getEnd_date(), 
				detailedBatchDTO.getRequired_score(), 
				location,
				curriculum,
				detailedBatchDTO.getBatch_capacity()
		);
		
		batch = batchService.saveUnconfirmedBatch(batch, detailedBatchDTO);
		if(batch == null)
			return new ResponseEntity<DetailedBatchDTO>(detailedBatchDTO, HttpStatus.FORBIDDEN);
		detailedBatchDTO.setBatch_id(batch.getBatchId());
		return new ResponseEntity<DetailedBatchDTO>(detailedBatchDTO,HttpStatus.CREATED);
	}
	
	@GetMapping("/unconfirmed")
	public List<BatchDTO> getUnconfirmedBatches(@RequestParam(required = false) Integer skillsetid){
		
		if(skillsetid == null) 
			return batchService.getUnconfirmedBatches();
		 else if (skillsetid != null) 
			return batchService.getUnconfirmedBatchesBySkillsetId(skillsetid);
		return null;
	}
	
	@GetMapping("/{id}/unconfirmed")
	public ResponseEntity<SupplyMetricsDTO> getBatchSupplyMetricsById(@PathVariable int id) {
		SupplyMetricsDTO dto = batchService.getBatchSupplyMetricsById(id);
		if(dto != null)
			return new ResponseEntity<SupplyMetricsDTO>(dto, HttpStatus.OK);
		return new ResponseEntity<SupplyMetricsDTO>(dto, HttpStatus.NOT_FOUND);
	}
	
	@GetMapping
	public List<Batch> getAllBatches() {
		return batchService.getAll();
	}
	
	@GetMapping("/uncommited")
	public List<Batch> getUncommitedBatches()
	{
		return batchService.getUncommitedBatchs();
	}

	@GetMapping("/{id}")
	public Batch getBatchById(@PathVariable Integer id) {
		try {
			return batchService.getById(id);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/batch-states/{id}")
	public ResponseEntity<BatchState> getBatchStateById(@PathVariable int id) {
		BatchState state = batchStateService.getById(id);
		if(state != null)
			return new ResponseEntity<BatchState>(state, HttpStatus.OK);
		return new ResponseEntity<BatchState>(state, HttpStatus.NOT_FOUND);
	}

	@PatchMapping("{id}")
	public ResponseEntity<Batch> updateBatchWithId(@RequestBody UpdateBatchDto dto, @PathVariable Integer id) {
		Batch newBatch = null;
		try {
			Batch oldBatch = batchService.getById(id);
			if (oldBatch != null) {
				BatchState state = batchStateService.getById(dto.getBatchStateId());
				if (state != null) {
					oldBatch.setState(state);
					newBatch = batchService.updateBatch(oldBatch);
					if(newBatch == null)
						return new ResponseEntity<Batch>(new Batch(), HttpStatus.FORBIDDEN);
					return new ResponseEntity<>(newBatch, HttpStatus.OK);
				}
			}

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
		}

		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/date/{date}")
	public List<Batch> getInProgressBatches(@PathVariable String date) {
		try {	
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date d = (Date) df.parse(date);
			return batchService.getByInProgress(d);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@GetMapping("/curricula/{id}") // get batches by curricula id
	public List<Batch> getBatchesByCurricula(@PathVariable Integer id) {

		try {
			return batchService.getBatchByCurricula(id);

		} catch (RuntimeException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/clients/{id}")
	public List<Batch> getBatchesByClients(@PathVariable Integer id) {
		try {
			return batchService.getBatchByClientId(id);

		} catch (RuntimeException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}

	}

	@PostMapping("/trainer")
	public Batch updatebatchtrainer(@RequestBody BatchTrainerJoin batch) {

		try {
			return batchService.batchtrain(batch.getTrainerId(), batch.getBatchId());

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
		}
	}

}
