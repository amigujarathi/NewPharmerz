package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Mobile;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Created by Amit on 1/25/2017.
 */
@Repository
@RepositoryRestResource
public interface MobileRepository extends JpaRepository<Mobile,UUID> {

     // Optional<Mobile> findByUserid(String userid);
     Mobile findByUserid(String userid);

     Mobile findByMob(String mobile);

     // Mobile findByMobAndUserid(String mob,String userid);

     void deleteByUserid(String userid);

     Mobile findByUseridAndMob(@Param("userid") UUID userid,@Param("mob") String mob);

}
