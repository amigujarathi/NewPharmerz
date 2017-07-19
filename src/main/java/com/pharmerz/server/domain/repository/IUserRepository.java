package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.Optional;
import java.util.UUID;

/**
 * Created by ankur on 13-08-2016.
 */
@Repository
@RepositoryRestResource
public interface IUserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(@Param("username") String username);
    Optional<User> findByEmail(@Param("email") String email);
    Optional<User> findByMobile(@Param("mobile") String mobile);



  //Page<User> findAllByOrderByCreatedAsc(Pageable pageable);

   Page<User> findAllByOrderByCreatedDesc(Pageable pageable);


    Page<User> findByOrganization_OrganizationContainingIgnoreCase(@Param("organization") String organization, Pageable pageable);

//Page<User> findByOrganization_OrganizationContainingIgnoreCase(@Param("organization") String organization,Pageable pageable);
    @Query("SELECT COUNT(id)FROM User ")
    long count();


}
