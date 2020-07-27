package com.revature.DataService.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.revature.DataService.models.Batch;
import com.revature.DataService.models.Consent;
import com.revature.DataService.models.ConsentPost;
import com.revature.DataService.models.Trainer;
import com.revature.DataService.services.BatchService;
import com.revature.DataService.services.ConsentService;
import com.revature.DataService.services.TrainerService;


@CrossOrigin
@RestController
public class ConsentController {


  @Autowired
  ConsentService consentService;
  @Autowired
  BatchService batchService;
  @Autowired
  TrainerService trainerService;


  // get all items
 
  @GetMapping("/consent")
  public List<Consent> getAllConsents() {
    return consentService.getAll();
  }

  @GetMapping("/consent/{trainerId}")
  public List<Consent> getAllReviews(@PathVariable Integer trainerId) throws Exception {
    List<Consent> consents = consentService.getConsentByTrainerId(trainerId);

    return consents;
  }

  @PatchMapping("/consent/{consentId}")
  public Consent updateConsentApproval(@RequestBody ConsentPost consentPost,
      @PathVariable Integer consentId) throws Exception {

    System.out.println("patch endpoint hit");
    try {
      Trainer trainer = trainerService.getById(consentPost.getTrainerId());
      Batch batch = batchService.getById(consentPost.getBatchId());
      Consent newConsent =
          new Consent(consentId, consentPost.getIsApprovedColumn(), batch, trainer);

      consentService.update(newConsent);
      // System.out.println(consent);
      return newConsent;
    } catch (RuntimeException e) {
      System.out.println(e);
      throw new RuntimeException(e);

    }


  }

  @PostMapping("/consent")
  public Consent createConsent(@RequestBody ConsentPost consentPost) throws Exception {
    System.out.println(consentPost.getIsApprovedColumn());
    try {
      Trainer trainer = trainerService.getById(consentPost.getTrainerId());
      Batch batch = batchService.getById(consentPost.getBatchId());
      Consent newConsent = new Consent(0, consentPost.getIsApprovedColumn(), batch, trainer);
      consentService.create(newConsent);
      return newConsent;
    } catch (RuntimeException e) {
      System.out.println(e);

    }
    return new Consent();

  }


}
