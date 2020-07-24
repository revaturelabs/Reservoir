package com.revature.DataService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.DataService.models.UnmappedLocation;
@Repository
public interface UnmappedLocationRepository extends JpaRepository<UnmappedLocation,Integer>
{

}
