package com.example.demo.repos;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.models.UserCategory;
import com.example.demo.models.UserCategoryKey;

public interface UserGroupRepository extends CrudRepository<UserCategory, UserCategoryKey> {
	Iterable<UserCategory> findByCategoryId(UUID categoryId);
}
