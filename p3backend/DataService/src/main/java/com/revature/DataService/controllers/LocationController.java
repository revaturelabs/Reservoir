package com.revature.DataService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.revature.DataService.models.Location;
import com.revature.DataService.models.UnmappedLocation;
import com.revature.DataService.repositories.UnmappedLocationRepository;
import com.revature.DataService.services.LocationService;

@CrossOrigin
@RestController
@RequestMapping(path = "/location")
public class LocationController {


  @Autowired
  LocationService locationservice;
  @Autowired
  UnmappedLocationRepository locrepo;

  @GetMapping
  public List<UnmappedLocation> getall() {

    return locrepo.findAll();

  }


  @GetMapping("/{id}")
  public Location getById(@PathVariable Integer id) {
    try {
      return locationservice.getById(id);
    } catch (RuntimeException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

  }

  @PostMapping
  public Location saveLocation(@RequestBody Location location) {

    return locationservice.saveOne(location);

  }

  @PatchMapping
  public Location updateLocation(@RequestBody Location location) {
    try {
      return locationservice.update(location);

    } catch (RuntimeException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

  }



}
