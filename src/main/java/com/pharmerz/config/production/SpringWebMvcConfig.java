package com.pharmerz.config.production;

import com.pharmerz.security.CustomUserDetails;
import com.pharmerz.server.domain.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.handler.MappedInterceptor;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Locale;

/**
 * Created by ankur on 14-08-2016.
 */
@Configuration
public class SpringWebMvcConfig extends WebMvcConfigurerAdapter {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //registry.addViewController("/").setViewName("index");
    }


    @Bean
    public LocaleResolver localeResolver(){
        CookieLocaleResolver cookieLocaleResolver = new CookieLocaleResolver();
        cookieLocaleResolver.setDefaultLocale(Locale.ENGLISH);
        return cookieLocaleResolver;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
        localeChangeInterceptor.setParamName("lang");
        registry.addInterceptor(localeChangeInterceptor);
    }



    @Bean
    @Profile("development")
    public MappedInterceptor dataRestDevelopmentInterceptor() {
        return new MappedInterceptor(new String[]{"/api/v1/**"},new String[]{"/api/v2/**"}, new HandlerInterceptorAdapter() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

                User user = new User();
                user.setUsername("admin");
                user.setPassword("password");
                CustomUserDetails customUserDetails =
                        new CustomUserDetails(user, Arrays.asList("ROLE_ADMIN"));
                Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, customUserDetails.getPassword());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return super.preHandle(request, response, handler);
            }
        });
    }

}
