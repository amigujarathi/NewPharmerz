package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Created by ankur on 13-08-2016.
 */
@Repository
@RepositoryRestResource
public interface IRoleRepository extends JpaRepository<Role, UUID> {
    //Optional<Role> findByRoleName(@Param("roleName")Role.RoleName roleName);
}
