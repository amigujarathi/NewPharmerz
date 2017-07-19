package com.pharmerz.server.domain.repository;

import com.pharmerz.server.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Created by User on 01-02-2017.
 */
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByMobile(String mobile);

//    @Modifying
//    @Query("UPDATE User u SET u.password = :password WHERE u.email = :emailId")
//    int updatePassword(@Param("emailId") String emailId , @Param("password") String password);

}
