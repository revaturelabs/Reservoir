package com.revature.DataService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.revature.DataService.dtos.SimpleCurriculaDTO;
import com.revature.DataService.models.Curriculum;
import com.revature.DataService.repositories.CurriculumRepository;
import com.revature.DataService.services.CurriculumService;

class CurriculumServiceTest {
	//These are passed as an argument when creating new curriculums.
	String c1 = "Java-React v1";
	String c2 = "Java-React v2";
	String c3 = "Python v1";
	
	@InjectMocks 
	CurriculumService CurriculumService; 
	
	@Mock
	CurriculumRepository CurriculumRepository; 
	
	@BeforeEach
	void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void testGetById() throws Exception {
		Optional<Curriculum> curriculums = Optional.of(new Curriculum());
		curriculums.get().setName("Java-React v1");
		curriculums.get().setCurriculumId(18);

		
	// 	when(CurriculumRepository.findById(Mockito.anyInt())).thenReturn(curriculums);
		
		Curriculum curriculumInstance = CurriculumService.getById(curriculums.get().getCurriculumId());
		
		assertNotNull(curriculumInstance);
		assertEquals("Java-React v1", curriculumInstance.getName());
		
	// }
	
	@Test
	void testGetAll() 
	{
		ArrayList<Curriculum> Curriculums = new ArrayList<Curriculum>();
		Curriculums.add(new Curriculum(1,c1,null,null));
		Curriculums.add(new Curriculum(2,c2,null,null));
		Curriculums.add(new Curriculum(3,c3,null,null));
		
	// 	when(CurriculumRepository.findAll()).thenReturn(Curriculums);
		
	// 	ArrayList<SimpleCurriculaDTO> CurriculumsTest = (ArrayList<SimpleCurriculaDTO>) CurriculumService.getAll();
		
	// 	assertNotNull(CurriculumsTest.get(0));
	// 	assertNotNull(CurriculumsTest.get(1));
	// 	assertNotNull(CurriculumsTest.get(2));
	// 	assertTrue(CurriculumsTest.size()>0);
	}

}
