package com.revature.DataService.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.DataService.models.BatchDAO;

@Repository
public interface BatchDAORepository extends JpaRepository<BatchDAO, Integer>
{
	
}
