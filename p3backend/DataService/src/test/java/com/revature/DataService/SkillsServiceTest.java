package com.revature.DataService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.revature.DataService.dtos.SimpleSkillSetDTO;
import com.revature.DataService.models.Skills;
import com.revature.DataService.repositories.SkillsRepository;
import com.revature.DataService.services.SkillsService;

import java.util.ArrayList;
import java.util.Optional;


public class SkillsServiceTest {
	
	//Needed as an argument for testing getting all skills
	String skillOne = "Python";
	String skillTwo = "React";
	String skillThree = "Java";
	
	@InjectMocks
	SkillsService skillsService;
	
	@Mock
	SkillsRepository skillsRepository;
	
	@BeforeEach
	void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void testGetById() throws Exception{
		Optional<Skills> skills = Optional.of(new Skills());
		
		skills.get().setSkillId(1);
		skills.get().setSkillName("Python");
		
		when(skillsRepository.findById(Mockito.anyInt())).thenReturn(skills);
		
		Skills skillinstance = skillsService.getbyId(skills.get().getSkillId());
		
		assertNotNull(skillinstance);
		assertEquals(1,skillinstance.getSkillId());
	}
	
	@Test
	void testGetAll() throws Exception{
		ArrayList<Skills> skills = new ArrayList<Skills>();
		
		skills.add(new Skills(1,skillOne,null));
		skills.add(new Skills(2,skillTwo,null));
		skills.add(new Skills(3,skillThree,null));
		
		when(skillsRepository.findAll()).thenReturn(skills);
		
		ArrayList<Skills> skillsTest = (ArrayList<Skills>) skillsService.getAll();
		
		assertNotNull(skillsTest.get(0));
		assertNotNull(skillsTest.get(1));
		assertNotNull(skillsTest.get(2));
		assertTrue(skillsTest.size()>0);
	}

}