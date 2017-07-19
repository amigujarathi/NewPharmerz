package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Created by ankur on 04-12-2016.
 */
@Repository
@RepositoryRestResource
public interface IProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findByCategoryId(@Param("categoryId") UUID categoryId, Pageable pageable);

    Page<Product> findByCategoryIdOrderByProductAsc(@Param("categoryId") UUID categoryId, Pageable pageable);

    Page<Product> findByCategoryIdAndProductContaining(@Param("categoryId") UUID categoryId, @Param("product") String product, Pageable pageable);

    //Amit
    //it will find products based on Composition
    Page<Product> findByComposition(@Param("composition") String composition, Pageable pageable);
    //Long countByCategoryId(UUID categoryId);


    Long countByCategoryId(UUID categoryId);

    Page<Product> findByProductIsStartingWith(@Param("productId") String productId, Pageable pageable);

    // Page<Product> findByCategoryIdAndProductContainingIgnoreCase(@Param("categoryId") UUID categoryId, @Param("product") String product, Pageable pageable);


    Page<Product> findByCategoryIdAndProductContainingIgnoreCase(@Param("categoryId") UUID categoryId, @Param("product") String product, Pageable pageable);

    Page<Product> findByProductIsStartingWithIgnoreCase(@Param("productId") String productId, Pageable pageable);

    Page<Product> findByProductContainingIgnoreCase(@Param("productId") String productId, Pageable pageable);

    <Optional> Product findByProductAndCompositionAndCategoryId(String product, String composition, UUID categeory);

    // List<Product> findByProductAndCategoryId(String productname, UUID categeory);
    List<Product> findByCategoryIdAndProductIgnoreCase(@Param("categoryId") UUID categoryId, @Param("product") String product);

    //  boolean exists(Product product);

    //Find all product based alphabatically

    Page<Product> findAllByOrderByProductAsc(Pageable pageable);

    Page<Product> findAllByOrderByCreatedDesc(Pageable pageable);

    Page<Product> findByProductOrCompositionContainingIgnoreCase(@Param("product") String product, @Param("composition") String composition, Pageable pageable);

}
