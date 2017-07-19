package com.pharmerz.security;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pharmerz.server.domain.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class CustomUserDetails  implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Boolean accountNonExpired;
    private Boolean credentialsNonExpired;
    private Boolean accountNonLocked;
    private List<GrantedAuthority> authorities;
    private Boolean enabled;
    private User user;



    public CustomUserDetails(User user, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, List<String> userRoles) {
        this.user = user;
        this.enabled = enabled;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.accountNonLocked = accountNonLocked;
        String roles= StringUtils.collectionToCommaDelimitedString(userRoles);
        authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);

    }



    public CustomUserDetails(User user, List<String> userRoles) {
        this(user, true, true, true, true, userRoles);
    }



    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return user.getPassword();
    }


    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return enabled;
    }


    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



    public String getOrganization(){
        return user.getOrganization().getOrganization();
    }



    public String getFirstName() {
        return user.getFirstName();
    }

    public String getLastName() {
        return user.getLastName();
    }

    public String getEmail() {
        return user.getEmail();
    }

    public String getMobile() {
        return user.getMobile();
    }


    public List<String> getRoles(){
        List<String> roles  = new ArrayList<>();
        authorities.forEach(x -> {
            roles.add(x.getAuthority());
        });
        return roles;
    }


    public UUID getId(){
        return user.getId();
    }


}
