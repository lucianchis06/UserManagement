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

import com.example.demo.models.User;
import com.example.demo.repos.UserRepository;


@RestController
@RequestMapping(path="/users")
public class UsersController {
	
	@Autowired
	private UserRepository repo;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAll() {
	    // This returns a JSON or XML with the users
		Iterable<User> list = repo.findAll();
		return list;
	}
	
	@PostMapping(path="/add")
	public @ResponseBody User add(@RequestBody User user)
	{
		user.setUserId(UUID.randomUUID());
		repo.save(user);
		return user;
	}
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable String id) {
		repo.deleteById(UUID.fromString(id));
	}
}
