package com.pharmerz.service;

import com.pharmerz.server.domain.model.ForgetPassword;
import com.pharmerz.server.domain.repository.ForgetPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

/**
 * Created by User on 30-01-2017.
 */

@Service
public class ForgetPasswordServiceImplementation implements ForgetPasswordService {


    @Autowired
    public ForgetPasswordRepository forgetPasswordRepository;


    @Override
    public Collection<ForgetPassword> findall() {
        Collection<ForgetPassword> forgetPasswords = forgetPasswordRepository.findAll();
        return forgetPasswords;
    }


    @Override
    public ForgetPassword findone(UUID id) {
        ForgetPassword forgetPassword = forgetPasswordRepository.getOne(id);
        return null;
    }


    @Override
    public ForgetPassword create(ForgetPassword forgetPassword) {
        ForgetPassword savedForgetPassword = forgetPasswordRepository.save(forgetPassword);
        return savedForgetPassword;
    }


    @Override
    public ForgetPassword update(ForgetPassword forgetPassword) {
//     ForgetPassword forgetPasswordPersisted=findone(forgetPassword.getId());
//        if(forgetPasswordPersisted==null){
//            return null;
//        }
//        ForgetPassword updateForgetPassword=forgetPasswordRepository.save( forgetPassword );
//
        return forgetPassword;
    }

    @Override
    public void delete(UUID id) {
        forgetPasswordRepository.delete(id);

    }

}
