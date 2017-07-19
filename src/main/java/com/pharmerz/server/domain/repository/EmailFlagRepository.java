package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Emails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * Created by User on 05-04-2017.
 */
public interface EmailFlagRepository extends JpaRepository<Emails,UUID> {

    Emails findByUserid(String userid);
}
