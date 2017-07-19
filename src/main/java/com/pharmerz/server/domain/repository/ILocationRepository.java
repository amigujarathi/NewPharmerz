package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
@Repository
@RepositoryRestResource
public interface ILocationRepository extends JpaRepository<Location, UUID> {
    Page<Location> findByOrganizationId(@Param("organizationId") UUID organizationId, Pageable pageable);
    Page<Location> findByOrganizationIdOrderByCreatedDesc(@Param("organizationId") UUID organizationId, Pageable pageable);
}
