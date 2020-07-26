package com.revature.DataService.controllers;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.revature.DataService.models.ClientDemand;
import com.revature.DataService.repositories.ClientDemandRepo;

@RestController
public class ClientDemandController {
  // Cut out the middleman, go straight to the repo!

  @Autowired
  ClientDemandRepo clientDemandRepo;

  // get all the clientDemand rows in that table
  @GetMapping("/client-demand")
  public List<ClientDemand> endpointAll1() {
    return clientDemandRepo.findAll();
  }

  // get all the clientDemand where deadline is today or after
  @GetMapping("/client-demand/{date}")
  public List<ClientDemand> findAllCurrent(@PathVariable String date) {
    LocalDate currTime = LocalDate.parse(date);
    return clientDemandRepo.findByDeadlineGreaterThanEqual(currTime);
  }
}


