package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Enquiry;
import com.pharmerz.server.domain.model.PurchaseOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
@Repository
@RepositoryRestResource
public interface IPurchaseOrderRepository extends JpaRepository<PurchaseOrder, UUID> {
    Page<PurchaseOrder> findBySenderOrganizationIdOrderByCreatedDesc(@Param("senderOrganizationId") UUID senderOrganizationId, Pageable pageable);
    Page<PurchaseOrder> findByReceiverOrganizationIdOrderByCreatedDesc(@Param("receiverOrganizationId") UUID receiverOrganizationId, Pageable pageable);
}
