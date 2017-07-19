package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.BuyingRequirement;
import org.hibernate.sql.Select;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

/**
 * Created by Amit on 07-06-2017.
 */

@Repository
@RepositoryRestResource
public interface IBuyingRequirementsRepository extends JpaRepository<BuyingRequirement, UUID> {
   // Page<BuyingRequirement> findAllByOrderByCreatedDesc(Pageable pageable);
    Page<BuyingRequirement> findAllByOrderByCreatedDesc(Pageable pageable);
    Page<BuyingRequirement> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);

    @Query("select b from BuyingRequirement b where b.name=b.city")
    Page<BuyingRequirement> find(Pageable pageable);

    Slice<BuyingRequirement> findTop3ByProductname(@Param("name") String name, Pageable pageable);

    List<BuyingRequirement> findFirst10ByProductname(@Param("name") String name, Sort sort);

    List<BuyingRequirement> findTop10ByProductname(@Param("name") String name, Pageable pageable);

}
