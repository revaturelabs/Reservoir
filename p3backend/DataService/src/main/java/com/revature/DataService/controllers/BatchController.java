package com.revature.DataService.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.revature.DataService.dtos.BatchTrainerJoin;
import com.revature.DataService.dtos.UpdateBatchDto;
import com.revature.DataService.models.Batch;
import com.revature.DataService.models.BatchState;
import com.revature.DataService.services.BatchService;
import com.revature.DataService.services.BatchStateService;

import javassist.expr.NewArray;

@CrossOrigin(origins = "*")
@RestController
public class BatchController {
	@Autowired
	BatchService batchService;

	@Autowired
	BatchStateService batchStateService;

	@GetMapping("/batches")
	public List<Batch> getAllBatches() {
		return batchService.getAll();
	}

	@GetMapping("/batches/{id}")
	public Batch getBatchById(@PathVariable Integer id) {
		try {
			return batchService.getById(id);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("/batches/{id}")
	public ResponseEntity<Batch> updateBatchWithId(@RequestBody UpdateBatchDto dto, @PathVariable Integer id) {
		Batch newBatch = null;
		try {
			Batch oldBatch = batchService.getById(id);
			if (oldBatch != null) {
				BatchState state = batchStateService.getById(dto.getBatchStateId());
				if (state != null) {
					oldBatch.setState(state);
					newBatch = batchService.updateBatch(oldBatch);
					return new ResponseEntity<>(newBatch, HttpStatus.OK);
				}
			}

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
		}

		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/batches/date/{date}")
	public List<Batch> getInProgressBatches(@PathVariable String date) {
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date d = df.parse(date);
			return batchService.getByInProgress(d);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@GetMapping("/batches/curricula/{id}") // get batches by curricula id
	public List<Batch> getBatchesByCurricula(@PathVariable Integer id) {

		try {
			return batchService.getBatchByCurricula(id);

		} catch (RuntimeException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/batches/clients/{id}")
	public List<Batch> getBatchesByClients(@PathVariable Integer id) {
		try {
			return batchService.getBatchByClientId(id);

		} catch (RuntimeException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}

	}

	@PostMapping("/batches/trainer")
	public Batch updatebatchtrainer(@RequestBody BatchTrainerJoin batch) {

		try {
			return batchService.batchtrain(batch.getTrainerId(), batch.getBatchId());

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
		}
	}

}
