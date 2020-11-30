package com.example.demo;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Category;
import com.example.demo.models.UserCategory;
import com.example.demo.repos.GroupRepository;
import com.example.demo.repos.UserGroupRepository;

@RestController
@RequestMapping(path="/groups")
public class GroupsController {
	
	@Autowired
	private GroupRepository repo;
	
	@Autowired
	private UserGroupRepository userGroupRepo;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Category> getAll() {
	    // This returns a JSON or XML with the users
		Iterable<Category> list = repo.findAll();
		return list;
	}
	
	@PostMapping(path="/add")
	public @ResponseBody Category add(@RequestBody Category category)
	{
		category.setGroupId(UUID.randomUUID());
		repo.save(category);
		return category;
	}
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable String id) {
		
		UUID categoryId = UUID.fromString(id);
		
		Iterable<UserCategory> userCategories = userGroupRepo.findByCategoryId(categoryId);
		userGroupRepo.deleteAll(userCategories);
		
		repo.deleteById(categoryId);
	}
}
