package com.pharmerz.service;

import com.pharmerz.server.domain.model.ForgetPassword;

import java.util.Collection;
import java.util.UUID;

/**
 * Created by User on 30-01-2017.
 */

public interface ForgetPasswordService {

    Collection<ForgetPassword> findall();

    ForgetPassword findone(UUID id);

    ForgetPassword create(ForgetPassword forgetPassword);

    ForgetPassword update(ForgetPassword forgetPassword);

    void delete(UUID id);

}
