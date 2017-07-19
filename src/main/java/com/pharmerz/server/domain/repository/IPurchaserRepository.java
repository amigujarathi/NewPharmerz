package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Location;
import com.pharmerz.server.domain.model.Purchaser;
import com.pharmerz.server.domain.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
public interface IPurchaserRepository extends JpaRepository<Purchaser, UUID> {
    Page<Purchaser> findByOrganizationId(@Param("organizationId") UUID organizationId, Pageable pageable);
    Page<Purchaser> findByProductId(@Param("productId") UUID productId, Pageable pageable);

    Page<Purchaser> findByOrganizationIdOrderByCreatedDesc(@Param("organizationId") UUID organizationId, Pageable pageable);

}
