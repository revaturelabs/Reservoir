package com.revature.DataService.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.DataService.models.ClientDemand;

@Repository
public interface ClientDemandRepo extends JpaRepository<ClientDemand, Integer> {
	List<ClientDemand> findByClientDemandId(Integer clientDemandId);

	List<ClientDemand> findByDeadlineGreaterThanEqual(LocalDate date);
	
	List<ClientDemand> findByDeadlineGreaterThanEqualAndClientDemandSkillsetSkillSetId(LocalDate date, int id);
	
	Optional<List<ClientDemand>> findByClientClientIdAndDeadlineGreaterThanEqualAndClientDemandSkillsetSkillSetId(int clientId, LocalDate date, int skillsetId);
	
	Optional<List<ClientDemand>> findByClientClientIdAndDeadlineGreaterThanEqual(int id, LocalDate date);
}

