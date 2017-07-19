package com.pharmerz.service;


import com.pharmerz.server.domain.model.Mobile;
import com.pharmerz.server.domain.repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

/**
 * Created by Amit on 1/14/2017.
 */
@Service
public class MobilesServiceImplementation implements MobilesService {


    @Autowired
    public MobileRepository mobileRepository;

    @Override
    public Collection<Mobile> findall() {
        Collection<Mobile> mobile = mobileRepository.findAll();

        return mobile;
    }

    @Override
    public Mobile findone(UUID id) {
        Mobile mobile = mobileRepository.getOne(id);

        return mobile;
    }


    @Override
    public Mobile create(Mobile mobile) {

        Mobile savedMobile = mobileRepository.save(mobile);
        return savedMobile;
    }

    @Override
    public Mobile update(Mobile mobile) {
//        Mobile mobilePersisted=findone(mobile.getId(id));
//        if(mobilePersisted==null){
//            return null;
//        }
//        Mobile updateMobile=mobileRepository.save( mobile );

        return mobile;
    }

    @Override
    public void delete(UUID id) {
        mobileRepository.delete(id);
    }


}
