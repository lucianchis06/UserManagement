package com.example.demo;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.entities.UserCategory;
import com.example.demo.models.BaseResponse;
import com.example.demo.models.GeneralResponse;
import com.example.demo.models.ResponseType;
import com.example.demo.repos.UserGroupRepository;
import com.example.demo.repos.UserRepository;

@RestController
@RequestMapping(path = "/users")
public class UsersController {

	@Autowired
	private UserRepository repo;

	@Autowired
	private UserGroupRepository userGroupRepo;

	private BCryptPasswordEncoder bCrypt;

	public UsersController(BCryptPasswordEncoder bcryptPasswordEncoder) {
		this.bCrypt = bcryptPasswordEncoder;
	}

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<User> getAll() {
		// This returns a JSON or XML with the users
		Iterable<User> list = repo.findAll();
		return list;
	}

	@PostMapping(path = "/add")
	public @ResponseBody GeneralResponse<User> add(@RequestBody User user) {
		GeneralResponse<User> response = new GeneralResponse<User>();
		try {
			user.setUserId(UUID.randomUUID());
			user.setPassword(this.bCrypt.encode(user.getPassword()));
			for (UserCategory cat : user.getCategories()) {
				cat.setUserId(user.getUserId());
			}
			repo.save(user);
			response.setData(user);
			
			return response;
		} catch (Exception ex) {
			response.setType(ResponseType.Exception);
			response.setMessage(ex.toString());
			return response;
		}

	}

	@PutMapping(path = "/edit")
	public @ResponseBody GeneralResponse<User> edit(@RequestBody User user) {
		GeneralResponse<User> response = new GeneralResponse<User>();
		try {
			// remove all data from the user_category table
			Iterable<UserCategory> userCategories = userGroupRepo.findByUserId(user.getUserId());
			userGroupRepo.deleteAll(userCategories);

			// User dbUser = repo.findById(user.getUserId()).get();
			// dbUser.setFirstname(user.getFirstname());
			// dbUser.setLastname(user.getLastname());
			if (user.getPassword() != null && !user.getPassword().equals(""))
				user.setPassword(this.bCrypt.encode(user.getPassword()));
			// dbUser.setEmail(user.getEmail());
			// dbUser.setCategories(user.getCategories());
			repo.save(user);
			response.setData(user);
			
			return response;
		} catch (Exception ex) {
			response.setType(ResponseType.Exception);
			response.setMessage(ex.toString());
			return response;
		}
	}

	@DeleteMapping(path = "/{id}")
	public BaseResponse delete(@PathVariable String id) {
		BaseResponse response = new BaseResponse();
		try {
			Iterable<UserCategory> userCategories = userGroupRepo.findByUserId(UUID.fromString(id));
			userGroupRepo.deleteAll(userCategories);
			repo.deleteById(UUID.fromString(id));

			return response;
		} catch (Exception ex) {
			response.setType(ResponseType.Exception);
			response.setMessage(ex.toString());
			return response;
		}
	}
}
