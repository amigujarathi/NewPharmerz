package com.pharmerz.config.production;


import com.pharmerz.event.multicaster.DistributiveEventMulticaster;
import com.pharmerz.server.controller.rest.EnquiryListner;
//import com.pharmerz.server.controller.rest.ProductListner;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.context.event.SimpleApplicationEventMulticaster;
import org.springframework.core.task.TaskExecutor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator;
import org.springframework.jdbc.support.SQLExceptionTranslator;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Created by ankur on 14-08-2016.
 */
@Configuration
@EnableAsync
public class AppConfig {



    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }





    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }



    @Bean
    public BeanPostProcessor beanPostProcessor(){
        return new BeanPostProcessor() {
            @Override
            public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
                return bean;
            }

            @Override
            public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
                if(bean instanceof JdbcTemplate){
                    JdbcTemplate jdbcTemplate = (JdbcTemplate) bean;
                    SQLExceptionTranslator exceptionTranslator = jdbcTemplate.getExceptionTranslator();
                    if(exceptionTranslator instanceof SQLErrorCodeSQLExceptionTranslator){
                        SQLErrorCodeSQLExceptionTranslator errorCodeExceptionTranslator = (SQLErrorCodeSQLExceptionTranslator) exceptionTranslator;
                        errorCodeExceptionTranslator.getSqlErrorCodes().setCustomTranslations(
                               /* new CustomSQLErrorCodesTranslation(){{
                                    this.setErrorCodes("23505");
                                    this.setExceptionClass(CandidateKeyViolationException.class);
                                }} */
                        );
                    }
                }
                return bean;
            }
        };
    }


    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        return executor;
    }

    @Bean
    public ApplicationEventMulticaster applicationEventMulticaster(){
        DistributiveEventMulticaster distributiveEventMulticaster = new DistributiveEventMulticaster();
        distributiveEventMulticaster.setAsyncEventMulticaster(asyncEventMulticaster());
        distributiveEventMulticaster.setSyncEventMulticaster(syncEventMulticaster());
        return distributiveEventMulticaster;
    }

    @Bean
    public ApplicationEventMulticaster asyncEventMulticaster(){
        SimpleApplicationEventMulticaster asyncEventMulticaster = new SimpleApplicationEventMulticaster();
        asyncEventMulticaster.setTaskExecutor(taskExecutor());
        return asyncEventMulticaster;
    }

    @Bean
    public ApplicationEventMulticaster syncEventMulticaster(){
        SimpleApplicationEventMulticaster syncEventMulticaster = new SimpleApplicationEventMulticaster();
        return syncEventMulticaster;
    }


    @Bean
    EnquiryListner enquiryListner(){
        return new EnquiryListner();
    }

//    @Bean
//    ProductListner productListner(){
//        return new ProductListner();
//    }



}
