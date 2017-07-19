package com.pharmerz.security;
import com.pharmerz.server.domain.model.User;
import com.pharmerz.server.domain.model.UserRole;
import com.pharmerz.server.domain.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	private IUserRepository userRepository;
	static final boolean ENABLED = true;
	static final boolean ACCOUNT_NOT_EXPIRED = true;
	static final boolean CREDENTIALS_NOT_EXPIRED = true;
	static final boolean ACCOUNT_NOT_LOCKED = true;


	
	@Autowired
    public CustomUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
	}


	@Transactional(readOnly = true)
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> userOpt = userRepository.findByUsername(username);
		if(!userOpt.isPresent()){
            userOpt = userRepository.findByEmail(username);
            if(!userOpt.isPresent()){
                userOpt = userRepository.findByMobile(username);
                if(!userOpt.isPresent()){
                    throw new UsernameNotFoundException("No user present with username: "+username);
                }
            }
		}
        User user = userOpt.get();
		user.getOrganization();
		user.getOrganization().getLocations();
        List<String> userRoleNames = getUserRoleNames(user.getUserRoles());
        return new CustomUserDetails(user, ENABLED,ACCOUNT_NOT_LOCKED, CREDENTIALS_NOT_EXPIRED, ACCOUNT_NOT_EXPIRED, userRoleNames);
	}





	public static List<String> getUserRoleNames(List<UserRole> userRoles){
		List<String> userRoleNames = userRoles.stream().map(x -> x.getRole().getRole().name()).collect(Collectors.toList());
		return userRoleNames;
	}



		
}
