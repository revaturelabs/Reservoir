package com.revature.DataService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.revature.DataService.repositories.SkillSetRepository;
import com.revature.DataService.services.SkillSetService;
import com.revature.DataService.dtos.SimpleSkillSetDTO;
import com.revature.DataService.models.Skillset;

import java.util.ArrayList;
import java.util.Optional;


class SkillSetServiceTest {
	
	//Needed as an argument when testGetsAll when creating new skill set
	String ss = "Python";
	String ss2 = "React";
	String ss3 = "Docker";
	
	@InjectMocks
	SkillSetService skillSetService; 
	
	@Mock
	SkillSetRepository skillSetRepository;
	
	@BeforeEach
	void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void testGetById() throws Exception {
		Optional<Skillset> skillSet = Optional.of(new Skillset());
		
		skillSet.get().setSkillSetId(1);
		skillSet.get().setSkillSetName("Python");
		skillSet.get().setSkills(null);
		skillSet.get().setCurricula(null);
		skillSet.get().setClientDemands(null);
		skillSet.get().setTrainers(null);
		
		when(skillSetRepository.findById(Mockito.anyInt())).thenReturn(skillSet);
		
		Skillset skillsetinstance =  skillSetService.getById(skillSet.get().getSkillSetId());
		
		assertNotNull(skillsetinstance);
		assertEquals(1,skillsetinstance.getSkillSetId());
		
	}
	
	@Test
	void testGetAll() 
	{
		ArrayList<Skillset> skillSet = new ArrayList<Skillset>();
		skillSet.add(new Skillset(1,ss,null,null,null,null));
		skillSet.add(new Skillset(2,ss2,null,null,null,null));
		skillSet.add(new Skillset(3,ss3,null,null,null,null));
		
		when(skillSetRepository.findAll()).thenReturn(skillSet);
		
		ArrayList<SimpleSkillSetDTO> skillSetTest = (ArrayList<SimpleSkillSetDTO>) skillSetService.getAll();
		
		assertNotNull(skillSetTest.get(0));
		assertNotNull(skillSetTest.get(1));
		assertNotNull(skillSetTest.get(2));
		assertTrue(skillSetTest.size()>0);
	}

}
