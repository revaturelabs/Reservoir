package com.revature.DataService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.revature.DataService.models.Consent;
import com.revature.DataService.models.Skills;
import com.revature.DataService.repositories.ConsentRepository;
import com.revature.DataService.services.ConsentService;

import java.util.ArrayList;
import java.util.Optional;



public class ConsentServiceTest {
	
	@InjectMocks
	ConsentService consentService;
	
	@Mock
	ConsentRepository consentRepository;
	
	@BeforeEach
	void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void testGetByTrainerId() throws Exception{
		
		Optional<Consent> consent = Optional.of(new Consent());
		
		consent.get().setConsentId(1);
		consent.get().setBatch(null);
		consent.get().setTrainer(null);
		consent.get().setIsApprovedColumn(true);
		
		when(consentRepository.findById(Mockito.anyInt())).thenReturn(consent);
		
		Consent consentInstance = new Consent(consent.get().getConsentId(),consent.get().getIsApprovedColumn(),consent.get().getBatch(),consent.get().getTrainer());
		
		assertNotNull(consentInstance);
		assertEquals(1,consentInstance.getConsentId());
	}
	
	@Test
	void testGetAll() throws Exception{
		
		ArrayList<Consent> consent = new ArrayList<Consent>();
		
		consent.add(new Consent(1,true,null,null));
		consent.add(new Consent(2,true,null,null));
		consent.add(new Consent(3,false,null,null));
		
		when(consentRepository.findAll()).thenReturn(consent);
		
		ArrayList<Consent> consentTest = (ArrayList<Consent>) consentService.getAll();
		
		assertNotNull(consentTest.get(0));
		assertNotNull(consentTest.get(1));
		assertNotNull(consentTest.get(2));
		assertTrue(consentTest.size()>0);
	}

}
