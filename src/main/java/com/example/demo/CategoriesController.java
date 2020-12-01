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

import com.example.demo.entities.Category;
import com.example.demo.entities.UserCategory;
import com.example.demo.models.BaseResponse;
import com.example.demo.models.GeneralResponse;
import com.example.demo.models.ResponseType;
import com.example.demo.repos.GroupRepository;
import com.example.demo.repos.UserGroupRepository;

@RestController
@RequestMapping(path = "/categories")
public class CategoriesController {

	@Autowired
	private GroupRepository repo;

	@Autowired
	private UserGroupRepository userGroupRepo;

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Category> getAll() {
		// This returns a JSON or XML with the users
		Iterable<Category> list = repo.findAll();
		return list;
	}

	@PostMapping(path = "/add")
	public @ResponseBody GeneralResponse<Category> add(@RequestBody Category category) {
		GeneralResponse<Category> response = new GeneralResponse<Category>();
		try {
			category.setCategoryId(UUID.randomUUID());
			repo.save(category);
			response.setData(category);
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
			UUID categoryId = UUID.fromString(id);

			Iterable<UserCategory> userCategories = userGroupRepo.findByCategoryId(categoryId);
			userGroupRepo.deleteAll(userCategories);

			repo.deleteById(categoryId);

			return response;
		} catch (Exception ex) {
			response.setType(ResponseType.Exception);
			response.setMessage(ex.toString());
			return response;
		}
	}
}
