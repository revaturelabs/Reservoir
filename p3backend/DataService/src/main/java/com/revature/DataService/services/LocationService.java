package com.revature.DataService.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DataService.models.Location;
import com.revature.DataService.repositories.LocationRepository;

@Service
public class LocationService {



  @Autowired
  LocationRepository locationRepository;



  // get all
  public List<Location> getAll() {
    // throw new RuntimeException("testing aspect");
    return locationRepository.findAll();


  }

  // save
  public Location saveOne(Location location) {
    location.setLocationId(0);
    return locationRepository.save(location);
  }

  // update
  public Location update(Location location) {
    Optional<Location> existing = locationRepository.findById(location.getLocationId());
    if (existing.isPresent()) {
      return locationRepository.save(location);
    } else {
      return null;
    }
  }

  public Location getById(Integer id) {

    Optional<Location> existing = locationRepository.findById(id);
    if (existing.isPresent()) {
      return existing.get();
    } else {
      return null;
    }
  }
}
