package com.revature.pkg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.revature.pkg.model.BatchState;

@Repository
public interface BatchStateRepository extends JpaRepository<BatchState, Integer> {
	BatchState findByState(String state);

}
