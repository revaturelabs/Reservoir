package com.revature.DataService.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.revature.DataService.models.Associate;

public interface AssociateRepository extends JpaRepository<Associate, Integer> {

	public Associate save(Associate a);

	@Query("select a from Associate a where a.active = true")
	List<Associate> findAllWhere();

	List<Associate> findByBatchEndDateLessThanEqualAndBatchStateId(Date date, int id);

	List<Associate> findByBatchEndDateBetweenAndBatchStateId(Date start, Date end, int id);

	List<Associate> findByBatchEndDateLessThanEqualAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetId(
			Date date, int batchStateId, int skillsetId);

	List<Associate> findByBatchEndDateBetweenAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetId(Date start,
			Date end, int batchStateId, int skillsetId);

	List<Associate> findByBatchEndDateLessThanEqualAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetIdIn(
			Date date, int batchStateId, List<Integer> skillsetIds);

	List<Associate> findByBatchEndDateBetweenAndBatchStateIdAndBatchCurriculumCurriculumSkillsetSkillSetIdIn(Date start,
			Date end, int batchStateId, List<Integer> skillsetIds);

	List<Associate> findByBatchBatchId(int id);

	List<Associate> findTop50ByBatchIsNullAndInterviewScoreGreaterThanEqual(double score);

}
