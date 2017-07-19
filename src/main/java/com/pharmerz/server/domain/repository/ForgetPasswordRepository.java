package com.pharmerz.server.domain.repository;


        import com.pharmerz.server.domain.model.ForgetPassword;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Modifying;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.query.Param;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;
        import org.springframework.stereotype.Repository;

        import java.util.Optional;
        import java.util.UUID;

/**
 * Created by User on 30-01-2017.
 */

@Repository
@RepositoryRestResource
public interface ForgetPasswordRepository extends JpaRepository<ForgetPassword,UUID>{


        Optional<ForgetPassword> findByEmails(String emails);
        Optional<ForgetPassword> findByMobile(String mobile);

        @Modifying
        @Query("UPDATE ForgetPassword f SET f.password = :password WHERE f.emails = :emailId")
        int updatePASSWORD(String emailId ,String password);


}
