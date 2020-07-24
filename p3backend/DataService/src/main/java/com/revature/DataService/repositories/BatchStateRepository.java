package com.revature.DataService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.DataService.models.BatchState;

@Repository
public interface BatchStateRepository extends JpaRepository<BatchState, Integer> {
	BatchState findByState(String state);

}
