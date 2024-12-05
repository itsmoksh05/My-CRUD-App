package com.myapp.crud_app.controller;

import com.myapp.crud_app.model.Users;
import com.myapp.crud_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


//    @PostMapping("/register")
//    public ResponseEntity<User> registerUser(@RequestBody User user){
//        return ResponseEntity.ok(userService.registerUser(user));
//    }

    // for user signup
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users user) {
        try {
            Users registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public String login(@RequestBody String username, @RequestBody String password){
//        return userService.authenticateUser(username, password);
//    }

    // for user login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) {
        try {
            String jwtToken = userService.authenticateUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("username", user.getUsername());
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // for getting user details
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUserName(@PathVariable String username){

        if(userService.getUserByUserName(username).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found !!!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByUserName(username).get());
    }

/*
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // Extract JWT token from the Authorization header
        String token = request.getHeader("Authorization").replace("Bearer ", "");

        // Add token to the blocklist
        blacklistService.addTokenToBlacklist(token);

        return new ResponseEntity<>("User successfully logged out.", HttpStatus.OK);
    }
*/
}
