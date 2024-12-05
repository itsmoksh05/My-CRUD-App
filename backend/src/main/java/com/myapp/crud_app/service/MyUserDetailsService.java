package com.myapp.crud_app.service;

import com.myapp.crud_app.model.UserPrincipals;
import com.myapp.crud_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.myapp.crud_app.model.Users;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Users> user = userRepository.findByUsername(username);

        if(user.isEmpty()){
            throw new UsernameNotFoundException("User Not Found !!!");
        }

        return new UserPrincipals(user.get());
    }
}
