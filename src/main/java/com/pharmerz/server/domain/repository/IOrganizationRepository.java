package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
@Repository
@RepositoryRestResource
public interface IOrganizationRepository extends JpaRepository<Organization, UUID> {

//   @Query("select Organization from Organization ")
//    List<String> findProduct();

    List<Organization> findAllByOrderByOrganizationAsc();
}
