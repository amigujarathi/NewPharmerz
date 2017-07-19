package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Contactus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by Amit on 14-01-2017.
 */
@Repository
@RepositoryRestResource
public interface ContactusRepository extends JpaRepository<Contactus,Integer>{


}


