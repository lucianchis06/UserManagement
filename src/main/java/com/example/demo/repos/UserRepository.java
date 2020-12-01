package com.example.demo.repos;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.User;
import com.example.demo.entities.UserCategory;

public interface UserRepository extends CrudRepository<User, UUID> {
	User findByEmail(String email);
}
