package com.pharmerz.event.multicaster;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.core.ResolvableType;
import com.pharmerz.event.annotation.AsyncListener;

/**
 * Created by ankur on 26-10-2016.
 */
public class DistributiveEventMulticaster implements ApplicationEventMulticaster {

    private ApplicationEventMulticaster asyncEventMulticaster;
    private ApplicationEventMulticaster syncEventMulticaster;

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void addApplicationListener(ApplicationListener<?> applicationListener) {
        if(asyncListener(applicationListener))
            asyncEventMulticaster.addApplicationListener(applicationListener);
        else
            syncEventMulticaster.addApplicationListener(applicationListener);
    }

    @Override
    public void addApplicationListenerBean(String beanName) {
        if(asyncListenerBean(beanName))
            asyncEventMulticaster.addApplicationListenerBean(beanName);
        else
            syncEventMulticaster.addApplicationListenerBean(beanName);
    }

    @Override
    public void removeApplicationListener(ApplicationListener<?> applicationListener) {
        if(asyncListener(applicationListener))
            asyncEventMulticaster.removeApplicationListener(applicationListener);
        else
            syncEventMulticaster.removeApplicationListener(applicationListener);
    }

    @Override
    public void removeApplicationListenerBean(String beanName) {
        if(asyncListenerBean(beanName))
            asyncEventMulticaster.removeApplicationListenerBean(beanName);
        else
            syncEventMulticaster.removeApplicationListenerBean(beanName);
    }

    @Override
    public void removeAllListeners() {
        asyncEventMulticaster.removeAllListeners();
        syncEventMulticaster.removeAllListeners();
    }

    @Override
    public void multicastEvent(ApplicationEvent applicationEvent) {
        asyncEventMulticaster.multicastEvent(applicationEvent);
        syncEventMulticaster.multicastEvent(applicationEvent);
    }

    @Override
    public void multicastEvent(ApplicationEvent applicationEvent, ResolvableType resolvableType) {
        asyncEventMulticaster.multicastEvent(applicationEvent, resolvableType);
        syncEventMulticaster.multicastEvent(applicationEvent, resolvableType);
    }


    public void setAsyncEventMulticaster(ApplicationEventMulticaster asyncEventMulticaster) {
        this.asyncEventMulticaster = asyncEventMulticaster;
    }

    public void setSyncEventMulticaster(ApplicationEventMulticaster syncEventMulticaster) {
        this.syncEventMulticaster = syncEventMulticaster;
    }

    private boolean asyncListener(ApplicationListener<?> listener){
        return listener.getClass().getAnnotation(AsyncListener.class) != null;
    }


    private boolean asyncListenerBean(String beanName){
        try{
            Object bean = applicationContext.getBean(beanName);
            if(bean instanceof ApplicationListener){
                ApplicationListener<?> listener = (ApplicationListener) bean;
                return asyncListener(listener);
            }else
                return false;
        }catch (BeansException ex){
            return false;
        }



    }

}