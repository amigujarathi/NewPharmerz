package com.pharmerz.jpa.hibernate;

import com.pharmerz.server.domain.model.User;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by ankur on 24-10-2016.
 */
public class EntityInterceptor extends EmptyInterceptor {
    @Override
    public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) {

        if(entity instanceof User){
            User user = (User) entity;
            //System.out.println(Arrays.deepToString(propertyNames));
            //System.out.println(Arrays.deepToString(currentState));
            //System.out.println(Arrays.deepToString(previousState));
            //System.out.println(user);
            int index = Arrays.asList(propertyNames).indexOf("password");
            if(!currentState[index].equals(previousState[index])){
                String bcryptPassword = new BCryptPasswordEncoder().encode((String)currentState[index]);
                currentState[index] = bcryptPassword;
                return true;
            }

        }

        return false;
    }



}
