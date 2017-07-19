package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Meetingrequest;
import com.pharmerz.server.domain.model.Meetingrequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by User on 25-05-2017.
 */

@Repository
@RepositoryRestResource
public interface MeetingRequestRepository extends JpaRepository<Meetingrequest, UUID> {

    Page<Meetingrequest> findByUseridOrderByCreatedDesc(@Param("userid") UUID userid, Pageable pageable);
    //Page<Meetingrequest> findByUseridByOrderByCreatedDesc(@Param("userid") UUID userid, Pageable pageable);



  //  Page<Meetingrequest> findByUseridOrderBy(Pageable pageable);
}
