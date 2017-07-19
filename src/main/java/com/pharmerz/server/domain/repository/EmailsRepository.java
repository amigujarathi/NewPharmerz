package com.pharmerz.server.domain.repository;


import com.pharmerz.server.domain.model.Emails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Created by Amit on 17-01-2017.
 */

@Repository
@RepositoryRestResource
public interface EmailsRepository extends JpaRepository<Emails,UUID>  {

    //Optional<Emails> findByUserid(String userid);
    Emails findByUserid(String userid);

    Emails findByEmailStartingWith(String email);

    Void deleteByUserid(String userid);

    Long removeByUserid(String userid);
}
