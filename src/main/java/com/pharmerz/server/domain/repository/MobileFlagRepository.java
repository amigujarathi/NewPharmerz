package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Emails;
import com.pharmerz.server.domain.model.Mobile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Created by User on 05-04-2017.
 */
public interface MobileFlagRepository extends JpaRepository<Mobile,UUID> {

    Mobile findByUserid(String userid);
}
