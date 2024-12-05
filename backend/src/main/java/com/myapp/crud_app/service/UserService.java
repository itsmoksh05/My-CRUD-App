package com.myapp.crud_app.service;

import com.myapp.crud_app.model.Users;
import com.myapp.crud_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

//import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    // sign-up
    public Users registerUser(Users user){

        // check if already exists
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new RuntimeException("username Already Exists !!!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setCreatedAt(user.getCreatedAt());

        return userRepository.save(user);
    }

    public Optional<Users> getUserByUserName(String username){
        return userRepository.findByUsername(username);
    }


    // log-in
    public String authenticateUser(Users user){


//        if(!userRepository.findByUsername(username).isPresent()) throw new RuntimeException("User Not Found !!!");
//
//        Users currentUser = userRepository.findByUsername(username).get();
//
//        if(!passwordEncoder.matches(password, currentUser.getPassword())){
//            throw new RuntimeException("Wrong Password !!!");
//        }
//
//        return userRepository.findByUsername(username).get();

        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());

        }
        throw new RuntimeException("Login Failed !!");
    }


    public String logoutUser(String username) {

        return null;
    }
}
