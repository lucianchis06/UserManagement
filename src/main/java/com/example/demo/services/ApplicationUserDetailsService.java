package com.example.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repos.UserRepository;
import com.example.demo.security.AppUser;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {
    private UserRepository applicationUserRepository;

    public ApplicationUserDetailsService(UserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User applicationUser = applicationUserRepository.findByEmail(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        
        AppUser appUser = new AppUser();
        appUser.setEmail(applicationUser.getEmail());
        appUser.setPassword(applicationUser.getPassword());
        appUser.setUserId(applicationUser.getUserId());
        return appUser;
    }
}