package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by ankur on 13-08-2016.
 */
@Repository
@RepositoryRestResource
public interface IUserRoleRepository extends JpaRepository<UserRole, UUID> {


}
