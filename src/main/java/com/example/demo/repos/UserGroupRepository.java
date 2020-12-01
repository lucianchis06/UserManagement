package com.example.demo.repos;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.UserCategory;
import com.example.demo.entities.UserCategoryKey;

public interface UserGroupRepository extends CrudRepository<UserCategory, UserCategoryKey> {
	Iterable<UserCategory> findByCategoryId(UUID categoryId);
	Iterable<UserCategory> findByUserId(UUID userId);
}
