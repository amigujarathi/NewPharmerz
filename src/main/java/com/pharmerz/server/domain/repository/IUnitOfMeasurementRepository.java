package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.UnitOfMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
public interface IUnitOfMeasurementRepository extends JpaRepository<UnitOfMeasurement, UUID> {
}
