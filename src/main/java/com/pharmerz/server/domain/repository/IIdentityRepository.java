package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Identity;
import com.pharmerz.server.domain.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by ankur on 19-12-2016.
 */
@Repository
@RepositoryRestResource
public interface IIdentityRepository extends JpaRepository<Identity, UUID> {
    Page<Identity> findByOrganizationId(@Param("organizationId") UUID organizationId, Pageable pageable);

}
