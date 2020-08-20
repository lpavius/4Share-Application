package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if(user == null) {
            throw new UsernameNotFoundException("no user found with username: " + username);
        }
        /*UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(
                user.getUserName()).password(user.getPassword()).authorities("USER").build();
        return userDetails;*/
        /*return new org.springframework.security.core.userdetails.User(
                user.getUserName(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));*/
        return toSpringUser(user);
    }

    private static org.springframework.security.core.userdetails.User toSpringUser(User user) {
        String username = user.getUserName();
        String password = user.getPassword();
        boolean enabled = user.isEnabled();
        Set<GrantedAuthority> authorities = new HashSet<>();
        GrantedAuthority authority = new SimpleGrantedAuthority("USER");// ROLE_USER
        authorities.add(authority);
        return new org.springframework.security.core.userdetails.User(
                username, password, enabled,
                true, true, true, authorities);
    }
}
