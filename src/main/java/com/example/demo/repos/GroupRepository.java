package com.example.demo.repos;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.models.Category;

public interface GroupRepository extends CrudRepository<Category, UUID>{

}
